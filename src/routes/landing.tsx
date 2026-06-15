import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Radar,
  Database,
  Brain,
  ShieldCheck,
  Send,
  CheckCircle2,
  Clock,
  Layers,
  Lock,
  Eye,
  Activity,
  Zap,
  LineChart,
} from "lucide-react";
import heroOrb from "../assets/hero-aci.jpg";
import pipelineArt from "../assets/pipeline-aci.jpg";
import workspaceArt from "../assets/workspace-aci.jpg";
import architectureArt from "../assets/architecture-aci.jpg";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Agentic Campaign Intelligence — Diagnose paid search in seconds" },
      {
        name: "description",
        content:
          "An AI agent for paid search optimizers. Assemble context, reason about anomalies, validate fixes, and ship — in under a minute.",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------- helpers ---------- */

const fade: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

function SectionNumber({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-primary">{n}</span>
      <span className="h-px w-10 bg-border" />
      <span>{label}</span>
    </div>
  );
}

/* ---------- page ---------- */

function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], [0, 140]);
  const heroImgScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -50]);
  const orbRotate = useTransform(heroProgress, [0, 1], [0, 35]);
  const orbOpacity = useTransform(heroProgress, [0, 0.6, 1], [0.55, 0.35, 0.1]);

  const pipelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pipelineProgress } = useScroll({
    target: pipelineRef,
    offset: ["start end", "end start"],
  });
  const pipelineImgY = useTransform(pipelineProgress, [0, 1], [80, -80]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-primary to-[oklch(0.68_0.2_55)] shadow-[0_8px_20px_-8px_oklch(0.52_0.19_28/0.6)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-[17px] font-semibold tracking-tight">
              LocaliQ <span className="text-muted-foreground">/ Scout</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 text-[13px] text-muted-foreground md:flex">
            <a className="transition hover:text-foreground" href="#pipeline">Pipeline</a>
            <a className="transition hover:text-foreground" href="#capabilities">Capabilities</a>
            <a className="transition hover:text-foreground" href="#architecture">Architecture</a>
            <a className="transition hover:text-foreground" href="#trust">Trust</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-[13px] font-medium text-muted-foreground hover:text-foreground sm:inline"
            >
              Sign in
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.52_0.19_28/0.7)] transition hover:opacity-95"
            >
              Start diagnosis <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header
        ref={heroRef}
        className="relative isolate overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, oklch(0.95 0.08 45) 0%, oklch(0.985 0.008 60) 55%, oklch(0.985 0.008 60) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.3 0.05 30) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <motion.img
          aria-hidden
          src={heroOrb}
          style={{ rotate: orbRotate, opacity: orbOpacity }}
          className="pointer-events-none absolute -right-32 -top-24 -z-10 hidden h-[640px] w-[640px] mix-blend-screen md:block"
          alt=""
        />

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-20 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-32 lg:pt-28">
          <motion.div
            style={{ y: heroTextY }}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="relative"
          >
            <motion.div variants={fade}>
              <Eyebrow>Agentic Campaign Intelligence · v1</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fade}
              className="mt-6 font-display text-[clamp(44px,7vw,76px)] font-semibold leading-[0.98] tracking-tight text-foreground"
            >
              Diagnose a campaign
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-[oklch(0.6_0.2_38)] to-[oklch(0.7_0.2_60)] bg-clip-text text-transparent">
                  before your coffee
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 w-full"
                >
                  <path
                    d="M2 8 Q 75 2 150 6 T 298 5"
                    stroke="oklch(0.62 0.2 38)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </span>{" "}
              cools.
            </motion.h1>

            <motion.p
              variants={fade}
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-muted-foreground md:text-[17px]"
            >
              Scout is an agentic analyst for paid search teams. It watches every
              account, assembles the evidence, reasons about the anomaly, and
              brings you a recommendation you can ship — auditable end to end,
              every action gated by you.
            </motion.p>

            <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-semibold text-background transition hover:bg-foreground/90"
              >
                Run a free diagnosis
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-[14px] font-semibold text-foreground transition hover:border-primary/40"
              >
                See how it thinks
              </a>
            </motion.div>

            <motion.div
              variants={fade}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> SOC 2 · VPC-SC · CMEK
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-primary" /> 4M+ campaigns scored
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" /> Median diagnosis: 38s
              </span>
            </motion.div>
          </motion.div>

          {/* Hero photograph card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ y: heroImgY, scale: heroImgScale }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/30 to-[oklch(0.7_0.2_55/0.25)] blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-[oklch(0.12_0.03_25)] shadow-[0_40px_80px_-30px_oklch(0.3_0.15_25/0.5)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  scout · live diagnosis
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.55_0.18_28/0.2)] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.85_0.12_45)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.7_0.2_45)]" />
                  reasoning
                </span>
              </div>
              <img
                src={workspaceArt}
                width={1600}
                height={900}
                alt="An analyst's morning workspace with campaign analytics on screen"
                className="block h-auto w-full"
              />
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-[oklch(0.10_0.02_25/0.78)] p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/60">
                  <span>Root cause · 94% confidence</span>
                  <span className="text-[oklch(0.85_0.12_55)]">Mountain View Plumbing</span>
                </div>
                <p className="mt-1.5 text-[14px] font-semibold text-white">
                  Negative keyword conflict capped impression share at 61%.
                </p>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.4, delay: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.75_0.2_55)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee trust strip */}
        <div className="border-y border-border/60 bg-card/40">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-12 gap-y-3 px-6 py-5 text-[12px] uppercase tracking-[0.18em] text-muted-foreground md:px-10">
            <span className="font-mono text-foreground/70">/ trusted across</span>
            <span>Google Ads</span>
            <span>Microsoft Advertising</span>
            <span>GA4</span>
            <span>Salesforce</span>
            <span>HubSpot</span>
            <span>Snowflake</span>
            <span>BigQuery</span>
          </div>
        </div>
      </header>

      {/* THE PROBLEM */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <SectionNumber n="01" label="The problem" />
          <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fade}
              className="font-display text-[clamp(36px,5vw,60px)] font-semibold leading-[1.05] tracking-tight"
            >
              Your best analysts are
              <br />
              <span className="text-muted-foreground">spending their day</span>
              <br />
              copy-pasting into spreadsheets.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="text-[16px] leading-relaxed text-muted-foreground"
            >
              Paid search investigation is the part of the job that doesn't
              scale. Six tabs of context, four exports, two stale dashboards,
              and a Slack thread no one can find next quarter. The decision
              takes ten seconds. The lead-up takes forty minutes — every time.
            </motion.p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {[
              {
                k: "20–40 min",
                t: "per campaign investigation",
                d: "Switching tools, stitching CSVs, and re-deriving context the agency already knew last quarter.",
              },
              {
                k: "4–6 systems",
                t: "to open before a decision",
                d: "Google Ads, Bing, GA4, your CRM, the BI tool, the spreadsheet — none of them remember each other.",
              },
              {
                k: "0 memory",
                t: "of past diagnoses",
                d: "Decisions disappear into screenshots and DMs. Nothing compounds. The next investigation starts from zero.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-card p-8"
              >
                <div className="font-display text-[40px] font-semibold tracking-tight text-primary">
                  {c.k}
                </div>
                <div className="mt-1 text-[14px] font-semibold text-foreground">
                  {c.t}
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {c.d}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-10 grid grid-cols-1 items-center gap-8 rounded-3xl border border-primary/15 bg-gradient-to-br from-[oklch(0.97_0.04_55)] to-[oklch(0.94_0.08_45)] p-10 md:grid-cols-[auto_1fr_auto]"
          >
            <div>
              <div className="font-display text-[clamp(64px,8vw,96px)] font-semibold leading-none tracking-tighter text-primary">
                79<span className="text-[44px] align-top">%</span>
              </div>
              <p className="mt-2 max-w-[220px] text-[13px] text-muted-foreground">
                of optimizers spend 20+ minutes on a single investigation
              </p>
            </div>
            <div className="hidden h-24 w-px justify-self-center bg-primary/20 md:block" />
            <div className="md:text-right">
              <div className="font-display text-[clamp(64px,8vw,96px)] font-semibold leading-none tracking-tighter text-[oklch(0.6_0.2_42)]">
                62<span className="text-[44px] align-top">%</span>
              </div>
              <p className="mt-2 max-w-[260px] text-[13px] text-muted-foreground md:ml-auto">
                say most of that time is gathering and reconciling — not deciding
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PIPELINE */}
      <section
        id="pipeline"
        ref={pipelineRef}
        className="relative overflow-hidden px-6 py-32 md:px-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.04 25) 0%, oklch(0.10 0.03 22) 100%)",
        }}
      >
        <motion.div
          aria-hidden
          style={{ y: pipelineImgY }}
          className="pointer-events-none absolute inset-0 -z-0 opacity-40"
        >
          <img src={architectureArt} alt="" className="h-full w-full object-cover" />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 bg-[oklch(0.10_0.03_22)]/55"
        />

        <div className="relative mx-auto max-w-[1280px] text-white">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[oklch(0.78_0.12_55)]">
            02 · How Scout thinks
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight">
            Five disciplined stages.
            <br />
            <span className="text-white/50">Every diagnosis. Every time.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65">
            Scout doesn't guess. Each diagnosis runs the same agentic loop —
            auditable, reproducible, and gated by you at the end.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: Radar, n: "01", t: "Detect", d: "Real-time signals from every account surface anomalies the moment they appear." },
              { icon: Database, n: "02", t: "Assemble", d: "Cross-channel context pulled and joined — pacing, change history, tracking, creative." },
              { icon: Brain, n: "03", t: "Reason", d: "Multi-agent reasoning on Vertex AI hypothesizes root cause and ranks evidence." },
              { icon: ShieldCheck, n: "04", t: "Validate", d: "Policy checks against bid, budget, and structural guardrails before anything ships." },
              { icon: Send, n: "05", t: "Respond", d: "A clear recommendation, the data behind it, and a one-click action you approve." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-[oklch(0.78_0.18_55/0.5)] hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-widest text-[oklch(0.78_0.18_55)]">
                    {s.n}
                  </span>
                  <s.icon className="h-4 w-4 text-white/60 transition group-hover:text-[oklch(0.85_0.18_55)]" />
                </div>
                <div className="mt-8 font-display text-[22px] font-semibold tracking-tight">
                  {s.t}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-black/40"
          >
            <img
              src={pipelineArt}
              width={1600}
              height={900}
              loading="lazy"
              alt="Visualization of the five-stage agentic pipeline"
              className="block h-auto w-full opacity-95"
            />
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <SectionNumber n="03" label="Capabilities" />
          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="font-display text-[clamp(36px,5vw,60px)] font-semibold leading-[1.05] tracking-tight"
            >
              Everything your stack{" "}
              <em className="text-primary not-italic">wishes</em> it could
              already do.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="text-[16px] leading-relaxed text-muted-foreground"
            >
              Scout reads your accounts the way a senior analyst would — with
              instinct, citation, and skepticism. Then it hands you a draft you
              can actually ship.
            </motion.p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:col-span-4 md:row-span-2"
            >
              <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-primary">
                <Brain className="h-4 w-4" /> Reasoning
              </div>
              <h3 className="mt-6 font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-tight">
                Evidence-backed recommendations, never black-box answers.
              </h3>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
                Every recommendation carries its sources: the metric, the
                timeframe, the change-history entry, and a confidence score you
                can challenge.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { l: "Hypothesis", v: "Neg-kw conflict" },
                  { l: "Evidence", v: "12 sources" },
                  { l: "Confidence", v: "94%" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.l}
                    </div>
                    <div className="mt-1 font-display text-[18px] font-semibold">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            </motion.div>

            {[
              { icon: Zap, t: "Single-click analysis", d: "One click pulls every signal that matters for the campaign you're staring at." },
              { icon: Layers, t: "Decision tracking", d: "A searchable log of every diagnosis, decision, and outcome — auditable forever." },
              { icon: LineChart, t: "Lift analytics", d: "Measure time saved and lift delivered by every accepted recommendation." },
              { icon: ShieldCheck, t: "Built-in guardrails", d: "Policy checks prevent risky bid, budget, or structural changes from ever shipping." },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40 md:col-span-2"
              >
                <f.icon className="h-5 w-5 text-primary" />
                <h4 className="mt-5 font-display text-[18px] font-semibold tracking-tight">
                  {f.t}
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {f.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section
        id="architecture"
        className="border-t border-border bg-card/40 px-6 py-32 md:px-10"
      >
        <div className="mx-auto max-w-[1280px]">
          <SectionNumber n="04" label="Architecture" />
          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight">
                GCP-native.
                <br />
                <span className="text-muted-foreground">
                  Built for the security team
                </span>{" "}
                that signs the contract.
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                Scout runs on Google Cloud's data and AI primitives — BigQuery
                for the warehouse of campaign truth, Vertex AI for agentic
                reasoning, and Cloud Run for stateless, isolated execution.
                Designed for the compliance posture your security team already
                approved.
              </p>
              <ul className="mt-8 space-y-4 text-[14px]">
                {[
                  ["BigQuery", "Petabyte-scale campaign data warehouse"],
                  ["Vertex AI", "Gemini + custom-tuned reasoning models"],
                  ["Cloud Run", "Stateless, auto-scaled diagnosis workers"],
                  ["Security", "VPC-SC, CMEK, and IAM-scoped service identities"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex items-start gap-3 border-t border-border/60 pt-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <span className="font-semibold text-foreground">
                        {k}.
                      </span>{" "}
                      <span className="text-muted-foreground">{v}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl border border-border bg-background p-7 font-mono text-[12px]"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span>architecture.json</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                  live
                </span>
              </div>
              <pre className="mt-5 whitespace-pre-wrap leading-7 text-foreground/85">{`{
  "presentation": ["Web App", "REST API", "Webhooks"],
  "agents":       ["Detect", "Assemble", "Reason", "Validate", "Respond"],
  "ai_layer":     { "vertex": "Gemini 2.5 Pro", "custom": 4 },
  "data_layer":   ["BigQuery", "Pub/Sub", "Firestore"],
  "runtime":      ["Cloud Run", "VPC-SC", "CMEK"],
  "guarantees":   ["audit-log", "policy-check", "human-approval"]
}`}</pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <SectionNumber n="05" label="Outcomes" />
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(36px,5vw,60px)] font-semibold leading-[1.05] tracking-tight">
            Measurable results
            <br />
            <span className="text-primary">from week one.</span>
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { k: "80%", t: "less time investigating", d: "Reclaim the hours your team spends in spreadsheets every week." },
              { k: "2.4×", t: "more campaigns reviewed", d: "Touch every account in your book weekly — not quarterly." },
              { k: "100%", t: "decisions documented", d: "Every diagnosis builds institutional memory that compounds." },
            ].map((m, i) => (
              <motion.div
                key={m.t}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-primary/40"
              >
                <div className="font-display text-[clamp(64px,8vw,96px)] font-semibold leading-none tracking-tighter text-foreground transition group-hover:text-primary">
                  {m.k}
                </div>
                <div className="mt-4 font-display text-[18px] font-semibold tracking-tight">
                  {m.t}
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {m.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section
        id="trust"
        className="border-t border-border px-6 py-32 md:px-10"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionNumber n="06" label="Trust & safety" />
            <h2 className="mt-6 font-display text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight">
              An agent that asks
              <br />
              <span className="text-muted-foreground">before it acts.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              You stay the decision-maker. Scout proposes; you approve. Every
              action is gated, logged, and reversible — because your live
              accounts are not the place to find out the model was wrong.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {[
              { icon: Eye, t: "Human-in-the-loop by default", d: "Nothing changes without an explicit, logged approval from a human owner." },
              { icon: Lock, t: "Validation guardrails", d: "Bid, budget, and structural changes are policy-checked before they ever reach the platform." },
              { icon: ShieldCheck, t: "Zero autonomous execution", d: "Scout suggests. You ship. Every action has a name attached." },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-[17px] font-semibold tracking-tight">
                    {c.t}
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {c.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2.5rem] border border-primary/30 p-12 text-center md:p-16"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, oklch(0.62 0.2 38) 0%, oklch(0.42 0.18 25) 70%, oklch(0.28 0.12 22) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url(${architectureArt})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative">
            <Eyebrow>Start your first diagnosis</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(40px,6vw,68px)] font-semibold leading-[1.02] tracking-tight text-white">
              Turn 40-minute investigations
              <br />
              into 40-second decisions.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] text-white/75">
              Bring one campaign you've been meaning to look at. Scout will
              have an answer before you finish your coffee.
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
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-[oklch(0.68_0.2_55)]">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display text-[15px] font-semibold">
              LocaliQ <span className="text-muted-foreground">/ Scout</span>
            </span>
            <span className="ml-1 text-[12px] text-muted-foreground md:ml-3">
              © 2026 — Agentic Campaign Intelligence
            </span>
          </div>
          <div className="flex gap-6 text-[13px] text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Support</a>
            <a href="#" className="hover:text-foreground">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}