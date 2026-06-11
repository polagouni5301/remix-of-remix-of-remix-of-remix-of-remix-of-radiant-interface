import { createFileRoute, useNavigate, useParams, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { ScoutMark } from "../components/scout/Logo";
import { Header } from "../components/scout/Header";
import { getCampaign } from "../data/campaigns";

const STEPS = [
  "Pulling pacing data (BigQuery)",
  "Reading change history (KBAS / XBAS)",
  "Sampling top-20 keywords by 7d cost",
  "Computing publisher distribution",
  "Checking Smart Bidding + maturity guardrails",
  "Reasoning over evidence package",
  "Validating recommendation",
];

const STEP_MS = 900;

export const Route = createFileRoute("/diagnose/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Diagnosing ${params.id} — LocaliQ` }],
  }),
  component: Diagnosing,
  loader: ({ params }) => {
    const c = getCampaign(params.id);
    if (!c) throw notFound();
    return c;
  },
});

function Diagnosing() {
  const { id } = useParams({ from: "/diagnose/$id" });
  const campaign = getCampaign(id);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 0.1), 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(() => {
        navigate({ to: "/campaign/$id", params: { id } });
      }, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step, id, navigate]);

  const progress = Math.min(step / STEPS.length, 1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto flex max-w-[920px] flex-col items-center px-8 pt-16 pb-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScoutMark size={72} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-8 text-center font-display text-[42px] font-semibold tracking-tight"
        >
          Scout is on it.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-3 text-center text-[15px] text-muted-foreground"
        >
          Assembling evidence on{" "}
          <span className="font-semibold text-foreground">{campaign?.name}</span>. This
          usually takes 12 seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-12 w-full rounded-3xl border border-border bg-card p-8"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] text-muted-foreground">
              Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
            </span>
            <span className="font-display text-[16px] font-semibold text-foreground">
              {elapsed.toFixed(1)}s elapsed
            </span>
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <ul className="mt-8 space-y-5">
            {STEPS.map((label, i) => {
              const state = i < step ? "done" : i === step ? "active" : "pending";
              return (
                <li key={label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <StepDot state={state} />
                    <span
                      className={`text-[15px] ${
                        state === "pending"
                          ? "text-muted-foreground/70"
                          : state === "active"
                            ? "font-semibold text-foreground"
                            : "text-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  <AnimatePresence>
                    {state === "done" && (
                      <motion.span
                        initial={{ opacity: 0, x: 4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[13px] italic text-muted-foreground"
                      >
                        done
                      </motion.span>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <p className="mt-8 text-center text-[13px] text-muted-foreground">
          You'll be able to see every input Scout used to reach its conclusion.
        </p>
      </main>
    </div>
  );
}

function StepDot({ state }) {
  if (state === "done") {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
        <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="relative flex h-6 w-6 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="h-3 w-3 rounded-full bg-primary" />
      </div>
    );
  }
  return <div className="h-6 w-6 rounded-full bg-secondary" />;
}
