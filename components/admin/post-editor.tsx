"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, X, AlertCircle, CheckCircle2, Trash2, Upload, Image as ImageIcon } from "lucide-react";

type Faq = { q: string; a: string };

type Initial = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  keyQuestion: string;
  tldr: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  keywords: string;
  contentMd: string;
  faq: Faq[];
};

const categories = ["Sprzedaż", "Rynek", "Doradztwo", "Najem", "Inwestycje"];

export function PostEditor({ initial, isNew }: { initial: Initial; isNew: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("name", form.title || file.name);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Upload failed");
      update("cover", data.url);
      if (!form.coverAlt) update("coverAlt", form.title || file.name);
      setMsg({ type: "ok", text: `Zdjęcie wgrane: ${data.url}` });
    } catch (err) {
      setMsg({ type: "err", text: err instanceof Error ? err.message : "Błąd uploadu" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const update = <K extends keyof Initial>(k: K, v: Initial[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const addFaq = () => update("faq", [...form.faq, { q: "", a: "" }]);
  const removeFaq = (i: number) =>
    update("faq", form.faq.filter((_, idx) => idx !== i));
  const setFaqField = (i: number, k: "q" | "a", v: string) => {
    const next = [...form.faq];
    next[i] = { ...next[i], [k]: v };
    update("faq", next);
  };

  const handleDelete = async () => {
    if (!confirm(`Na pewno usunąć artykuł "${form.title}"? Tego nie cofniesz.`)) return;
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "delete", slug: form.slug }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Nieznany błąd");
      setMsg({ type: "ok", text: "Artykuł usunięty. Strona aktualizuje się w 1-2 minuty." });
      setTimeout(() => router.push("/admin"), 1500);
    } catch (e) {
      setMsg({ type: "err", text: e instanceof Error ? e.message : "Błąd" });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: isNew ? "create" : "update",
          slug: form.slug,
          payload: {
            title: form.title,
            excerpt: form.excerpt,
            category: form.category,
            keyQuestion: form.keyQuestion,
            tldr: form.tldr,
            author: form.author,
            publishedAt: form.publishedAt,
            readingMinutes: Number(form.readingMinutes),
            cover: form.cover,
            coverAlt: form.coverAlt,
            keywords: form.keywords
              .split(",")
              .map((k) => k.trim())
              .filter(Boolean),
            contentMd: form.contentMd,
            faq: form.faq.filter((f) => f.q.trim() && f.a.trim()),
          },
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Nieznany błąd");
      setMsg({
        type: "ok",
        text: `Zapisano. Strona aktualizuje się w 1-2 minuty.${data.slug ? ` URL: /blog/${data.slug}` : ""}`,
      });
      if (isNew && data.slug) {
        setTimeout(() => router.push(`/admin/edit/${data.slug}`), 1200);
      } else {
        router.refresh();
      }
    } catch (e) {
      setMsg({ type: "err", text: e instanceof Error ? e.message : "Błąd" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Status */}
      {msg && (
        <div
          className={`flex items-start gap-3 rounded-2xl p-4 border ${
            msg.type === "ok"
              ? "bg-brand-lime/10 border-brand-lime/30 text-brand-forest-deep"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {msg.type === "ok" ? (
            <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="size-5 shrink-0 mt-0.5" />
          )}
          <p className="text-sm leading-relaxed">{msg.text}</p>
        </div>
      )}

      {/* Główne pola */}
      <Card title="Podstawowe">
        <Field label="Tytuł" required>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="adm-input"
            placeholder="Jak sprzedać mieszkanie..."
          />
        </Field>

        <Field label="Zajawka (pod tytułem na stronie)" required>
          <textarea
            required
            rows={3}
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            className="adm-input resize-y"
            placeholder="Co znajdzie czytelnik w 1-2 zdaniach"
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Kategoria">
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="adm-input"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Data publikacji">
            <input
              type="date"
              required
              value={form.publishedAt}
              onChange={(e) => update("publishedAt", e.target.value)}
              className="adm-input"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Autor">
            <input
              type="text"
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
              className="adm-input"
            />
          </Field>
          <Field label="Czas czytania (min)">
            <input
              type="number"
              min={1}
              max={60}
              value={form.readingMinutes}
              onChange={(e) => update("readingMinutes", Number(e.target.value))}
              className="adm-input"
            />
          </Field>
        </div>
      </Card>

      {/* SEO / AI */}
      <Card title="SEO i AI" hint="Pomagają trafić wyżej w Google i odpowiadać na pytania w ChatGPT.">
        <Field label="Główne pytanie" hint="Na które pytanie odpowiada ten artykuł (np. 'Jak sprzedać mieszkanie w Gdyni?')">
          <input
            type="text"
            value={form.keyQuestion}
            onChange={(e) => update("keyQuestion", e.target.value)}
            className="adm-input"
          />
        </Field>

        <Field label="TL;DR" hint="Krótkie streszczenie — 1-2 zdania, gotowa odpowiedź dla AI.">
          <textarea
            rows={3}
            value={form.tldr}
            onChange={(e) => update("tldr", e.target.value)}
            className="adm-input resize-y"
          />
        </Field>

        <Field label="Słowa kluczowe" hint="Oddzielone przecinkiem.">
          <input
            type="text"
            value={form.keywords}
            onChange={(e) => update("keywords", e.target.value)}
            className="adm-input"
            placeholder="sprzedaż mieszkania Gdynia, jak sprzedać mieszkanie, ..."
          />
        </Field>
      </Card>

      {/* Zdjęcie */}
      <Card title="Zdjęcie tła">
        {/* Podgląd jeśli już jest */}
        {form.cover && (
          <div className="mb-4 rounded-2xl overflow-hidden border border-border bg-background">
            <img
              src={form.cover}
              alt={form.coverAlt}
              className="w-full max-h-56 object-cover"
            />
          </div>
        )}

        {/* Upload */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {uploading ? (
              <>Wgrywam…</>
            ) : (
              <>
                <Upload className="size-4" />
                {form.cover ? "Zmień zdjęcie" : "Wgraj zdjęcie"}
              </>
            )}
          </button>
          <span className="text-xs text-foreground-muted">JPG/PNG/WebP, max 5 MB</span>
        </div>

        <Field label="Ścieżka pliku" hint="Wypełniona automatycznie po wgraniu. Możesz wpisać ręcznie jeśli zdjęcie już jest w repo.">
          <div className="relative">
            <ImageIcon className="size-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={form.cover}
              onChange={(e) => update("cover", e.target.value)}
              className="adm-input pl-10 font-mono text-sm"
              placeholder="/blog/nazwa-pliku.jpg"
            />
          </div>
        </Field>
        <Field label="Opis zdjęcia (alt)" hint="Dla dostępności i SEO.">
          <input
            type="text"
            value={form.coverAlt}
            onChange={(e) => update("coverAlt", e.target.value)}
            className="adm-input"
          />
        </Field>
      </Card>

      {/* Treść markdown */}
      <Card
        title="Treść"
        hint="Markdown: ## Nagłówek 2, ### Nagłówek 3, - lista, 1. lista numerowana, > cytat, pusta linia = nowy akapit."
      >
        <textarea
          required
          rows={20}
          value={form.contentMd}
          onChange={(e) => update("contentMd", e.target.value)}
          className="adm-input font-mono text-sm leading-relaxed resize-y"
          placeholder={`Pierwszy akapit artykułu.

## Pierwszy rozdział

Tekst rozdziału.

- Pierwsza pozycja listy
- Druga pozycja

### Podrozdział

Kolejny akapit.`}
        />
      </Card>

      {/* FAQ */}
      <Card title="Pytania i odpowiedzi" hint="Pokazują się na końcu artykułu i pomagają w SEO.">
        {form.faq.length === 0 && (
          <p className="text-sm text-foreground-muted text-center py-4">Brak pytań. Możesz dodać 3-5 pytań FAQ.</p>
        )}
        <ul className="space-y-3">
          {form.faq.map((f, i) => (
            <li key={i} className="rounded-2xl bg-background border border-border p-4 space-y-2">
              <div className="flex items-start justify-between gap-3 mb-1">
                <span className="inline-flex items-center justify-center size-6 rounded-full bg-foreground text-background text-xs font-bold">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  aria-label="Usuń pytanie"
                  className="text-foreground-muted hover:text-red-600 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
              <input
                type="text"
                value={f.q}
                onChange={(e) => setFaqField(i, "q", e.target.value)}
                placeholder="Pytanie"
                className="adm-input"
              />
              <textarea
                rows={3}
                value={f.a}
                onChange={(e) => setFaqField(i, "a", e.target.value)}
                placeholder="Odpowiedź"
                className="adm-input resize-y"
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={addFaq}
          className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-background border border-border hover:border-foreground text-sm font-semibold transition-colors"
        >
          <Plus className="size-4" />
          Dodaj pytanie
        </button>
      </Card>

      {/* Akcje */}
      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-foreground text-background p-4 shadow-[var(--shadow-card)]">
        <div className="text-sm text-background/80">
          {isNew ? "Nowy artykuł" : `Edytujesz: ${initial.title.slice(0, 40)}${initial.title.length > 40 ? "…" : ""}`}
        </div>
        <div className="flex items-center gap-3">
          {!isNew && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl border border-background/30 text-background/80 hover:text-background hover:border-background text-sm font-semibold transition-all disabled:opacity-50"
            >
              <Trash2 className="size-3.5" />
              Usuń
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-brand-lime text-brand-forest-deep font-semibold hover:bg-brand-lime-bright active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Save className="size-4" />
            {saving ? "Zapisuję…" : isNew ? "Opublikuj" : "Zapisz zmiany"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-surface border border-border p-5 lg:p-7">
      <header className="mb-5">
        <h2 className="font-bold text-lg text-foreground">{title}</h2>
        {hint && <p className="text-xs text-foreground-muted mt-1 leading-relaxed">{hint}</p>}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-brand-olive mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-foreground-muted mt-1.5 leading-relaxed">{hint}</span>}
    </label>
  );
}
