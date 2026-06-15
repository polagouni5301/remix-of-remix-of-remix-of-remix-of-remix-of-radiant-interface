import { createFileRoute, useNavigate, useParams, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { ScoutMark } from "../components/scout/Logo";
import { Header } from "../components/scout/Header";
import { getCampaign } from "../data/campaigns";
import heroOrb from "../assets/hero-aci.jpg";

const STEPS = [
  "Pulling pacing data from BigQuery",
  "Reading change history (KBAS / XBAS)",
  "Sampling top-20 keywords by 7-day cost",
  "Computing publisher distribution",
  "Checking Smart Bidding + maturity guardrails",
  "Reasoning over the evidence package",
  "Validating the recommendation",
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
      }, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step, id, navigate]);

  const progress = Math.min(step / STEPS.length, 1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient orb background */}
      <motion.img
        aria-hidden
        src={heroOrb}
        alt=""
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[720px] w-[720px] select-none mix-blend-screen"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -left-48 top-1/3 -z-10 h-[480px] w-[480px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.62 0.2 35 / 0.5), transparent)",
        }}
      />

      <Header />

      <main className="relative mx-auto flex max-w-[960px] flex-col items-center px-6 pt-16 pb-24 md:px-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 -m-3 rounded-full bg-primary/25 blur-2xl"
          />
          <div className="relative">
            <ScoutMark size={84} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Live diagnosis
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-5 text-center font-display text-[clamp(36px,5vw,56px)] font-semibold leading-[1.02] tracking-tight"
        >
          <span className="bg-gradient-to-r from-primary via-[oklch(0.6_0.2_38)] to-[oklch(0.72_0.2_55)] bg-clip-text text-transparent">
            Scout is reasoning
          </span>
          <br />
          <span className="text-muted-foreground/80">through the evidence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-4 max-w-xl text-center text-[15px] leading-relaxed text-muted-foreground"
        >
          Assembling a full evidence package on{" "}
          <span className="font-semibold text-foreground">{campaign?.name}</span>
          . Median diagnosis lands around{" "}
          <span className="font-semibold text-foreground">12 seconds</span> — you'll
          see every input it used.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 w-full overflow-hidden rounded-3xl border border-border bg-card/80 p-8 shadow-[0_30px_60px_-30px_oklch(0.35_0.12_25/0.25)] backdrop-blur"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
            </span>
            <span className="font-display text-[16px] font-semibold text-foreground">
              {elapsed.toFixed(1)}
              <span className="ml-0.5 text-[12px] font-normal text-muted-foreground">
                s elapsed
              </span>
            </span>
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.72_0.2_55)]"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <ul className="mt-8 space-y-4">
            {STEPS.map((label, i) => {
              const state =
                i < step ? "done" : i === step ? "active" : "pending";
              return (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05, duration: 0.35 }}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <StepDot state={state} />
                    <span
                      className={`truncate text-[15px] ${
                        state === "pending"
                          ? "text-muted-foreground/60"
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
                        className="shrink-0 text-[12px] font-mono uppercase tracking-widest text-[oklch(0.5_0.13_155)]"
                      >
                        ✓ done
                      </motion.span>
                    )}
                    {state === "active" && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="shrink-0 text-[12px] font-mono uppercase tracking-widest text-primary"
                      >
                        running…
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {[
            { k: "Auditable", v: "Every input logged" },
            { k: "Reversible", v: "Nothing ships without you" },
            { k: "Cited", v: "Sources behind every claim" },
          ].map((m) => (
            <div
              key={m.k}
              className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur"
            >
              <div className="text-[11px] font-mono uppercase tracking-widest text-primary">
                {m.k}
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground">
                {m.v}
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

function StepDot({ state }: { state: "done" | "active" | "pending" }) {
  if (state === "done") {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
        <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="h-3 w-3 rounded-full bg-primary" />
      </div>
    );
  }
  return <div className="h-6 w-6 shrink-0 rounded-full bg-secondary" />;
}