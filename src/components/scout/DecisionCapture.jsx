import { AnimatePresence, motion } from "framer-motion";
import { Check, Sliders, Search, X, Flag, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * DecisionCapture
 * A modal that captures the user's decision on a recommended action.
 * Options: Use, Adjust, Investigate, Dismiss, Flag issue.
 * Use/Adjust => onApply("applied"); Investigate => onApply("investigated");
 * Dismiss & Flag close the modal with optional logging callbacks.
 */
export function DecisionCapture({
  open,
  onClose,
  onDecision,
  title = "Capture your decision",
  recommendation = "",
  campaignName = "",
}) {
  const [stage, setStage] = useState("choose"); // choose | adjust | flag
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("Not enough evidence");

  useEffect(() => {
    if (open) {
      setStage("choose");
      setNote("");
      setReason("Not enough evidence");
    }
  }, [open]);

  const options = [
    {
      key: "use",
      label: "Use",
      desc: "Apply Scout's recommendation as proposed.",
      icon: Check,
      tone: "primary",
    },
    {
      key: "adjust",
      label: "Adjust",
      desc: "Apply with a small tweak — same shape, different number.",
      icon: Sliders,
      tone: "warm",
    },
    {
      key: "investigate",
      label: "Investigate",
      desc: "Open the evidence pack — I want to look closer first.",
      icon: Search,
      tone: "info",
    },
    {
      key: "dismiss",
      label: "Dismiss",
      desc: "Not relevant right now. Skip without logging an action.",
      icon: X,
      tone: "muted",
    },
    {
      key: "flag",
      label: "Flag issue",
      desc: "Something looks wrong with the diagnosis. Tell Scout why.",
      icon: Flag,
      tone: "danger",
    },
  ];

  const handle = (key) => {
    if (key === "use") onDecision("applied", { kind: "use", note });
    else if (key === "adjust") setStage("adjust");
    else if (key === "investigate") onDecision("investigated", { kind: "investigate" });
    else if (key === "dismiss") onDecision(null, { kind: "dismiss" });
    else if (key === "flag") setStage("flag");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.235_0.18_268/0.45)]"
          >
            <div
              aria-hidden
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.235 0.18 268), oklch(0.38 0.16 268))",
              }}
            />
            <div className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.235_0.18_268)]">
                    Decision capture
                  </div>
                  <h3 className="mt-1.5 font-display text-[22px] font-semibold leading-tight tracking-tight text-foreground">
                    {title}
                  </h3>
                  {recommendation && (
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Scout suggests:
                      </span>{" "}
                      {recommendation}
                      {campaignName ? (
                        <>
                          {" "}
                          on{" "}
                          <span className="font-semibold text-foreground">
                            {campaignName}
                          </span>
                        </>
                      ) : null}
                      .
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {stage === "choose" && (
                <div className="mt-6 grid grid-cols-1 gap-2">
                  {options.map((o) => (
                    <button
                      key={o.key}
                      onClick={() => handle(o.key)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 px-4 py-3 text-left transition hover:-translate-y-[1px] hover:border-[oklch(0.235_0.18_268)]/40 hover:bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-xl ${
                            o.tone === "primary"
                              ? "bg-[oklch(0.92_0.04_268)] text-[oklch(0.235_0.18_268)]"
                              : o.tone === "warm"
                                ? "bg-[oklch(0.92_0.04_268)] text-[oklch(0.235_0.18_268)]"
                                : o.tone === "info"
                                  ? "bg-[oklch(0.92_0.04_268)] text-[oklch(0.38_0.16_268)]"
                                  : o.tone === "danger"
                                    ? "bg-[oklch(0.92_0.04_268)] text-[oklch(0.235_0.18_268)]"
                                    : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          <o.icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-display text-[14.5px] font-semibold text-foreground">
                            {o.label}
                          </div>
                          <div className="text-[12px] leading-snug text-muted-foreground">
                            {o.desc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[oklch(0.235_0.18_268)]" />
                    </button>
                  ))}
                </div>
              )}

              {stage === "adjust" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      What are you tweaking?
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="e.g. Cap reduction at 10% instead of 13% for this cycle."
                      className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.235_0.18_268)]/40 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setStage("choose")}
                      className="cursor-pointer rounded-full px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => onDecision("applied", { kind: "adjust", note })}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-5 py-2.5 text-[13px] font-semibold text-[oklch(0.235_0.18_268)]-foreground transition hover:opacity-95"
                    >
                      <Check className="h-4 w-4" /> Apply adjusted
                    </button>
                  </div>
                </div>
              )}

              {stage === "flag" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      What's off?
                    </label>
                    <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {[
                        "Not enough evidence",
                        "Wrong root cause",
                        "Stale data",
                        "Risky for this account",
                      ].map((r) => (
                        <button
                          key={r}
                          onClick={() => setReason(r)}
                          className={`cursor-pointer rounded-xl border px-3 py-2 text-left text-[13px] transition ${
                            reason === r
                              ? "border-[oklch(0.235_0.18_268)] bg-[oklch(0.92_0.04_268)] text-foreground"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Optional detail — what should Scout have caught?"
                    className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.235_0.18_268)]/40 focus:outline-none"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setStage("choose")}
                      className="cursor-pointer rounded-full px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => onDecision(null, { kind: "flag", reason, note })}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition hover:opacity-90"
                    >
                      <Flag className="h-4 w-4" /> Send to Scout
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-5 border-t border-border pt-3 text-[11.5px] text-muted-foreground">
                Every decision is logged to{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-foreground">
                  agent_responses
                </code>{" "}
                with the timestamp and the chosen path.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
