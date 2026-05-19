import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

// Aspect ratio z logo-full.png: 1024 × 913
const ASPECT = 1024 / 913;

const heightMap: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 56,
  md: 76,
  lg: 112,
};

export function Logo({ className, size = "md" }: LogoProps) {
  const h = heightMap[size];
  const w = Math.round(h * ASPECT);

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-90",
        className
      )}
      aria-label="Strona główna. Starnawska & Boleńska Nieruchomości"
    >
      <Image
        src="/brand/logo-full.png"
        alt="Starnawska & Boleńska Nieruchomości"
        width={w}
        height={h}
        className="object-contain"
        priority
        sizes={`${w}px`}
      />
    </Link>
  );
}
