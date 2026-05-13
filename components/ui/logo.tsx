import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { box: 32, text: "text-base" },
  md: { box: 40, text: "text-lg" },
  lg: { box: 56, text: "text-2xl" },
};

export function Logo({
  className,
  variant = "light",
  showText = true,
  size = "md",
}: LogoProps) {
  const s = sizeMap[size];
  const textColor = variant === "dark" ? "text-foreground-on-dark" : "text-foreground";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        className
      )}
      aria-label="Strona główna — Starnawska & Boleńska Nieruchomości"
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={s.box}
        height={s.box}
        className="rounded-lg"
        priority
      />
      {showText && (
        <span className={cn("font-semibold tracking-tight leading-none", s.text, textColor)}>
          Starnawska
          <span className="text-brand-olive">&</span>
          Boleńska
        </span>
      )}
    </Link>
  );
}
