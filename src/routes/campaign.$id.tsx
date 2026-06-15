import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  Info,
  RefreshCw,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  ShieldCheck,
  FileText,
  Database,
  History,
} from "lucide-react";
import { useState } from "react";
import { Header } from "../components/scout/Header";
import { ScoutMark } from "../components/scout/Logo";
import { DiagnoseModal } from "../components/scout/DiagnoseModal";
import { getCampaign } from "../data/campaigns";

export const Route = createFileRoute("/campaign/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Diagnose · ${params.id} — LocaliQ` },
      { name: "description", content: "Scout diagnosis for this campaign." },
    ],
  }),
  component: Detail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-muted-foreground">
      Campaign not found.
    </div>
  ),
  loader: ({ params }) => {
    const c = getCampaign(params.id);
    if (!c) throw notFound();
    return c;
  },
});

function Detail() {
  const { id } = useParams({ from: "/campaign/$id" });
  const campaign = getCampaign(id);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"reasoning" | "evidence" | "history">(
    "reasoning",
  );

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1280px] px-6 pb-24 pt-8 md:px-10">
        {/* Crumb */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted-foreground"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-medium text-foreground transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to workspace
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="font-mono text-[12px]">#{campaign.id}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="font-semibold text-foreground">{campaign.name}</span>
          </div>
          <span className="font-mono text-[12px]">data through yesterday EOD</span>
        </motion.div>

        {/* HERO DIAGNOSIS */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 overflow-hidden rounded-3xl border border-border"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.97 0.04 55) 0%, oklch(0.95 0.07 35) 60%, oklch(0.93 0.1 30) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.62 0.2 35 / 0.55), transparent)",
            }}
          />
          <div className="relative grid grid-cols-1 gap-8 p-8 md:p-10 lg:grid-cols-[1fr_320px]">
            <div className="flex items-start gap-5">
              <div className="shrink-0">
                <ScoutMark size={56} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {campaign.vertical}
                  </span>
                  <span className="rounded-full bg-card/80 px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">
                    Scout · informational
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    Diagnosed in 11.4s
                  </span>
                </div>

                <h1 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-tight">
                  {campaign.name} is healthy.{" "}
                  <span className="text-muted-foreground">
                    One thing worth knowing.
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  Utilization <b className="text-foreground">0.94</b> (in range),
                  CPL <b className="text-foreground">$48</b> vs $50 goal, CVR{" "}
                  <b className="text-foreground">3.8%</b> (in range). KBAS and
                  XBAS have made only routine in-band adjustments — no manual
                  intervention needed in 14 days.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background transition hover:bg-foreground/90"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Re-diagnose
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-semibold text-foreground transition hover:border-primary/40">
                    <Copy className="h-3.5 w-3.5" /> Copy summary
                  </button>
                  <span className="ml-1 text-[12px] text-muted-foreground">
                    ~28 min of digging — credited to your reclaimed time.
                  </span>
                </div>
              </div>
            </div>

            {/* Confidence card */}
            <div className="rounded-2xl border border-primary/20 bg-card/80 p-5 backdrop-blur">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
                Scout's confidence
              </div>
              <div className="mt-3 space-y-3">
                <ConfidenceRow label="Evidence" filled={5} />
                <ConfidenceRow label="Root-cause clarity" filled={5} />
                <ConfidenceRow label="Action safety" filled={5} />
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-[11.5px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                <span>
                  Overall ={" "}
                  <b className="text-foreground">lowest of the three</b>
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Last action banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-4 flex flex-wrap items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 px-5 py-3 text-[13px]"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <p className="text-foreground">
            <span className="font-semibold">Last action on this campaign:</span>{" "}
            <span className="text-muted-foreground">
              {campaign.lastActionDays} days ago · KBAS. Data may not reflect
              changes from the last few hours.
            </span>
          </p>
        </motion.div>

        {/* HEALTH SNAPSHOT — KPI strip */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-8"
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Health snapshot
              </div>
              <h2 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
                All metrics inside their normal bands.
              </h2>
            </div>
            <span className="hidden text-[12px] text-muted-foreground sm:inline">
              7-day window
            </span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <MetricTile
              icon={Activity}
              label="Utilization"
              value="0.94"
              vs="vs target 1.00"
              tone="ok"
            />
            <MetricTile
              icon={TrendingUp}
              label="CPL (7d)"
              value="$48"
              vs="vs $50 goal"
              tone="ok"
            />
            <MetricTile
              icon={TrendingUp}
              label="CVR (7d)"
              value="3.8%"
              vs="vs 3.5%+ band"
              tone="ok"
            />
            <MetricTile
              icon={TrendingDown}
              label="CPC trend"
              value="+12%"
              vs="14d, vs flat"
              tone="warn"
            />
          </div>
        </motion.section>

        {/* TABS */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-card p-1 w-fit">
            {[
              { k: "reasoning", l: "Scout's reasoning", i: Sparkles },
              { k: "evidence", l: "Evidence (4 sources)", i: Database },
              { k: "history", l: "Change history", i: History },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setActiveTab(t.k as any)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition ${
                  activeTab === t.k
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.i className="h-3.5 w-3.5" /> {t.l}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            {/* Main panel */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              {activeTab === "reasoning" && (
                <>
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    Scout's reasoning
                  </div>
                  <h2 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
                    Here's what I saw and how I got there.
                  </h2>

                  <ReasoningBlock title="Campaign state" tone="ok">
                    All headline metrics inside their normal bands. Utilization{" "}
                    <b>0.94</b>, CPL <b>$48</b> vs <b>$50</b> goal, CVR{" "}
                    <b>3.8%</b>, ROAS in line with the HVAC vertical benchmark.
                    <Chips chips={["Util 0.94", "CPL $48 / $50", "CVR 3.8%"]} />
                  </ReasoningBlock>

                  <ReasoningBlock title="Automation activity" tone="ok">
                    <b>KBAS</b> rebalanced WPCID 12345 three days ago — a
                    routine in-band shift on the 3-day schedule, within
                    publisher KBAS bounds. <b>No manual intervention</b> in 14
                    days.
                    <Chips chips={["KBAS · routine", "No manual touch · 14d"]} />
                  </ReasoningBlock>

                  <ReasoningBlock title="Worth monitoring" tone="warn">
                    <b>CPC</b> trended <b>+12%</b> over the last 14 days. Not
                    actionable today, but if it continues, CPL could reach goal
                    next cycle. Flag for the next client check-in.
                    <Chips chips={["CPC +12% · 14d"]} />
                  </ReasoningBlock>

                  <div className="mt-8 grid grid-cols-1 gap-8 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                        What I checked
                      </div>
                      <ul className="mt-3 space-y-2 text-[14px] text-foreground">
                        {[
                          "Utilization vs cycle target",
                          "CPL vs goal and 28d baseline",
                          "Publisher distribution",
                          "Change history",
                          "Keyword-level performance",
                        ].map((x) => (
                          <li key={x} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success" /> {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                        What's missing
                      </div>
                      <ul className="mt-3 space-y-2 text-[14px] text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="inline-block h-3 w-3 rounded-full border-2 border-dashed border-muted-foreground/60" />
                          No client-context notes provided
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "evidence" && (
                <>
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    Evidence package · 4 sources
                  </div>
                  <h2 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
                    The data behind every claim.
                  </h2>
                  <ul className="mt-6 divide-y divide-border">
                    {[
                      {
                        s: "BigQuery · paid_search_pacing",
                        d: "7-day pacing window joined with cycle target. 1,284 rows scanned.",
                        t: "2.1s ago",
                      },
                      {
                        s: "BigQuery · keyword_perf_v3",
                        d: "Top-20 keywords by 7-day cost, with quality-score and CTR deltas.",
                        t: "1.8s ago",
                      },
                      {
                        s: "KBAS change history",
                        d: "14-day window of automated bid and budget adjustments.",
                        t: "1.4s ago",
                      },
                      {
                        s: "Publisher distribution",
                        d: "Cost and impression share split across Google Ads, Bing, partner network.",
                        t: "1.1s ago",
                      },
                    ].map((e) => (
                      <li key={e.s} className="flex items-start gap-3 py-4">
                        <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div className="flex-1">
                          <div className="text-[14px] font-semibold text-foreground">
                            {e.s}
                          </div>
                          <p className="mt-0.5 text-[13px] text-muted-foreground">
                            {e.d}
                          </p>
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {e.t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {activeTab === "history" && (
                <>
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    Change history · last 14 days
                  </div>
                  <h2 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
                    What changed before this signal.
                  </h2>
                  <ol className="relative mt-7 space-y-6 border-l-2 border-border pl-6">
                    <ChangeItem
                      label="KBAS"
                      title="Daily budget WPCID 12345"
                      sub="$38 → $40 · Routine, within publisher bounds"
                      ago="3 days ago"
                    />
                    <ChangeItem
                      label="XBAS"
                      title="Bid strategy refresh"
                      sub="Target-CPA model retuned on rolling 28-day window"
                      ago="6 days ago"
                    />
                    <ChangeItem
                      label="Manual"
                      title="Negative keyword list update"
                      sub="+12 negatives shared from sibling HVAC campaign"
                      ago="11 days ago"
                    />
                  </ol>
                </>
              )}
            </motion.div>

            {/* Right column — client-ready */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-primary">
                  <FileText className="h-3.5 w-3.5" /> Client-ready summary
                </div>
                <div className="mt-3 rounded-xl border border-border bg-background p-4 text-[14px] italic leading-relaxed text-foreground">
                  "Campaign is pacing well at $48 CPL against a $50 goal. No
                  changes needed this cycle. Watching CPC, which is up modestly
                  over the last 14 days."
                </div>
                <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground transition hover:opacity-95">
                  <Copy className="h-3.5 w-3.5" /> Copy + log to CRM
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                  Next check-in
                </div>
                <h3 className="mt-1 font-display text-[17px] font-semibold tracking-tight">
                  Re-diagnose in 7 days
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  Scout will keep an eye on CPC and ping you if the trend
                  crosses the band.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[12px] text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Auto-scheduled · Tuesday, 09:00 PT
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <DiagnoseModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => setOpen(false)}
        campaignName={campaign.name}
      />
    </div>
  );
}

function ConfidenceRow({ label, filled }: { label: string; filled: number }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{
                background:
                  i < filled
                    ? "oklch(0.52 0.19 28)"
                    : "oklch(0.9 0.018 55)",
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[12px] font-semibold text-foreground">
          {filled}/5
        </span>
      </div>
    </div>
  );
}

function ReasoningBlock({
  title,
  children,
  tone,
}: {
  title: string;
  children: React.ReactNode;
  tone: "ok" | "warn";
}) {
  const accent =
    tone === "warn"
      ? "border-l-[oklch(0.68_0.16_65)]"
      : "border-l-primary";
  const dot =
    tone === "warn"
      ? "bg-[oklch(0.68_0.16_65)]"
      : "bg-primary";
  return (
    <div className={`mt-6 border-l-2 ${accent} pl-5`}>
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-foreground/80">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {title}
      </div>
      <div className="mt-2 text-[14.5px] leading-relaxed text-foreground">
        {children}
      </div>
    </div>
  );
}

function Chips({ chips }: { chips: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((c) => (
        <span
          key={c}
          className="rounded-md px-2.5 py-1 text-[12px] font-medium text-primary"
          style={{ background: "oklch(0.52 0.19 28 / 0.1)" }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  vs,
  tone,
}: {
  icon: any;
  label: string;
  value: string;
  vs: string;
  tone: "ok" | "warn";
}) {
  const styles =
    tone === "warn"
      ? {
          bg: "oklch(0.97 0.05 70)",
          border: "oklch(0.85 0.08 65)",
          valueColor: "text-[oklch(0.5_0.16_55)]",
          iconColor: "text-[oklch(0.6_0.18_55)]",
        }
      : {
          bg: "oklch(0.985 0.008 60)",
          border: "oklch(0.88 0.04 145)",
          valueColor: "text-foreground",
          iconColor: "text-[oklch(0.5_0.13_155)]",
        };
  return (
    <div
      className="group rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-22px_oklch(0.4_0.15_25/0.2)]"
      style={{ background: styles.bg, borderColor: styles.border }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        <Icon className={`h-3.5 w-3.5 ${styles.iconColor}`} />
      </div>
      <div
        className={`mt-3 font-display text-[28px] font-semibold leading-none tracking-tight ${styles.valueColor}`}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[12px] text-muted-foreground">{vs}</div>
    </div>
  );
}

function ChangeItem({
  label,
  title,
  sub,
  ago,
}: {
  label: string;
  title: string;
  sub: string;
  ago: string;
}) {
  return (
    <li className="relative">
      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[14px]">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
            {label}
          </span>{" "}
          <span className="font-medium text-foreground">· {title}</span>
        </div>
        <span className="text-[12px] text-muted-foreground">{ago}</span>
      </div>
      {sub && (
        <div className="mt-1 text-[13px] text-muted-foreground">{sub}</div>
      )}
    </li>
  );
}