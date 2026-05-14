/**
 * Mały helper do tworzenia commitu z wieloma plikami przez GitHub Git Data API.
 *
 * Strategia (jeden commit = jedno zsynchronizowane drzewo):
 *  1. Pobierz HEAD ref danego branchu
 *  2. Pobierz aktualne tree z HEAD commitu (recursive)
 *  3. Dla każdego pliku do zmiany — utwórz blob (paralelnie, w batchach)
 *  4. Złóż nowe drzewo (zachowując istniejące pliki nieobjęte zmianą)
 *  5. Utwórz commit i przesuń ref
 *
 * Wymagany env: GITHUB_TOKEN (Personal Access Token z Contents: read+write).
 */

const API_BASE = "https://api.github.com";

export type FileChange =
  | { path: string; contentBase64: string }
  | { path: string; contentUtf8: string }
  | { path: string; delete: true };

export type CommitOptions = {
  owner: string;
  repo: string;
  branch?: string;
  message: string;
  files: FileChange[];
};

export type CommitResult = {
  sha: string;
  blobsCreated: number;
  filesDeleted: number;
  filesUnchanged: number;
};

function authHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN missing");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function gh<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...authHeaders(),
      ...(init?.headers as Record<string, string> | undefined),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub ${init?.method ?? "GET"} ${path} → ${res.status}: ${body.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

async function createBlob(
  owner: string,
  repo: string,
  content: string,
  encoding: "utf-8" | "base64"
): Promise<string> {
  const res = await gh<{ sha: string }>(`/repos/${owner}/${repo}/git/blobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, encoding }),
  });
  return res.sha;
}

type TreeNode = {
  path: string;
  mode: "100644" | "100755" | "040000" | "160000" | "120000";
  type: "blob" | "tree" | "commit";
  sha?: string | null;
  content?: string;
};

const BATCH = 12;

export async function commitFiles({
  owner,
  repo,
  branch = "main",
  message,
  files,
}: CommitOptions): Promise<CommitResult> {
  // 1. HEAD ref
  const ref = await gh<{ object: { sha: string } }>(
    `/repos/${owner}/${repo}/git/ref/heads/${branch}`
  );
  const baseCommitSha = ref.object.sha;

  // 2. Base tree sha
  const baseCommit = await gh<{ tree: { sha: string } }>(
    `/repos/${owner}/${repo}/git/commits/${baseCommitSha}`
  );
  const baseTreeSha = baseCommit.tree.sha;

  // 3. Create blobs paralelnie (tylko dla content updates)
  type ContentUpdate =
    | { path: string; contentBase64: string }
    | { path: string; contentUtf8: string };
  const updates: ContentUpdate[] = files.filter(
    (f): f is ContentUpdate => !("delete" in f)
  );
  const deletes = files.filter((f): f is { path: string; delete: true } => "delete" in f);

  const treeNodes: TreeNode[] = [];
  let blobsCreated = 0;

  for (let i = 0; i < updates.length; i += BATCH) {
    const slice = updates.slice(i, i + BATCH);
    const blobs = await Promise.all(
      slice.map(async (f) => {
        if ("contentBase64" in f) {
          const sha = await createBlob(owner, repo, f.contentBase64, "base64");
          return { path: f.path, sha };
        }
        const sha = await createBlob(owner, repo, f.contentUtf8, "utf-8");
        return { path: f.path, sha };
      })
    );
    for (const b of blobs) {
      treeNodes.push({ path: b.path, mode: "100644", type: "blob", sha: b.sha });
      blobsCreated++;
    }
  }

  // 4. Usunięcia: sha=null mówi GitHub-owi "usuń ten ścieżkę z drzewa"
  for (const d of deletes) {
    treeNodes.push({ path: d.path, mode: "100644", type: "blob", sha: null });
  }

  if (treeNodes.length === 0) {
    return { sha: baseCommitSha, blobsCreated: 0, filesDeleted: 0, filesUnchanged: 0 };
  }

  // 5. Create tree (base_tree zachowuje istniejące pliki nieobjęte tree)
  const tree = await gh<{ sha: string }>(`/repos/${owner}/${repo}/git/trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeNodes,
    }),
  });

  // 6. Create commit
  const commit = await gh<{ sha: string }>(`/repos/${owner}/${repo}/git/commits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [baseCommitSha],
    }),
  });

  // 7. Update ref
  await gh(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });

  return {
    sha: commit.sha,
    blobsCreated,
    filesDeleted: deletes.length,
    filesUnchanged: 0,
  };
}

/**
 * Pobiera listę plików w danym katalogu (recursive), żeby zrobić delta.
 * Zwraca mapę: pathname → blob sha.
 */
export async function listRepoFiles(
  owner: string,
  repo: string,
  prefix: string,
  branch = "main"
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  try {
    const ref = await gh<{ object: { sha: string } }>(
      `/repos/${owner}/${repo}/git/ref/heads/${branch}`
    );
    const commit = await gh<{ tree: { sha: string } }>(
      `/repos/${owner}/${repo}/git/commits/${ref.object.sha}`
    );
    const tree = await gh<{
      tree: Array<{ path: string; type: string; sha: string }>;
      truncated: boolean;
    }>(`/repos/${owner}/${repo}/git/trees/${commit.tree.sha}?recursive=1`);

    for (const node of tree.tree) {
      if (node.type === "blob" && node.path.startsWith(prefix)) {
        result.set(node.path, node.sha);
      }
    }
  } catch {
    // pusty wynik = brak plików
  }
  return result;
}
