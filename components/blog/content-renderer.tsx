import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import type { ContentBlock } from "@/lib/blog/posts";

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-content">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={b.id}
                className="font-display text-3xl lg:text-4xl text-foreground mt-16 mb-5 tracking-tight scroll-mt-32"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={b.id}
                className="font-semibold text-xl lg:text-2xl text-foreground mt-10 mb-3 scroll-mt-32"
              >
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="text-foreground text-lg leading-relaxed mb-5"
              >
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2 mb-6 ml-6 list-disc text-foreground">
                {b.items.map((it, j) => (
                  <li key={j} className="text-lg leading-relaxed pl-2">
                    {it}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2 mb-6 ml-6 list-decimal text-foreground">
                {b.items.map((it, j) => (
                  <li key={j} className="text-lg leading-relaxed pl-2">
                    {it}
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 pl-6 border-l-4 border-brand-lime text-xl text-foreground-muted italic leading-relaxed"
              >
                {b.text}
                {b.cite && (
                  <footer className="mt-3 text-sm text-foreground-subtle not-italic">
                    — {b.cite}
                  </footer>
                )}
              </blockquote>
            );
          case "callout": {
            const palette = {
              tip: {
                bg: "bg-brand-lime/10",
                border: "border-brand-lime/30",
                text: "text-brand-forest-deep",
                icon: Lightbulb,
                iconColor: "text-brand-olive",
              },
              warning: {
                bg: "bg-amber-50",
                border: "border-amber-200",
                text: "text-amber-900",
                icon: AlertTriangle,
                iconColor: "text-amber-700",
              },
              info: {
                bg: "bg-blue-50",
                border: "border-blue-200",
                text: "text-blue-950",
                icon: Info,
                iconColor: "text-blue-700",
              },
            }[b.tone];
            const Icon = palette.icon;
            return (
              <aside
                key={i}
                className={`my-8 p-6 rounded-2xl border ${palette.bg} ${palette.border}`}
              >
                <div className="flex items-start gap-4">
                  <Icon className={`size-6 shrink-0 ${palette.iconColor}`} />
                  <div>
                    <p className={`font-semibold ${palette.text} mb-1`}>{b.title}</p>
                    <p className={`text-base leading-relaxed ${palette.text}/85`}>
                      {b.text}
                    </p>
                  </div>
                </div>
              </aside>
            );
          }
          case "table":
            return (
              <div
                key={i}
                className="my-8 overflow-x-auto rounded-2xl border border-border"
              >
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {b.head.map((h, j) => (
                        <th
                          key={j}
                          className="px-4 py-3 text-left font-semibold text-foreground border-b border-border"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j} className="border-b border-border last:border-0">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 text-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
