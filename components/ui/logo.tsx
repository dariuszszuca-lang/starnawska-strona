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
    box: 36,
    mainText: "text-base",
    subText: "text-[9px]",
    subLetterSpacing: "tracking-[0.32em]",
  },
  md: {
    box: 44,
    mainText: "text-lg",
    subText: "text-[10px]",
    subLetterSpacing: "tracking-[0.36em]",
  },
  lg: {
    box: 64,
    mainText: "text-2xl",
    subText: "text-xs",
    subLetterSpacing: "tracking-[0.42em]",
  },
};

export function Logo({
  className,
  variant = "light",
  showText = true,
  size = "md",
}: LogoProps) {
  const s = sizeMap[size];
  const mainColor = variant === "dark" ? "text-foreground-on-dark" : "text-foreground";
  const subColor =
    variant === "dark" ? "text-foreground-on-dark-muted" : "text-foreground-muted";

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
        <span className="inline-flex flex-col items-stretch leading-none">
          <span
            className={cn(
              "font-semibold tracking-tight whitespace-nowrap",
              s.mainText,
              mainColor
            )}
          >
            Starnawska <span className="text-brand-olive font-normal">&</span> Boleńska
          </span>
          <span
            className={cn(
              "font-medium uppercase mt-1.5 text-center",
              s.subText,
              s.subLetterSpacing,
              subColor
            )}
          >
            Nieruchomości
          </span>
        </span>
      )}
    </Link>
  );
}
