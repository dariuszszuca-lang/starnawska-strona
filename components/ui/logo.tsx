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
  sm: {
    box: 40,
    mainText: "text-base",
    subText: "text-[10px]",
    gap: "gap-3",
  },
  md: {
    box: 48,
    mainText: "text-lg lg:text-xl",
    subText: "text-[11px]",
    gap: "gap-3",
  },
  lg: {
    box: 64,
    mainText: "text-2xl lg:text-3xl",
    subText: "text-xs lg:text-[13px]",
    gap: "gap-4",
  },
};

const SUBLINE = "NIERUCHOMOŚCI";

export function Logo({
  className,
  variant = "light",
  showText = true,
  size = "md",
}: LogoProps) {
  const s = sizeMap[size];
  const mainColor = variant === "dark" ? "text-foreground-on-dark" : "text-foreground";
  const subColor = variant === "dark" ? "text-foreground-on-dark" : "text-foreground";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center transition-opacity hover:opacity-90",
        s.gap,
        className
      )}
      aria-label="Strona główna — Starnawska & Boleńska Nieruchomości"
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={s.box}
        height={s.box}
        className="rounded-xl shrink-0"
        priority
      />
      {showText && (
        <span className="inline-flex flex-col items-stretch leading-none">
          <span
            className={cn(
              "font-bold tracking-tight whitespace-nowrap",
              s.mainText,
              mainColor
            )}
          >
            Starnawska <span className="text-brand-olive font-normal mx-0.5">&</span> Boleńska
          </span>
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex items-center justify-between font-bold uppercase",
              s.subText,
              subColor
            )}
            style={{ letterSpacing: 0 }}
          >
            {SUBLINE.split("").map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </span>
          <span className="sr-only">Nieruchomości</span>
        </span>
      )}
    </Link>
  );
}
