import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Database,
  Layers,
  Search,
  Brain,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Cloud,
  Lock,
  BarChart3,
  Zap,
  Eye,
  GitBranch,
} from "lucide-react";
import { LocaliQLogo, ScoutMark } from "../components/scout/Logo";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Agentic Campaign Intelligence — Diagnose Campaigns in Seconds" },
      {
        name: "description",
        content:
          "AI-powered campaign diagnostics that finds root causes and recommends next steps instantly. Reduce investigation time from 40 minutes to seconds.",
      },
      { property: "og:title", content: "Agentic Campaign Intelligence" },
      {
        property: "og:description",
        content:
          "AI-powered campaign diagnostics for paid search. Root cause analysis with human-in-the-loop guardrails.",
      },
    ],
  }),
  component: LandingPage,
});

function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <LocaliQLogo />
          <nav className="hidden items-center gap-6 text-[14px] text-muted-foreground md:flex">
            <a href="#product" className="hover:text-foreground transition">Product</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#architecture" className="hover:text-foreground transition">Architecture</a>
            <a href="#trust" className="hover:text-foreground transition">Trust</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-[14px] font-medium text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.52_0.19_28/0.7)] transition hover:opacity-95"
          >
            Start Diagnosis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.04 55) 0%, oklch(0.985 0.008 60) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.62 0.2 35 / 0.5), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.68 0.18 55 / 0.45), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-[1240px] px-6 pb-20 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[12px] font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Agentic Campaign Intelligence · v1.0
          </div>
          <h1 className="mt-6 font-display text-[56px] font-semibold leading-[1.02] tracking-tight text-foreground md:text-[64px]">
            Diagnose Campaign Issues in{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.19 28), oklch(0.68 0.2 55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Seconds
            </span>{" "}
            — Not Hours
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            AI-powered campaign intelligence that finds root causes and recommends
            next steps instantly. Built for marketing optimizers who need answers,
            not dashboards.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14px] font-semibold text-primary-foreground shadow-[0_12px_32px_-12px_oklch(0.52_0.19_28/0.7)] transition hover:opacity-95"
            >
              <Sparkles className="h-4 w-4" /> Start Diagnosis
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-[14px] font-semibold text-foreground transition hover:bg-secondary"
            >
              View Demo <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-[12px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> SOC 2 Type II
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-primary" /> GDPR ready
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Cloud className="h-3.5 w-3.5 text-primary" /> GCP native
            </span>
          </div>
        </motion.div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div
            className="rounded-2xl border border-border bg-card p-2 shadow-[0_40px_80px_-30px_oklch(0.52_0.19_28/0.25)]"
          >
            <div className="rounded-xl border border-border bg-background">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                </div>
                <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
                  <Search className="h-3 w-3" /> app.localiq.ai/diagnose/cool-o-mat-search
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3 p-4">
                <div className="col-span-3 space-y-3">
                  {[
                    { label: "CPL", val: "$42.18", tone: "down" },
                    { label: "CVR", val: "3.4%", tone: "up" },
                    { label: "Pacing", val: "73%", tone: "down" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-border bg-card p-3"
                    >
                      <div className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                        {m.label}
                      </div>
                      <div className="mt-1 font-display text-[20px] font-semibold text-foreground">
                        {m.val}
                      </div>
                      <div
                        className={`mt-1 text-[10px] font-medium ${
                          m.tone === "up" ? "text-success" : "text-destructive"
                        }`}
                      >
                        {m.tone === "up" ? "▲" : "▼"} vs last 7d
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-span-9 space-y-3">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                          ROOT CAUSE · 92% CONFIDENCE
                        </div>
                        <div className="mt-1 font-display text-[16px] font-semibold text-foreground">
                          Negative keyword conflict on "free repair" capping
                          impression share
                        </div>
                      </div>
                      <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-accent-foreground">
                        HIGH IMPACT
                      </span>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "92%",
                          background:
                            "linear-gradient(90deg, oklch(0.52 0.19 28), oklch(0.68 0.2 55))",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                        PUBLISHER MIX
                      </div>
                      <div className="mt-3 flex h-20 items-end gap-2">
                        {[60, 90, 40, 75, 30, 55, 80].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t"
                            style={{
                              height: `${h}%`,
                              background:
                                "linear-gradient(180deg, oklch(0.68 0.2 55), oklch(0.52 0.19 28))",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                        RECOMMENDED ACTIONS
                      </div>
                      <ul className="mt-3 space-y-2 text-[12px] text-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-primary" />
                          Remove conflicting negative "free"
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-primary" />
                          Rebalance budget toward Bing (+18%)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-primary" />
                          Pause 3 underperforming RSAs
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="product" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-primary">
            THE PROBLEM
          </div>
          <h2 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tight">
            Campaign investigation is broken.
          </h2>
          <p className="mt-4 text-[16px] text-muted-foreground">
            Optimizers spend their best hours hunting data instead of making
            decisions. Context lives in six tabs, and nothing learns from what
            you did last time.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Clock,
              title: "20–40 minutes per campaign",
              body: "Every diagnosis means switching tools, exporting CSVs, and stitching context by hand.",
            },
            {
              icon: Database,
              title: "4–6 disconnected systems",
              body: "Google Ads, Bing, GA4, call tracking, CRM, and BI. None of them talk to each other.",
            },
            {
              icon: Layers,
              title: "No structured learning",
              body: "Past decisions disappear into screenshots and Slack. Nothing compounds.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-[0_20px_40px_-24px_oklch(0.52_0.19_28/0.3)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-[18px] font-semibold">{title}</h3>
              <p className="mt-2 text-[14px] text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-secondary/40 p-8 md:grid-cols-2">
          {[
            { stat: "79%", label: "of optimizers spend 20+ minutes investigating a single campaign" },
            { stat: "62%", label: "say most of that time is just gathering and reconciling data" },
          ].map((s) => (
            <div key={s.stat} className="flex items-baseline gap-4">
              <div
                className="font-display text-[56px] font-semibold leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.19 28), oklch(0.68 0.2 55))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.stat}
              </div>
              <p className="text-[14px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Eye, title: "Detect", body: "Spot pacing, CPL, and CVR anomalies across your book in real time." },
    { icon: Database, title: "Assemble", body: "Pull change history, keywords, publisher mix, and tracking into one view." },
    { icon: Brain, title: "Reason", body: "Vertex AI agents analyze patterns and isolate root causes with citations." },
    { icon: ShieldCheck, title: "Validate", body: "Guardrails check every recommendation against policy before it surfaces." },
    { icon: Zap, title: "Respond", body: "You approve. Scout executes — or hands off with a structured handoff." },
  ];
  return (
    <section
      id="how"
      className="border-b border-border py-24"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.985 0.008 60) 0%, oklch(0.96 0.03 55) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-primary">
            HOW IT WORKS
          </div>
          <h2 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tight">
            A five-stage agentic pipeline.
          </h2>
          <p className="mt-4 text-[16px] text-muted-foreground">
            Every diagnosis runs the same disciplined flow — auditable end to end.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-5">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative rounded-2xl border border-border bg-card p-5"
            >
              <div className="absolute -top-3 left-5 inline-flex h-6 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-bold text-primary-foreground">
                STEP {i + 1}
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-[18px] font-semibold">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Brain, title: "AI-powered diagnostics", body: "Multi-agent reasoning trained on millions of paid search outcomes." },
    { icon: Zap, title: "Single-click analysis", body: "One click pulls every signal that matters for the campaign in front of you." },
    { icon: BarChart3, title: "Evidence-based recommendations", body: "Every action ships with the data, citations, and confidence score behind it." },
    { icon: ShieldCheck, title: "Built-in validation guardrails", body: "Policy checks prevent risky bid, budget, or structural changes before approval." },
    { icon: GitBranch, title: "Decision tracking", body: "A complete log of every diagnosis, decision, and outcome — searchable forever." },
    { icon: Activity, title: "Performance analytics", body: "Measure investigation time saved and lift delivered by accepted recommendations." },
  ];
  return (
    <section id="features" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-primary">
            FEATURES
          </div>
          <h2 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tight">
            Everything an optimizer wishes their stack already did.
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-[18px] font-semibold">{title}</h3>
              <p className="mt-2 text-[14px] text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section id="architecture" className="border-b border-border bg-secondary/30 py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="text-[12px] font-semibold tracking-[0.18em] text-primary">
              PLATFORM ARCHITECTURE
            </div>
            <h2 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tight">
              GCP-native, enterprise-ready.
            </h2>
            <p className="mt-4 text-[16px] text-muted-foreground">
              Built on Google Cloud's data and AI primitives — BigQuery for the
              warehouse of campaign truth, Vertex AI for agentic reasoning, and
              Cloud Run for elastic, isolated execution. Designed for the
              compliance posture your security team already approved.
            </p>
            <ul className="mt-6 space-y-3 text-[14px]">
              {[
                "BigQuery: petabyte-scale campaign data warehouse",
                "Vertex AI: agent orchestration with Gemini & custom models",
                "Cloud Run: stateless, auto-scaled diagnosis workers",
                "VPC-SC, CMEK, and IAM-scoped service identities",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_30px_60px_-30px_oklch(0.52_0.19_28/0.25)]">
            {[
              { label: "PRESENTATION", items: ["Web App", "API"], tone: "bg-accent text-accent-foreground" },
              { label: "AGENTS", items: ["Detect", "Reason", "Validate", "Respond"], tone: "bg-primary/10 text-primary" },
              { label: "AI LAYER", items: ["Vertex AI · Gemini", "Custom Models"], tone: "bg-primary text-primary-foreground" },
              { label: "DATA LAYER", items: ["BigQuery", "Pub/Sub", "Firestore"], tone: "bg-secondary text-foreground" },
              { label: "RUNTIME", items: ["Cloud Run", "IAM · VPC-SC · CMEK"], tone: "bg-muted text-foreground" },
            ].map((row) => (
              <div key={row.label} className="mb-3 last:mb-0">
                <div className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                  {row.label}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {row.items.map((it) => (
                    <span
                      key={it}
                      className={`rounded-md px-3 py-1.5 text-[12px] font-medium ${row.tone}`}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { stat: "80%", label: "less time investigating", body: "Reclaim the hours your team currently spends in spreadsheets." },
    { stat: "2.4x", label: "more campaigns reviewed", body: "Touch every account in your book every week — not every quarter." },
    { stat: "100%", label: "decisions documented", body: "Every diagnosis builds institutional knowledge that compounds." },
  ];
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-primary">
            BENEFITS
          </div>
          <h2 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tight">
            Measurable outcomes from day one.
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((b) => (
            <div key={b.stat} className="rounded-2xl border border-border bg-card p-7">
              <div
                className="font-display text-[48px] font-semibold leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.19 28), oklch(0.68 0.2 55))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {b.stat}
              </div>
              <div className="mt-2 font-display text-[16px] font-semibold">{b.label}</div>
              <p className="mt-2 text-[14px] text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSafety() {
  return (
    <section id="trust" className="border-b border-border bg-secondary/30 py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="text-[12px] font-semibold tracking-[0.18em] text-primary">
              TRUST & SAFETY
            </div>
            <h2 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tight">
              Agents that ask before they act.
            </h2>
            <p className="mt-4 text-[16px] text-muted-foreground">
              You stay the decision-maker. Scout proposes; you approve. Every
              action is gated, logged, and reversible — because your accounts
              are not the place to find out an AI was wrong.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Human-in-the-loop", body: "Nothing changes without an explicit, logged approval." },
              { icon: Lock, title: "Validation guardrails", body: "Budget, bid, and structural changes are policy-checked." },
              { icon: Eye, title: "No autonomous execution", body: "Scout suggests. You ship. Every action has an owner." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-[15px] font-semibold">{title}</h3>
                <p className="mt-1.5 text-[13px] text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.19 28) 0%, oklch(0.62 0.2 35) 50%, oklch(0.68 0.2 55) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(closest-side, white, transparent)",
            }}
          />
          <h2 className="font-display text-[40px] font-semibold leading-tight tracking-tight text-primary-foreground">
            Start optimizing campaigns smarter today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-primary-foreground/85">
            Join the optimizers turning 40-minute investigations into 40-second
            decisions.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-[14px] font-semibold text-foreground transition hover:opacity-95"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-[14px] font-semibold text-primary-foreground backdrop-blur transition hover:bg-white/20"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Product", links: ["Overview", "Pipeline", "Features", "Pricing"] },
    { title: "Docs", links: ["Getting started", "Agents", "Guardrails", "Changelog"] },
    { title: "API", links: ["Reference", "Authentication", "Webhooks", "SDKs"] },
    { title: "Contact", links: ["Sales", "Support", "Status", "Security"] },
  ];
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <ScoutMark size={28} />
              <span className="font-display text-[16px] font-semibold tracking-tight">
                LocaliQ
              </span>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground">
              Agentic Campaign Intelligence for paid search teams.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground">
                {c.title.toUpperCase()}
              </div>
              <ul className="mt-3 space-y-2 text-[13px]">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-foreground/80 transition hover:text-primary">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground">
          <span>© 2026 LocaliQ. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <Architecture />
      <Benefits />
      <TrustSafety />
      <CTASection />
      <Footer />
    </div>
  );
}