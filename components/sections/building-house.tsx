"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animacja: dom z logo buduje się sekwencyjnie, na końcu pojawia się
 * pieczątka SPRZEDANE i kwota. Dłuższa faza "gotowe" żeby było widać.
 */

const TOTAL = 9; // sekund cały cykl

// helper: zwraca obiekt animacji z properly normalized times
function makeAnim<T extends Record<string, number[]>>(
  values: T,
  keyTimes: number[],
  loop: boolean
) {
  return {
    animate: values,
    transition: {
      duration: TOTAL,
      times: keyTimes,
      repeat: loop ? Infinity : 0,
      ease: "linear" as const,
    },
  };
}

export function BuildingHouse() {
  const reduce = useReducedMotion();
  const loop = !reduce;

  // Punkty czasowe (0-1 w stosunku do TOTAL):
  // 0.00 — start (wszystko niewidoczne)
  // 0.05 — pojawia się fundament
  // 0.15 — lewy filar
  // 0.25 — prawy filar
  // 0.35 — mały filar
  // 0.45 — dach
  // 0.55 — wszystko widoczne, pojawia się pieczątka SPRZEDANE
  // 0.90 — start fade out
  // 1.00 — koniec, fade do 0
  return (
    <div className="relative aspect-square max-w-[500px] mx-auto">
      <div
        aria-hidden
        className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-brand-lime/30 to-brand-forest/50 blur-2xl"
      />

      <div className="relative h-full rounded-[40px] bg-gradient-to-br from-gray-900 to-black border border-border-on-dark overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(163,199,51,0.22),transparent_55%)]"
        />

        {/* Grid architektoniczny */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fafaf7 1px, transparent 1px), linear-gradient(to bottom, #fafaf7 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Phase label u góry */}
        <Phases loop={loop} />

        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full p-6"
          aria-label="Animacja: dom się buduje i zostaje sprzedany"
          role="img"
        >
          <defs>
            <linearGradient id="bh-lime" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9e26b" />
              <stop offset="100%" stopColor="#84b324" />
            </linearGradient>
            <linearGradient id="bh-forest-l" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d6b22" />
              <stop offset="100%" stopColor="#1a2e12" />
            </linearGradient>
            <linearGradient id="bh-forest-r" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d6b22" />
              <stop offset="100%" stopColor="#1a2e12" />
            </linearGradient>
            <filter id="bh-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Trawa / fundament - lekka linia */}
          <motion.line
            x1="40"
            y1="345"
            x2="360"
            y2="345"
            stroke="#a3c733"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            {...makeAnim(
              {
                pathLength: [0, 1, 1, 1, 0],
                opacity: [0, 1, 1, 1, 0],
              },
              [0, 0.06, 0.55, 0.9, 1],
              loop
            )}
          />

          {/* Lewy ciemnozielony filar */}
          <motion.path
            d="M 90 340 L 90 175 L 165 130 L 165 340 Z"
            fill="url(#bh-forest-l)"
            stroke="#84b324"
            strokeWidth="1.5"
            filter="url(#bh-shadow)"
            style={{ transformOrigin: "127px 340px" }}
            initial={{ scaleY: 0, opacity: 0 }}
            {...makeAnim(
              {
                scaleY: [0, 0, 1, 1, 1, 0.95],
                opacity: [0, 0, 1, 1, 1, 0],
              },
              [0, 0.1, 0.2, 0.55, 0.9, 1],
              loop
            )}
          />

          {/* Prawy ciemnozielony filar */}
          <motion.path
            d="M 235 130 L 310 175 L 310 340 L 235 340 Z"
            fill="url(#bh-forest-r)"
            stroke="#84b324"
            strokeWidth="1.5"
            filter="url(#bh-shadow)"
            style={{ transformOrigin: "272px 340px" }}
            initial={{ scaleY: 0, opacity: 0 }}
            {...makeAnim(
              {
                scaleY: [0, 0, 0, 1, 1, 1, 0.95],
                opacity: [0, 0, 0, 1, 1, 1, 0],
              },
              [0, 0.1, 0.2, 0.3, 0.55, 0.9, 1],
              loop
            )}
          />

          {/* Mały filar w środku (drzwi / komin) - lime */}
          <motion.path
            d="M 180 340 L 180 250 L 220 250 L 220 340 Z"
            fill="url(#bh-lime)"
            stroke="#1a2e12"
            strokeWidth="1.5"
            filter="url(#bh-shadow)"
            style={{ transformOrigin: "200px 340px" }}
            initial={{ scaleY: 0, opacity: 0 }}
            {...makeAnim(
              {
                scaleY: [0, 0, 0, 0, 1, 1, 1, 0.95],
                opacity: [0, 0, 0, 0, 1, 1, 1, 0],
              },
              [0, 0.1, 0.2, 0.3, 0.4, 0.55, 0.9, 1],
              loop
            )}
          />

          {/* Dach - duży lime romb */}
          <motion.g
            initial={{ y: -120, opacity: 0, rotate: -8 }}
            {...makeAnim(
              {
                y: [-120, -120, -120, -120, -120, 0, 0, -30],
                opacity: [0, 0, 0, 0, 0, 1, 1, 0],
                rotate: [-12, -12, -12, -12, -12, 0, 0, -4],
              },
              [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.9, 1],
              loop
            )}
            style={{ transformOrigin: "200px 80px" }}
          >
            <path
              d="M 105 175 L 200 90 L 295 175 L 200 250 Z"
              fill="url(#bh-lime)"
              stroke="#1a2e12"
              strokeWidth="2.5"
              filter="url(#bh-shadow)"
            />
            <path
              d="M 200 90 L 200 250"
              stroke="#1a2e12"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <path
              d="M 105 175 L 295 175"
              stroke="#1a2e12"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </motion.g>

          {/* Pieczątka SPRZEDANE - pojawia się gdy dom zbudowany */}
          <motion.g
            initial={{ opacity: 0, scale: 0, rotate: -25 }}
            {...makeAnim(
              {
                opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0],
                scale: [0, 0, 0, 0, 0, 0, 1.05, 1, 0.9],
                rotate: [-25, -25, -25, -25, -25, -25, -10, -10, -8],
              },
              [0, 0.1, 0.2, 0.3, 0.4, 0.55, 0.6, 0.9, 1],
              loop
            )}
            style={{ transformOrigin: "200px 200px" }}
          >
            <ellipse
              cx="200"
              cy="200"
              rx="120"
              ry="40"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              opacity="0.9"
            />
            <ellipse
              cx="200"
              cy="200"
              rx="113"
              ry="34"
              fill="none"
              stroke="#dc2626"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <text
              x="200"
              y="208"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              fontSize="32"
              fontWeight="900"
              letterSpacing="3"
              fill="#dc2626"
              opacity="0.95"
            >
              SPRZEDANE
            </text>
          </motion.g>

          {/* Linia wymiarowa pod domem */}
          <motion.g
            stroke="#a3c733"
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
            initial={{ opacity: 0 }}
            {...makeAnim(
              { opacity: [0, 0, 0.5, 0.5, 0.5, 0.5, 0] },
              [0, 0.2, 0.3, 0.5, 0.55, 0.9, 1],
              loop
            )}
          >
            <line x1="90" y1="365" x2="310" y2="365" />
            <line x1="90" y1="360" x2="90" y2="372" />
            <line x1="310" y1="360" x2="310" y2="372" />
            <text
              x="200"
              y="385"
              textAnchor="middle"
              fill="#a3c733"
              fontSize="11"
              fontFamily="system-ui, sans-serif"
              fontWeight="600"
              letterSpacing="2"
            >
              TWÓJ NOWY DOM
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

/* ============================================
   Phase indicator - co teraz się dzieje
   ============================================ */
function Phases({ loop }: { loop: boolean }) {
  const phases = [
    { from: 0.05, to: 0.15, label: "Działka", icon: "▬" },
    { from: 0.15, to: 0.35, label: "Konstrukcja", icon: "▮ ▮" },
    { from: 0.35, to: 0.5, label: "Wykończenie", icon: "▮ ▮ ▮" },
    { from: 0.5, to: 0.6, label: "Dach", icon: "◆" },
    { from: 0.6, to: 0.9, label: "Sprzedane", icon: "✓" },
  ];

  return (
    <div className="absolute top-5 right-5 z-10 flex flex-col items-end">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-border-on-dark backdrop-blur text-foreground-on-dark-muted">
        <span className="size-1.5 rounded-full bg-brand-lime animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
          Etap budowy
        </span>
      </div>
      <div className="mt-2 relative h-7 overflow-hidden w-[140px]">
        {phases.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={
              loop
                ? {
                    opacity: [0, 0, 1, 1, 0, 0],
                    y: [12, 12, 0, 0, -12, -12],
                  }
                : { opacity: 1, y: 0 }
            }
            transition={
              loop
                ? {
                    duration: TOTAL,
                    times: [
                      0,
                      Math.max(p.from - 0.02, 0),
                      p.from,
                      Math.min(p.to - 0.02, 1),
                      p.to,
                      1,
                    ],
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { duration: 0 }
            }
            className="absolute right-0 top-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime text-xs font-semibold uppercase tracking-wider"
          >
            <span className="text-[10px] font-bold">{p.icon}</span>
            {p.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
