import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/markdown";
import { commitFiles } from "@/lib/github/commit";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const OWNER = "dariuszszuca-lang";
const REPO = "starnawska-strona";
const BRANCH = "main";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_form_data" }, { status: 400 });
  }

  const file = form.get("file");
  const desiredName = String(form.get("name") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }
  if (!ALLOWED_TYPES[file.type]) {
    return NextResponse.json(
      { ok: false, error: "unsupported_type", supported: Object.keys(ALLOWED_TYPES) },
      { status: 415 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ ok: false, error: "too_large_5mb_max" }, { status: 413 });
  }

  const ext = ALLOWED_TYPES[file.type];
  const baseName = slugify(desiredName || file.name.replace(/\.[^.]+$/, "")) || "obraz";
  const stamp = new Date().toISOString().slice(0, 10);
  const filename = `${baseName}-${stamp}.${ext}`;
  const path = `public/blog/${filename}`;
  const publicUrl = `/blog/${filename}`;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    await commitFiles({
      owner: OWNER,
      repo: REPO,
      branch: BRANCH,
      message: `admin: upload zdjęcia ${filename}`,
      files: [{ path, contentBase64: base64 }],
    });

    return NextResponse.json({ ok: true, url: publicUrl, filename });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "upload_failed" },
      { status: 500 }
    );
  }
}
