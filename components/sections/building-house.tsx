"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animacja budującego się domu — sekwencja elementów składa się
 * od fundamentu, przez ściany, do dachu. Po pełnym złożeniu pauza,
 * potem cykl od nowa. Paleta jak logo (czerń + lime + forest green).
 */
export function BuildingHouse() {
  const reduce = useReducedMotion();

  // Czas pojedynczego "buduje się" + pauza
  const TOTAL = 5.4;

  const transition = (delay: number) => ({
    duration: 0.55,
    delay,
    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    repeat: reduce ? 0 : Infinity,
    repeatDelay: TOTAL - delay - 0.55,
  });

  // Wariant: skala od 0 do 1, rosną z dołu (origin bottom)
  const grow = (delay: number) => ({
    initial: { scaleY: 0, opacity: 0 },
    animate: { scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] },
    transition: {
      ...transition(delay),
      times: [0, 0.12, 0.88, 1],
    },
  });

  // Dach: spada z góry
  const drop = (delay: number) => ({
    initial: { y: -60, opacity: 0, rotate: -3 },
    animate: { y: [60, 0, 0, -30], opacity: [0, 1, 1, 0], rotate: [-8, 0, 0, 0] },
    transition: {
      ...transition(delay),
      times: [0, 0.18, 0.88, 1],
    },
  });

  // Fundament: pojawia się pierwszy, instant
  const ground = (delay: number) => ({
    initial: { scaleX: 0, opacity: 0 },
    animate: { scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] },
    transition: {
      ...transition(delay),
      times: [0, 0.08, 0.92, 1],
    },
  });

  return (
    <div className="relative aspect-square max-w-[480px] mx-auto">
      {/* Glow background */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-brand-lime/25 to-brand-forest/45 blur-2xl"
      />

      <div className="relative h-full rounded-[40px] bg-gradient-to-br from-gray-900 to-black border border-border-on-dark overflow-hidden">
        {/* Subtle radial */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(163,199,51,0.18),transparent_55%)]"
        />

        {/* Grid pattern — jak rysunek architektoniczny */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fafaf7 1px, transparent 1px), linear-gradient(to bottom, #fafaf7 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Status pill — co aktualnie się dzieje */}
        <Phases />

        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full p-12"
          aria-label="Animacja budowy domu"
          role="img"
        >
          <defs>
            <linearGradient id="lime" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfd968" />
              <stop offset="100%" stopColor="#84b324" />
            </linearGradient>
            <linearGradient id="forest" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d6b22" />
              <stop offset="100%" stopColor="#1f3a1b" />
            </linearGradient>
            <linearGradient id="forestSide" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d4a1f" />
              <stop offset="100%" stopColor="#1a2e12" />
            </linearGradient>
          </defs>

          {/* 1. Fundament — pozioma kreska */}
          <motion.rect
            x="50"
            y="320"
            width="300"
            height="6"
            rx="3"
            fill="#a3c733"
            style={{ transformOrigin: "200px 323px" }}
            {...ground(0)}
          />

          {/* 2. Lewy filar — wysoki, ciemny */}
          <motion.path
            d="M 90 320 L 90 180 L 150 145 L 150 320 Z"
            fill="url(#forestSide)"
            stroke="#a3c733"
            strokeWidth="0.5"
            style={{ transformOrigin: "120px 320px" }}
            {...grow(0.4)}
          />

          {/* 3. Prawy filar — wysoki, ciemny */}
          <motion.path
            d="M 250 145 L 310 180 L 310 320 L 250 320 Z"
            fill="url(#forest)"
            stroke="#a3c733"
            strokeWidth="0.5"
            style={{ transformOrigin: "280px 320px" }}
            {...grow(0.9)}
          />

          {/* 4. Mały filar (drzwi) — w środku, jasno-zielony */}
          <motion.path
            d="M 175 320 L 175 240 L 215 240 L 215 320 Z"
            fill="url(#lime)"
            stroke="#1f3a1b"
            strokeWidth="0.5"
            style={{ transformOrigin: "195px 320px" }}
            {...grow(1.4)}
          />

          {/* 5. Dach — duży lime romb, spada z góry */}
          <motion.g {...drop(1.95)} style={{ transformOrigin: "200px 100px" }}>
            <path
              d="M 110 145 L 200 75 L 290 145 L 200 215 Z"
              fill="url(#lime)"
              stroke="#1f3a1b"
              strokeWidth="1.5"
            />
            {/* Subtle shadow line */}
            <path
              d="M 200 75 L 200 215"
              stroke="#1f3a1b"
              strokeWidth="0.8"
              opacity="0.4"
            />
            <path
              d="M 110 145 L 290 145"
              stroke="#1f3a1b"
              strokeWidth="0.8"
              opacity="0.3"
            />
          </motion.g>

          {/* Linie wymiarowe — architektoniczne akcenty */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.5, 0] }}
            transition={{
              duration: TOTAL,
              times: [0, 0.5, 0.88, 1],
              repeat: reduce ? 0 : Infinity,
              ease: "linear",
            }}
            stroke="#a3c733"
            strokeWidth="0.5"
            strokeDasharray="2 3"
            fill="none"
          >
            <line x1="50" y1="340" x2="350" y2="340" />
            <line x1="50" y1="335" x2="50" y2="345" />
            <line x1="350" y1="335" x2="350" y2="345" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

/* ============================================
   Floating "phase" pill — pokazuje co się buduje
   ============================================ */
function Phases() {
  const reduce = useReducedMotion();
  const phases = [
    { t: 0.0, label: "Fundament" },
    { t: 0.4, label: "Konstrukcja" },
    { t: 1.4, label: "Wykończenie" },
    { t: 1.95, label: "Dach" },
    { t: 2.6, label: "Gotowe" },
  ];

  return (
    <div className="absolute top-5 right-5 z-10 flex flex-col items-end gap-2">
      {phases.map((p, i) => {
        const start = p.t;
        const end = phases[i + 1]?.t ?? 4.8;
        return (
          <motion.span
            key={p.label}
            initial={{ opacity: 0, x: 8 }}
            animate={
              reduce
                ? { opacity: 0.5, x: 0 }
                : {
                    opacity: [0, 0, 1, 1, 0],
                    x: [8, 8, 0, 0, -8],
                  }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 5.4,
                    times: [
                      0,
                      start / 5.4,
                      Math.min(start + 0.25, 5.39) / 5.4,
                      Math.min(end - 0.05, 5.39) / 5.4,
                      Math.min(end + 0.2, 5.4) / 5.4,
                    ],
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-border-on-dark backdrop-blur text-[10px] font-medium text-foreground-on-dark-muted uppercase tracking-wider"
          >
            <span className="size-1 rounded-full bg-brand-lime" />
            {p.label}
          </motion.span>
        );
      })}
    </div>
  );
}
