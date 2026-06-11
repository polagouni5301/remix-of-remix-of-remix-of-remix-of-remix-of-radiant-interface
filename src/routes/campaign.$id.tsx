import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Info,
  RefreshCw,
  Circle,
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
  const [evidenceOpen, setEvidenceOpen] = useState(true);

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1280px] px-8 pb-24 pt-8">
        {/* Crumb */}
        <div className="flex items-center justify-between text-[13px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-medium text-foreground transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to campaigns
            </Link>
            <span>·</span>
            <span>#{campaign.id}</span>
            <span>·</span>
            <span className="font-semibold text-foreground">{campaign.name}</span>
          </div>
          <span>data through yesterday EOD</span>
        </div>

        {/* Last action banner */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 px-5 py-3 text-[13px]">
          <Info className="mt-0.5 h-4 w-4 text-warning" />
          <p className="text-foreground">
            <span className="font-semibold">Last action on this campaign:</span>{" "}
            <span className="text-muted-foreground">
              {campaign.lastActionDays} days ago · KBAS. Data may not reflect changes from
              the last few hours.
            </span>
          </p>
        </div>

        {/* Hero diagnosis */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 overflow-hidden rounded-3xl border border-border p-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.018 90) 0%, oklch(0.97 0.012 160) 100%)",
          }}
        >
          <div className="flex items-start gap-6">
            <ScoutMark size={56} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-[11px] font-semibold tracking-[0.16em] text-primary">
                  SCOUT · INFORMATIONAL
                </div>
                <span className="text-[12px] text-muted-foreground">
                  diagnosed in 11.4 seconds
                </span>
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[12px] font-medium text-foreground transition hover:border-primary/40"
                >
                  <RefreshCw className="h-3 w-3" /> Re-diagnose
                </button>
                <span className="text-[12px] text-muted-foreground">
                  ~28 min of digging — credited to your reclaimed time if you act.
                </span>
              </div>

              <h1 className="mt-4 max-w-3xl font-display text-[40px] font-semibold leading-[1.05] tracking-tight">
                {campaign.name} is healthy. One thing worth knowing.
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                Utilization 0.94 (in range), CPL $48 vs $50 goal, CVR 3.8% (in range). KBAS
                and XBAS have made only routine in-band adjustments — no manual
                intervention needed in 14 days.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3">
                <ConfidenceRow label="Evidence" filled={5} />
                <ConfidenceRow label="Root-cause clarity" filled={5} />
                <span className="text-[13px] text-muted-foreground">
                  · Informational only — no action proposed
                </span>
              </div>
              <p className="mt-2 max-w-xl text-[12px] text-muted-foreground">
                How sure Scout is, broken down by sub-signal.{" "}
                <span className="font-semibold text-foreground">Overall = lowest</span> of
                the three.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Two columns */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
              SCOUT'S REASONING
            </div>
            <h2 className="mt-1 font-display text-[24px] font-semibold tracking-tight">
              Here's what I saw and how I got there.
            </h2>

            <ReasoningBlock title="CAMPAIGN STATE">
              <p>
                All headline metrics inside their normal bands. Utilization{" "}
                <b>0.94</b>, CPL <b>$48</b> vs <b>$50</b> goal, CVR <b>3.8%</b>, ROAS in
                line with the HVAC vertical benchmark.
              </p>
              <Chips chips={["Util 0.94", "CPL $48 / $50", "CVR 3.8%"]} />
            </ReasoningBlock>

            <ReasoningBlock title="AUTOMATION ACTIVITY">
              <p>
                <b>KBAS</b> rebalanced WPCID 12345 three days ago — a routine in-band shift
                on the 3-day schedule, within publisher KBAS bounds.{" "}
                <b>No manual intervention needed</b> in 14 days.
              </p>
              <Chips chips={["KBAS · routine", "No manual touch · 14d"]} />
            </ReasoningBlock>

            <ReasoningBlock title="WORTH MONITORING">
              <p>
                <b>CPC</b> trended <b>+12%</b> over the last 14 days. Not actionable today,
                but if it continues, CPL could reach goal next cycle. Worth flagging for
                the next client check-in.
              </p>
              <Chips chips={["CPC +12% · 14d"]} />
            </ReasoningBlock>

            <div className="mt-8 grid grid-cols-1 gap-8 border-t border-border pt-6 sm:grid-cols-2">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                  WHAT I CHECKED
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
                <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                  WHAT'S MISSING
                </div>
                <ul className="mt-3 space-y-2 text-[14px] text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Circle className="h-4 w-4 text-muted-foreground/60" strokeDasharray="2 2" />
                    No client-context notes provided
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <button
                onClick={() => setEvidenceOpen((v) => !v)}
                className="flex w-full items-center gap-2 text-[14px] text-muted-foreground"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    evidenceOpen ? "" : "-rotate-90"
                  }`}
                />
                Evidence Scout used (4 sources)
              </button>

              {evidenceOpen && (
                <div className="mt-5">
                  <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                    HEALTH SNAPSHOT
                  </div>
                  <h3 className="mt-1 font-display text-[18px] font-semibold">
                    All metrics inside their normal bands.
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <MetricTile label="UTILIZATION" value="0.94" vs="vs 1.00" tone="ok" />
                    <MetricTile label="CPL (7D)" value="$48" vs="vs $50" tone="ok" />
                    <MetricTile label="CVR (7D)" value="3.8%" vs="vs 3.5%+" tone="ok" />
                    <MetricTile label="CPC TREND" value="+12%" vs="vs flat" tone="warn" />
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                CHANGE HISTORY · LAST 14 DAYS
              </div>
              <h3 className="mt-1 font-display text-[18px] font-semibold">
                What changed before this signal.
              </h3>
              <ul className="mt-5 space-y-5">
                <ChangeItem
                  label="KBAS"
                  title="Daily budget WPCID 12345"
                  sub="$38 → $40 · Routine"
                  ago="3d ago"
                />
                <ChangeItem
                  label="XBAS"
                  title="Bid strategy refresh"
                  sub=""
                  ago="6d ago"
                />
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Action footer */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-8 rounded-2xl border border-border bg-accent/40 p-8"
        >
          <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
            WHAT YOU CAN DO
          </div>
          <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
            Client-ready summary
          </h3>
          <div className="mt-4 rounded-xl border border-border bg-card p-5 text-[14px] italic leading-relaxed text-foreground">
            "Campaign is pacing well at $48 CPL against a $50 goal. No changes needed this
            cycle. Watching CPC, which is up modestly over the last 14 days."
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground transition hover:opacity-95">
              <Copy className="h-4 w-4" /> Copy + log
            </button>
            <button className="rounded-full px-4 py-2 text-[14px] font-medium text-muted-foreground transition hover:text-foreground">
              Not now
            </button>
          </div>
        </motion.section>
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

function ConfidenceRow({ label, filled }) {
  return (
    <div className="flex items-center gap-3 text-[13px]">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-[3px]"
            style={{ background: i < filled ? "oklch(0.32 0.07 160)" : "oklch(0.88 0.012 90)" }}
          />
        ))}
      </div>
      <span className="font-semibold text-foreground">{filled}/5</span>
    </div>
  );
}

function ReasoningBlock({ title, children }) {
  return (
    <div className="mt-6 border-l-2 border-primary/70 pl-5">
      <div className="text-[11px] font-semibold tracking-[0.14em] text-primary">
        {title}
      </div>
      <div className="mt-2 text-[14.5px] leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function Chips({ chips }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((c) => (
        <span
          key={c}
          className="rounded-md bg-primary/8 px-2.5 py-1 text-[12px] font-medium text-primary"
          style={{ background: "oklch(0.32 0.07 160 / 0.08)" }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function MetricTile({ label, value, vs, tone }) {
  const bg = tone === "warn" ? "oklch(0.96 0.05 70)" : "oklch(0.95 0.04 160)";
  const border = tone === "warn" ? "oklch(0.85 0.06 70)" : "oklch(0.82 0.06 160)";
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: bg, borderColor: border }}
    >
      <div className="text-[10.5px] font-semibold tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-display text-[24px] font-semibold text-foreground">
        {value}
      </div>
      <div className="text-[12px] text-muted-foreground">{vs}</div>
    </div>
  );
}

function ChangeItem({ label, title, sub, ago }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 h-2.5 w-2.5 rounded-full border-2 border-primary" />
      <div className="flex-1">
        <div className="flex items-baseline justify-between">
          <div className="text-[14px]">
            <span className="font-semibold text-primary">{label}</span>{" "}
            <span className="text-muted-foreground">·</span>{" "}
            <span className="font-medium text-foreground">{title}</span>
          </div>
          <span className="text-[12px] text-muted-foreground">{ago}</span>
        </div>
        {sub && <div className="mt-0.5 text-[13px] text-muted-foreground">{sub}</div>}
      </div>
    </li>
  );
}
