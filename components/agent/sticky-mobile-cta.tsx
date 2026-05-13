"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import type { TeamMember } from "@/lib/team";

export function StickyMobileCTA({ member }: { member: TeamMember }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden fixed bottom-4 left-4 right-4 z-40"
        >
          <div className="flex items-stretch gap-2 p-2 rounded-2xl bg-surface-dark text-foreground-on-dark border border-border-on-dark shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
            {member.phone && (
              <a
                href={`tel:${member.phone.replace(/\s/g, "")}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-lime text-brand-forest-deep font-semibold text-sm transition-transform active:scale-[0.98]"
              >
                <Phone className="size-4" />
                Zadzwoń
              </a>
            )}
            <Link
              href={`/konsultacja?agentka=${member.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-border-on-dark text-foreground-on-dark font-medium text-sm transition-colors hover:bg-white/10"
            >
              <MessageCircle className="size-4" />
              Napisz
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
