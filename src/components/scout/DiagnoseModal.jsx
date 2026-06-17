import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ScoutIconMark } from "./Logo";

const SUGGESTIONS = [
  "Client OK with higher spend this month",
  "New LP shipped 3 days ago",
  "Seasonal — last year showed same dip",
];

export function DiagnoseModal({ open, onClose, onSubmit, campaignName = "" }) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) setNote("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(20,23,31,0.45)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[680px] rounded-2xl bg-card p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                 <div  className="-ml-7  shrink-0">
                    <ScoutIconMark/>
                                  </div>
               
                <div>
                  <div className="text-[11px] -ml-5 font-semibold tracking-[0.14em] text-[oklch(0.235_0.18_268)]">
                    DIAGNOSE {campaignName && `· ${campaignName.toUpperCase()}`}
                  </div>
                  <h2 className="mt-1 -ml-5 font-display text-[26px] font-semibold tracking-tight text-foreground">
                    Anything I should know first?
                  </h2>
                  <p className="mt-2 -ml-5 max-w-md text-[14px] text-muted-foreground">
                    Optional. A one-liner about client tolerances, recent calls, or a hunch tightens the diagnosis.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="cursor-pointer rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Client OK with higher spend this month — they're running a Memorial Day push."
              rows={4}
              className="mt-6 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setNote((n) => (n ? `${n} ${s}` : s))}
                  className="cursor-pointer rounded-full border border-border bg-background px-4 py-1.5 text-[13px] text-foreground transition hover:border-[oklch(0.235_0.18_268)]/40 hover:bg-secondary"
                >
                  + {s}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <p className="max-w-xs text-[12px] text-muted-foreground">
                Scout will quote your note in its reasoning if it changes the answer.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="cursor-pointer rounded-full px-5 py-2.5 text-[14px] font-medium text-foreground transition hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onSubmit?.(note)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.665_0.215_36/0.7)] transition hover:opacity-95"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={2} />
                  Diagnose now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
