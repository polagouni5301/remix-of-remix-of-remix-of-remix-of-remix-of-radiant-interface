import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Clock3,
  Database,
  Eye,
  Gauge,
  Layers,
  Lock,
  Radar,
  Send,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import { ScoutIconMark } from "@/components/scout/Logo";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Agentic Campaign Intelligence - Diagnose paid search in seconds" },
      {
        name: "description",
        content:
          "An AI agent for paid search teams. Assemble context, reason about anomalies, validate fixes, and ship with confidence.",
      },
    ],
  }),
  component: LandingPage,
});

const heroBackdrop =
  "radial-gradient(120% 90% at 75% 0%, oklch(0.946 0.016 82) 0%, oklch(0.946 0.016 82) 50%, oklch(0.946 0.016 82) 100%)";

const fade: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const sectionMotion = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
      <span className="text-primary">{n}</span>
      <span className="h-px w-8 bg-border" />
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <div className={`mt-5 max-w-3xl ${centered ? "mx-auto" : ""}`}>
        <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.8rem)] font-semibold leading-[0.98] tracking-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_12px_30px_-24px_oklch(0.235_0.18_268/0.4)]">
      <div className="font-display text-[clamp(2.2rem,5.2vw,4.1rem)] font-semibold leading-none tracking-tighter text-foreground">
        {value}
      </div>
      <div className="mt-3 text-[14px] font-semibold text-foreground">{label}</div>
      <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[740px] lg:max-w-[740px]">
      <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_30%,oklch(0.78_0.13_40/0.16),transparent_46%),radial-gradient(circle_at_65%_25%,oklch(0.78_0.13_40/0.14),transparent_38%)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,oklch(0.235_0.18_268)_0%,oklch(0.18_0.14_268)_100%)] shadow-[0_30px_70px_-28px_oklch(0.235_0.18_268/0.5)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
           
          </span>
          <span className="rounded-full border border-[oklch(0.78_0.13_40/0.22)] bg-[oklch(0.78_0.13_40/0.12)] px-2.5 py-0.5 text-[10px] font-semibold text-[oklch(0.94_0.05_45)]">
            94% confidence
          </span>
        </div>

        <div className="grid gap-4 p-4">
          <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 text-white">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                Root cause detected
              </div>
              <div className="mt-2 font-display text-[17px] font-semibold tracking-tight">
                Negative keyword conflict
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { l: "Impr", v: "18.4K" },
                  { l: "CTR", v: "4.2%" },
                  { l: "CPC", v: "$3.14" },
                ].map((item) => (
                  <div key={item.l} className="rounded-2xl border border-white/8 bg-black/20 p-3">
                    <div className="text-[9px] uppercase tracking-[0.18em] text-white/42">
                      {item.l}
                    </div>
                    <div className="mt-1 font-display text-[16px] font-semibold text-white">
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-white/8 bg-black/25 p-4 text-white">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                Evidence trail
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[30, 48, 36, 60].map((height, index) => (
                  <div
                    key={index}
                    className="flex h-16 items-end rounded-xl bg-[linear-gradient(180deg,oklch(0.235_0.18_268),oklch(0.18_0.14_268))] p-1.5"
                  >
                    <div
                      className="w-full rounded-t-full bg-[linear-gradient(180deg,oklch(0.78_0.13_40),oklch(0.55_0.19_28))]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["Assemble", "Reason", "Respond"].map((title, index) => {
              const detail =
                title === "Assemble"
                  ? "Evidence is pulled from curated BigQuery views, then packaged into one bounded snapshot."
                  : title === "Reason"
                    ? "Only the reasoning step uses Gemini. The other stages stay deterministic."
                    : "A validated recommendation returns with guardrails, logging, and human approval.";

              return (
                <div
                  key={title}
                  className="min-h-[128px] rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-3"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {title}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/72">{detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_20%,oklch(0.78_0.13_40/0.15),transparent_42%),radial-gradient(circle_at_85%_35%,oklch(0.665_0.215_36/0.1),transparent_30%)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.8rem] border border-border bg-[linear-gradient(180deg,oklch(0.99_0.004_60)_0%,oklch(0.96_0.01_55)_100%)] p-4 shadow-[0_24px_60px_-36px_oklch(0.235_0.18_268/0.4)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Architecture
            </div>
            <div className="mt-1 font-display text-[18px] font-semibold tracking-tight text-foreground">
              GCP-native diagnosis loop
            </div>
          </div>
          <div className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[10px] font-semibold text-primary">
            secure by design
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            {
              step: "Detect",
              detail: "Reads campaign-state metrics from curated views and sets anomaly flags.",
            },
            {
              step: "Assemble",
              detail: "Builds one bounded evidence package from parallel BigQuery queries.",
            },
            {
              step: "Reason",
              detail:
                "Runs a single Gemini call on structured evidence. This is the only LLM step.",
            },
            {
              step: "Validate",
              detail: "Applies deterministic guardrails before anything reaches the user.",
            },
            {
              step: "Respond",
              detail:
                "Returns the diagnosis, logs the decision, and keeps human approval in control.",
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className="flex items-start gap-3 rounded-2xl border border-border bg-white p-3.5"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <span className="font-mono text-[10px] font-semibold">0{index + 1}</span>
              </div>
              <div className="min-w-0">
                <div className="font-display text-[14px] font-semibold tracking-tight text-foreground">
                  {item.step}
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-[linear-gradient(180deg,oklch(0.946_0.016_82)_0%,oklch(0.946_0.016_82)_100%)] p-3.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Core stack
            </div>
            <Lock className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
            {["BigQuery", "Vertex AI", "Cloud Run", "Memorystore"].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-white px-2.5 py-2 font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -36]);

  const pipeline = [
    {
      icon: Radar,
      n: "01",
      title: "Detect",
      detail: "Signals surface the second pacing, tracking, or performance drift starts to matter.",
    },
    {
      icon: Database,
      n: "02",
      title: "Assemble",
      detail:
        "Relevant campaign context is joined into one evidence set instead of scattered tabs.",
    },
    {
      icon: Brain,
      n: "03",
      title: "Reason",
      detail: "Agentic analysis turns the evidence into ranked hypotheses and a clear root cause.",
    },
    {
      icon: ShieldCheck,
      n: "04",
      title: "Validate",
      detail:
        "Policy and safety checks remove risky recommendations before they reach the account.",
    },
    {
      icon: Send,
      n: "05",
      title: "Respond",
      detail: "You get a clean recommendation, the source trail, and a human-approved next step.",
    },
  ];

  const capabilities = [
    {
      icon: Zap,
      title: "Annotated evidence",
      detail: "Pulls the right signals into one review-ready summary instead of scattered tabs.",
    },
    {
      icon: Layers,
      title: "Campaign memory",
      detail: "Keeps diagnosis history and prior context attached to the account, not in chat.",
    },
    {
      icon: Gauge,
      title: "Decision draft",
      detail: "Turns the evidence into a concise recommendation that is ready to review.",
    },
    {
      icon: ShieldCheck,
      title: "Guarded handoff",
      detail: "Adds policy checks and approval steps before anything can move live.",
    },
  ];

  const outcomes = [
    {
      value: "80%",
      label: "less time investigating",
      detail: "Shorten the diagnosis loop without changing how the team approves work.",
    },
    {
      value: "2.4x",
      label: "more campaigns reviewed",
      detail: "Cover more of the account surface each week with the same team bandwidth.",
    },
    {
      value: "100%",
      label: "decisions documented",
      detail: "Every recommendation leaves a trace that can be revisited and audited.",
    },
  ];

  const trust = [
    {
      icon: Eye,
      title: "Human review gate",
      detail: "Nothing changes without explicit approval from the account owner.",
    },
    {
      icon: Lock,
      title: "Policy checks",
      detail: "Every recommendation is screened before it reaches a live platform.",
    },
    {
      icon: ShieldCheck,
      title: "No autonomous execution",
      detail: "Scout proposes the path forward. Your team approves the action.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <Shell>
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex items-center gap-2 font-display text-[18px] font-semibold tracking-tight">
                <img
                  src="https://localiq.au/wp-content/uploads/2024/06/LiQ_Logo_icon.png"
                  alt="LocaliQ"
                  className="h-[30px] w-auto"
                />
                <span className="font-display text-[20px] font-semibold tracking-tight">
                  LocaliQ
                </span>
                <span className="text-black/60 font-display text-[20px] font-semibold tracking-tight">
                  / Scout
                </span>
                <ScoutIconMark size={46} />
              </span>
            </Link>

            <div className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
              <a className="transition hover:text-foreground" href="#pipeline">
                How it thinks
              </a>
              <a className="transition hover:text-foreground" href="#capabilities">
                Capabilities
              </a>
              <a className="transition hover:text-foreground" href="#architecture">
                Architecture
              </a>
              <a className="transition hover:text-foreground" href="#trust">
                Trust
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-[13px] font-medium text-muted-foreground transition hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.665_0.215_36/0.7)] transition hover:opacity-95"
              >
                Start diagnosis <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Shell>
      </nav>

      <header
        ref={heroRef}
        className="relative isolate overflow-hidden"
        style={{ background: heroBackdrop }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(oklch(0.235 0.18 268) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="pointer-events-none absolute -left-20 top-12 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-8 h-96 w-96 rounded-full bg-[oklch(0.78_0.13_40/0.14)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background/35" />

        <Shell className="grid grid-cols-1 items-start gap-10 pt-10 pb-14 sm:pt-12 sm:pb-16 lg:grid-cols-[0.96fr_1.04fr] lg:gap-12 lg:pt-14 lg:pb-20 xl:max-w-[1360px]">
          <motion.div
            style={{ y: heroTextY }}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h1
              variants={fade}
              className="mt-0 max-w-[11ch] font-display text-[clamp(3rem,6.8vw,5.4rem)] font-semibold leading-[0.9] tracking-tight text-foreground"
            >
              Diagnose a campaign
              <span className="block text-primary">before your coffee</span>
              cools.
            </motion.h1>

            <motion.p
              variants={fade}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
            >
              Scout watches the account surface, assembles the evidence, reasons about the anomaly,
              and returns a recommendation you can review, audit, and ship with confidence.
            </motion.p>

            <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition hover:bg-foreground/90"
              >
                Run a free diagnosis
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[13px] font-semibold text-foreground transition hover:border-primary/40"
              >
                See how it thinks
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:pt-2"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            style={{ y: heroImgY, scale: heroImgScale }}
          >
            <HeroVisual />
          </motion.div>
        </Shell>
      </header>

     

      <section className="relative overflow-hidden border-b border-border/70 bg-[linear-gradient(180deg,oklch(0.985_0.008_82)_0%,oklch(0.946_0.016_82)_100%)] pt-4 pb-8 sm:pb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.78_0.13_40/0.08),transparent_36%),radial-gradient(circle_at_10%_0%,oklch(0.78_0.13_40/0.06),transparent_32%)]" />
        <Shell>
          <div className="relative">
            <SectionLabel n="01" label="The problem" />
            <div className="mt-7 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
              <div className="lg:pr-10">
                <h2 className="max-w-[720px] font-display text-[clamp(2.6rem,4.2vw,4.15rem)] font-semibold leading-[0.98] tracking-tight text-foreground">
                  Your best analysts are
                  <span className="block">spending their day</span>
                  <span className="block">copy-pasting into spreadsheets.</span>
                </h2>
                <div className="mt-7 space-y-4">
                  <p className="max-w-[52ch] text-[13px] leading-relaxed text-muted-foreground">
                    Paid search investigation is the part of the job that does not scale. Six tabs
                    of context, four exports, two stale dashboards, and one Slack thread nobody can
                    find next quarter. The decision takes ten seconds. The lead-up takes forty
                    minutes.
                  </p>
                  <p className="max-w-[52ch] text-[12px] italic leading-relaxed text-muted-foreground/85">
                    The work compounds quietly. Senior analysts stop writing the playbook. Junior
                    analysts never see the path. Agencies lose the memory that should have become an
                    asset.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:pl-4">
                {[
                  {
                    value: "20-40 min",
                    label: "per campaign investigation",
                    detail:
                      "Switching tools, stitching CSVs, and re-deriving context the team already saw last quarter.",
                    tone: "warm",
                    span: "min-h-[148px]",
                  },
                  {
                    value: "4-6",
                    label: "systems to open before a decision",
                    detail:
                      "Ads, analytics, CRM, BI, and sheets rarely agree on the same story when time is tight.",
                    tone: "cool",
                    span: "min-h-[148px]",
                  },
                  {
                    value: "79%",
                    label: "spend 20+ minutes on a single investigation",
                    detail: "",
                    tone: "warm",
                    span: "min-h-[132px]",
                  },
                  {
                    value: "0",
                    label: "memory of past diagnoses",
                    detail:
                      "Without a shared trace, every investigation starts over from the same blank page.",
                    tone: "cool",
                    span: "min-h-[132px]",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={sectionMotion}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className={[
                      "rounded-[1.25rem] border p-4 shadow-[0_14px_35px_-30px_oklch(0.235_0.18_268/0.35)]",
                      item.tone === "warm"
                        ? "border-[oklch(0.9_0.022_80/0.55)] bg-[linear-gradient(180deg,oklch(0.946_0.016_82)_0%,oklch(0.946_0.016_82)_100%)]"
                        : "border-border bg-card/80",
                      index < 2
                        ? "min-h-[148px] md:min-h-[154px]"
                        : "min-h-[132px] md:min-h-[138px]",
                    ].join(" ")}
                  >
                    <div className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-[0.92] tracking-tighter text-primary">
                      {item.value}
                    </div>
                    <div className="mt-3 max-w-[16ch] text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground">
                      {item.label}
                    </div>
                    {item.detail ? (
                      <p className="mt-2 max-w-[24ch] text-[11px] leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    ) : null}
                  </motion.div>
                ))}
                <div className="sm:col-span-2">
                  <div className="mt-0 pl-1 text-[12px] leading-relaxed text-muted-foreground/80">
                    62% say most time is data gathering, not deciding.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <section
        id="pipeline"
        className="relative overflow-hidden border-b border-border/70 px-0 py-20 sm:py-24 lg:py-28"
        style={{
          background: "linear-gradient(180deg, oklch(0.235 0.18 268) 0%, oklch(0.18 0.14 268) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(60% 50% at 90% 20%, oklch(0.665 0.215 36 / 0.4), transparent)",
          }}
        />
        <Shell className="relative text-white">
          <SectionLabel n="02" label="How Scout thinks" />
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.1rem)] font-semibold leading-[0.96] tracking-tight">
              Five disciplined stages.
              <span className="block text-white/55">Every diagnosis. Every time.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-white/68">
              Scout does not guess. Each diagnosis runs the same agentic loop, so the output is
              auditable, reproducible, and safe to hand to a human owner.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-5">
            {pipeline.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="group relative rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-[oklch(0.78_0.13_40/0.45)] hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.24em] text-[oklch(0.78_0.13_40)]">
                    {step.n}
                  </span>
                  <step.icon className="h-4 w-4 text-white/60 transition group-hover:text-[oklch(0.78_0.13_40)]" />
                </div>
                <div className="mt-7 font-display text-[18px] font-semibold tracking-tight">
                  {step.title}
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-white/58">{step.detail}</p>
                {index < pipeline.length - 1 ? (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-[oklch(0.78_0.13_40)] to-transparent md:block" />
                ) : null}
              </motion.div>
            ))}
          </div>
        </Shell>
      </section>

      <section
        id="capabilities"
        className="border-b border-border/70 bg-[linear-gradient(180deg,oklch(0.985_0.008_82)_0%,oklch(0.946_0.016_82)_100%)] py-12"
      >
        <Shell>
          <SectionLabel n="03" label="Capabilities" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              title={
                <>
                  Everything your stack
                  <em className="not-italic text-primary"> wishes</em> it could already do.
                </>
              }
              description="Scout keeps the workflow concise: gather the evidence, preserve the context, and hand over a draft that is easy to approve."
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-background/80 shadow-[0_18px_46px_-36px_oklch(0.235_0.18_268/0.45)]">
              {capabilities.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className={`flex items-start gap-4 px-5 py-3.5 ${
                    index === 0 ? "" : "border-t border-border/70"
                  }`}
                >
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <h3 className="font-display text-[15px] font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      <section
        id="architecture"
        className="border-b border-border/70 bg-[linear-gradient(180deg,oklch(0.946_0.016_82)_0%,oklch(0.946_0.016_82)_100%)] py-12"
      >
        <Shell>
          <SectionLabel n="04" label="Architecture" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionHeading
                title={
                  <>
                    GCP-native.
                    <span className="block text-muted-foreground">
                      Built for the security team that signs the contract.
                    </span>
                  </>
                }
                description="Scout runs on Google Cloud primitives: BigQuery for the campaign store of record, Vertex AI for analysis, and Cloud Run for isolated execution. The posture is designed to fit an enterprise review instead of fighting it."
              />

              <ul className="mt-6 space-y-3 rounded-2xl border border-border bg-background/75 p-4">
                {[
                  ["BigQuery", "Campaign facts and history in one place"],
                  ["Vertex AI", "One reasoning step for diagnosis"],
                  ["Cloud Run", "Isolated workers that scale on demand"],
                  ["Security", "VPC-SC, CMEK, and IAM-scoped identities"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className={`flex items-start gap-3 ${k === "BigQuery" ? "" : "border-t border-border/70 pt-3"}`}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="text-[14px] leading-relaxed">
                      <span className="font-semibold text-foreground">{k}.</span>{" "}
                      <span className="text-muted-foreground">{v}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ArchitectureVisual />
          </div>
        </Shell>
      </section>

      <section className="border-b border-border/70 bg-[linear-gradient(180deg,oklch(0.985_0.008_82)_0%,oklch(0.946_0.016_82)_100%)] py-12">
        <Shell>
          <SectionLabel n="05" label="Outcomes" />
          <SectionHeading
            className="mt-6"
            title={
              <>
                Measurable results
                <span className="block text-primary">from week one.</span>
              </>
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {outcomes.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group rounded-2xl border border-border bg-background/85 p-5 transition hover:border-primary/40"
              >
                <div className="font-display text-[clamp(2.4rem,4vw,3.7rem)] font-semibold leading-none tracking-tighter text-foreground transition group-hover:text-primary">
                  {item.value}
                </div>
                <div className="mt-4 font-display text-[18px] font-semibold tracking-tight">
                  {item.label}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </Shell>
      </section>

      <section
        id="trust"
        className="border-b border-border/70 bg-[linear-gradient(180deg,oklch(0.946_0.016_82)_0%,oklch(0.946_0.016_82)_100%)] py-12"
      >
        <Shell>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionLabel n="06" label="Trust & safety" />
              <SectionHeading
                className="mt-6"
                title={
                  <>
                    An agent that asks
                    <span className="block text-muted-foreground">before it acts.</span>
                  </>
                }
                description="You stay the decision-maker. Scout proposes; you approve. Every action is gated, logged, and reversible."
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-background/85 shadow-[0_18px_46px_-36px_oklch(0.235_0.18_268/0.45)]">
              {trust.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className={`flex items-start gap-4 px-5 py-3.5 ${
                    index === 0 ? "" : "border-t border-border/70"
                  }`}
                >
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <h4 className="font-display text-[15px] font-semibold tracking-tight">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Shell>
      </section>

   

      <section className="px-0 pb-24 pt-4 sm:pb-28">
        <Shell>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-primary/25 p-7 text-center sm:p-12 lg:p-16"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 0%, oklch(0.665 0.215 36) 0%, oklch(0.42 0.18 25) 70%, oklch(0.3 0.14 22) 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(white 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                mixBlendMode: "overlay",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,4rem)] font-semibold leading-[1.02] tracking-tight text-white">
                Turn 40-minute investigations
                <span className="block">into 40-second decisions.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/74">
                Bring one campaign you have been meaning to look at. Scout will have an answer
                before you finish your coffee.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-primary shadow-xl transition hover:scale-[1.02]"
                >
                  Diagnose a campaign <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[14px] font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Request access
                </Link>
              </div>
            </div>
          </motion.div>
        </Shell>
      </section>

      <footer className="border-t border-border px-0 py-12">
        <Shell>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 font-display text-[18px] font-semibold tracking-tight">
                <img
                  src="https://localiq.au/wp-content/uploads/2024/06/LiQ_Logo_icon.png"
                  alt="LocaliQ"
                  className="h-[30px] w-auto"
                />
                <span className="font-display text-[20px] font-semibold tracking-tight">
                  LocaliQ
                </span>
                <span className="text-black/60 font-display text-[20px] font-semibold tracking-tight">
                  / Scout
                </span>
                <ScoutIconMark size={46} />
              </span>
              <span className="text-[12px] text-muted-foreground">
                © 2026 - Agentic Campaign Intelligence
              </span>
            </div>
            <div className="flex gap-6 text-[13px] text-muted-foreground">
              <a href="#" className="transition hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition hover:text-foreground">
                Support
              </a>
              <a href="#" className="transition hover:text-foreground">
                Status
              </a>
            </div>
          </div>
        </Shell>
      </footer>
    </div>
  );
}
