import type { ContentBlock } from "@/lib/blog/posts";

/**
 * Bardzo prosty parser markdown → ContentBlock[] dla edytora panelu admina.
 *
 * Obsługuje:
 *  ## H2 nagłówek
 *  ### H3 nagłówek
 *  > Cytat
 *  - lub * — element listy nieuporządkowanej
 *  1. element listy uporządkowanej
 *  Reszta linijek → akapit (paragraph)
 *  Pusta linia rozdziela bloki.
 */

function slugify(t: string): string {
  return t
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function parseMarkdown(md: string): ContentBlock[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      blocks.push({ type: "h2", text, id: slugify(text) });
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      blocks.push({ type: "h3", text, id: slugify(text) });
      i++;
      continue;
    }

    // Cytat
    if (line.startsWith("> ")) {
      const lns: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        lns.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "quote", text: lns.join(" ") });
      continue;
    }

    // Lista uporządkowana
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Lista nieuporządkowana
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!(t.startsWith("- ") || t.startsWith("* "))) break;
        items.push(t.slice(2).trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Akapit (może być wieloliniowy do pustej linii)
    const para: string[] = [];
    while (i < lines.length && lines[i].trim()) {
      const t = lines[i].trim();
      // Stop jeśli następna linia to nagłówek/lista/cytat
      if (
        t.startsWith("## ") ||
        t.startsWith("### ") ||
        t.startsWith("> ") ||
        t.startsWith("- ") ||
        t.startsWith("* ") ||
        /^\d+\.\s/.test(t)
      ) {
        break;
      }
      para.push(t);
      i++;
    }
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") });
    }
  }

  return blocks;
}

/**
 * Odwrotne: ContentBlock[] → markdown (do wyświetlenia w edytorze).
 */
export function blocksToMarkdown(blocks: ContentBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2":
          return `## ${b.text}`;
        case "h3":
          return `### ${b.text}`;
        case "p":
          return b.text;
        case "quote":
          return `> ${b.text}`;
        case "ul":
          return b.items.map((it) => `- ${it}`).join("\n");
        case "ol":
          return b.items.map((it, i) => `${i + 1}. ${it}`).join("\n");
        case "callout":
          return `> **${b.title}**\n> ${b.text}`;
        case "table":
          // Markdown tabele — zachowujemy ale są mało wygodne w edytorze
          return [
            `| ${b.head.join(" | ")} |`,
            `| ${b.head.map(() => "---").join(" | ")} |`,
            ...b.rows.map((r) => `| ${r.join(" | ")} |`),
          ].join("\n");
      }
      return "";
    })
    .join("\n\n");
}

export { slugify };
