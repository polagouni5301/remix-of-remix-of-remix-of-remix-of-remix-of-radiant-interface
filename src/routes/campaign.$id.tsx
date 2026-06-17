import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Info,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
  ExternalLink,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Header } from "../components/scout/Header";
import { ScoutMark } from "../components/scout/Logo";
import { DiagnoseModal } from "../components/scout/DiagnoseModal";
import { DecisionCapture } from "../components/scout/DecisionCapture";
import { Button } from "../components/ui/button";
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
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center text-muted-foreground">
      {error.message}
    </div>
  ),
  loader: ({ params }) => {
    const c = getCampaign(params.id);
    if (!c) throw notFound();
    return c;
  },
});

/* ---------------- Per-campaign diagnosis content ---------------- */

type Kind = "healthy" | "actionable-cpl" | "actionable-pacing" | "investigate";
type Diag = {
  kind: Kind;
  label: "ACTIONABLE" | "INFORMATIONAL" | "INVESTIGATE";
  headline: React.ReactNode;
  subhead: string;
  evidence: number;
  clarity: number;
  safety: number;
  safetyLabel: string;
  lastAction: string;
  diagnosedIn: string;
  appliedTitle: string;
  appliedChange: React.ReactNode;
  appliedCopy: string;
  historyTitle?: string;
  history: Array<{
    label: string;
    title: string;
    sub?: string;
    ago: string;
  }>;
};

const DIAGS: Record<string, Diag> = {
  "5212017": {
    kind: "healthy",
    label: "INFORMATIONAL",
    headline: (
      <>
        Acme Plumbing is healthy.{" "}
        <span className="text-muted-foreground">One thing worth knowing.</span>
      </>
    ),
    subhead:
      "Utilization 0.94 (in range), CPL $48 vs $50 goal, CVR 3.8% (in range). KBAS and XBAS have made only routine in-band adjustments — no manual intervention needed in 14 days.",
    evidence: 5,
    clarity: 5,
    safety: 5,
    safetyLabel: "All sub-bands healthy",
    lastAction: "11 days ago · KBAS",
    diagnosedIn: "11.4s",
    appliedTitle: "Acknowledged.",
    appliedChange: <>Logged a check-in. Scout will re-scan in 7 days.</>,
    appliedCopy:
      "Campaign is pacing well at $48 CPL against a $50 goal. No changes needed this cycle.",
    history: [
      { label: "KBAS", title: "Daily budget WPCID 12345", sub: "$38 → $40 · Routine", ago: "3d ago" },
      { label: "XBAS", title: "Bid strategy refresh", ago: "6d ago" },
    ],
  },
  "7720915": {
    kind: "investigate",
    label: "INVESTIGATE",
    headline: (
      <>
        Acme Roofing CVR dropped 45% —{" "}
        <span className="text-muted-foreground">
          the signal points downstream.
        </span>
      </>
    ),
    subhead:
      "The drop is uniform across keywords and publishers with click volume stable. That pattern almost always means landing page or tracking, not the ad.",
    evidence: 3,
    clarity: 4,
    safety: 1,
    safetyLabel: "No autonomous action — investigate only",
    lastAction: "4 days ago · XBAS",
    diagnosedIn: "11.4s",
    appliedTitle: "Opening the LP & tracking screen.",
    appliedChange: (
      <>This one needs your eyes — there's no direct lever I can pull. I've pre-loaded the checks below so you don't have to start from zero.</>
    ),
    appliedCopy:
      "Investigated landing-page and tracking — checked conversion pixel, form submission, GA4 vs ad-platform parity, and recent LP changes.",
    history: [
      { label: "XBAS", title: "Bid strategy refresh", ago: "4d ago" },
      { label: "You", title: "Added 5 negatives", ago: "12d ago" },
    ],
  },
  "3140833": {
    kind: "actionable-pacing",
    label: "ACTIONABLE",
    headline: (
      <>
        Cool-O-Matic is 35% over target{" "}
        <span className="text-muted-foreground">with 8 days left.</span>
      </>
    ),
    subhead:
      "Spend is concentrated on WPCID 12346 — the publisher KBAS hasn't touched. At current pace, the campaign spends out 5 days early.",
    evidence: 5,
    clarity: 4,
    safety: 5,
    safetyLabel: "≤20% budget change per action",
    lastAction: "2 days ago · KBAS",
    diagnosedIn: "11.4s",
    appliedTitle: "Applied. Nice.",
    appliedChange: (
      <>
        <b>WPCID 12346 — Google Search</b> daily budget $75 →{" "}
        <span className="font-semibold text-[oklch(0.235_0.18_268)]">$65/day</span>
      </>
    ),
    appliedCopy:
      "Reduced WPCID 12346 daily budget from $75 to $65 to bring cycle pacing in band. Watching at +1d, +3d, +7d.",
    historyTitle: "KBAS already tried — but it only touched one publisher.",
    history: [
      { label: "KBAS", title: "Daily budget WPCID 12345", sub: "$40 → $33 · Auto-correct", ago: "2d ago" },
      { label: "You", title: "Added negatives (3 keywords)", ago: "5d ago" },
      { label: "KBAS", title: "Daily budget WPCID 12346", sub: "$70 → $75 · Auto", ago: "9d ago" },
    ],
  },
  "4881204": {
    kind: "actionable-cpl",
    label: "ACTIONABLE",
    headline: (
      <>
        CPL on Mountain View Plumbing is up 35% —{" "}
        <span className="text-muted-foreground">three keywords are the cause.</span>
      </>
    ),
    subhead:
      "Click and impression volume are stable. The cost is being absorbed by three broad-match keywords pulling informational queries.",
    evidence: 4,
    clarity: 4,
    safety: 5,
    safetyLabel: "Negatives are reversible",
    lastAction: "yesterday · you",
    diagnosedIn: "11.4s",
    appliedTitle: "Applied. Nice.",
    appliedChange: (
      <>
        <b>Add 3 phrase-match negatives.</b> I'll watch CPL at +1d, +3d, and +7d
        to confirm the non-converting spend is gone — and that no good queries
        got caught.
      </>
    ),
    appliedCopy:
      "Added phrase-match negatives -\"how to\", -\"cost\", -\"prices\" to suppress informational queries on broad-match terms.",
    history: [
      { label: "You", title: "Increased budget", sub: "$160/d → $175/d", ago: "1d ago" },
      { label: "XBAS", title: "Bid strategy refresh", ago: "7d ago" },
    ],
  },
  // Fallbacks
  "6620331": {
    kind: "healthy",
    label: "INFORMATIONAL",
    headline: (
      <>
        Bright Smile Dental is steady.{" "}
        <span className="text-muted-foreground">Watch non-brand share.</span>
      </>
    ),
    subhead:
      "Brand impression share is solid. Non-brand share has slipped from 78% to 61% over 14 days — worth a check-in at the next client call.",
    evidence: 4,
    clarity: 4,
    safety: 5,
    safetyLabel: "Monitor — no action yet",
    lastAction: "13 days ago · KBAS",
    diagnosedIn: "10.8s",
    appliedTitle: "Acknowledged.",
    appliedChange: <>Logged for next client conversation. Scout will re-check in 5 days.</>,
    appliedCopy:
      "Non-brand impression share down to 61% from 78%. Flagged for client check-in.",
    history: [
      { label: "KBAS", title: "Daily budget WPCID 12345", sub: "$38 → $40 · Routine", ago: "3d ago" },
      { label: "XBAS", title: "Bid strategy refresh", ago: "6d ago" },
    ],
  },
  "9013477": {
    kind: "healthy",
    label: "INFORMATIONAL",
    headline: (
      <>
        Harbor & Vale just had its best week.{" "}
        <span className="text-muted-foreground">Here's what worked.</span>
      </>
    ),
    subhead:
      "Conversions doubled (21 → 42) over 7 days, paced by the new landing page you shipped last week. CPL down to $28 from $41.",
    evidence: 5,
    clarity: 5,
    safety: 5,
    safetyLabel: "Keep current bids",
    lastAction: "2 days ago · you",
    diagnosedIn: "9.2s",
    appliedTitle: "Logged the win.",
    appliedChange: <>Recorded the LP swap as the cause. Pattern will be suggested next time.</>,
    appliedCopy:
      "LP swap drove 2× conversions at a 32% lower CPL. Documented as a winning pattern.",
    history: [
      { label: "KBAS", title: "Daily budget WPCID 12345", sub: "$38 → $40 · Routine", ago: "3d ago" },
      { label: "XBAS", title: "Bid strategy refresh", ago: "6d ago" },
    ],
  },
};

/* ---------------- Page ---------------- */

function Detail() {
  const { id } = useParams({ from: "/campaign/$id" });
  const campaign = getCampaign(id);
  const diag = DIAGS[id] ?? DIAGS["5212017"];
  const [open, setOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(true);
  const [applied, setApplied] = useState<null | "applied" | "investigated" | "ack">(null);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"applied" | "investigated" | "ack">("applied");

  const recommendationText =
    diag.kind === "actionable-pacing"
      ? "Reduce WPCID 12346 daily budget to bring pacing back in band."
      : diag.kind === "actionable-cpl"
        ? "Add 3 phrase-match negatives to suppress informational queries."
        : diag.kind === "investigate"
          ? "Open the LP & tracking screen — checks pre-loaded."
          : "Acknowledge — campaign is healthy, log a check-in.";

  const requestDecision = (k: "applied" | "investigated" | "ack") => {
    setPendingAction(k);
    setDecisionOpen(true);
  };

  const handleDecision = (
    result: null | "applied" | "investigated",
    _meta: any,
  ) => {
    setDecisionOpen(false);
    if (result === "applied") setApplied("applied");
    else if (result === "investigated") setApplied("investigated");
    else if (result === null && pendingAction === "ack") setApplied("ack");
  };

  if (!campaign) return null;

  const isActionable = diag.kind === "actionable-cpl" || diag.kind === "actionable-pacing";
  const isInvestigate = diag.kind === "investigate";

  return (
    <div className="min-h-screen text-foreground bg-page-campaign">
      <Header />

      <main className="mx-auto max-w-[1280px] px-8 pb-24 pt-8">
        {/* Crumb / top bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[oklch(0.235_0.18_268)]/15 px-5 py-3 text-[13px] text-muted-foreground shadow-[0_10px_30px_-22px_oklch(0.235_0.18_268/0.6)] backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.235 0.18 268 / 0.08) 0%, oklch(1 0 0 / 0.7) 45%, oklch(0.6 0.13 200 / 0.08) 100%)",
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[oklch(0.235_0.18_268)]/10 px-3 py-1.5 font-semibold text-[oklch(0.235_0.18_268)] transition hover:bg-[oklch(0.235_0.18_268)]/15"
            >
              <ArrowLeft className="h-4 w-4" /> Back to campaigns
            </Link>
            <span className="text-[oklch(0.235_0.18_268)]/30">·</span>
            <span className="font-mono text-foreground">#{campaign.id}</span>
            <span className="text-[oklch(0.235_0.18_268)]/30">·</span>
            <span className="truncate font-semibold text-foreground">{campaign.name}</span>
          </div>
          <span className="rounded-full bg-[oklch(0.6_0.13_200)]/12 px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[oklch(0.42_0.11_215)]">
            data through yesterday EOD
          </span>
        </div>

        {applied ? (
          <AppliedScreen diag={diag} campaign={campaign} kind={applied} onReset={() => setApplied(null)} />
        ) : (
          <>
            {/* HERO DIAGNOSIS */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-6 overflow-hidden rounded-3xl border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(1 0 0) 0%, oklch(0.92 0.04 268) 60%, oklch(0.92 0.04 268) 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-40"
                style={{
                  background:
                    "radial-gradient(closest-side, oklch(0.235 0.18 268 / 0.55), transparent)",
                }}
              />
              <div className="relative grid grid-cols-1 gap-8 p-8 md:p-10 lg:grid-cols-[1fr_320px]">
                <div className="flex items-start">
                  <div className="-ml-7 mr-3 shrink-0">
                    <ScoutMark size={100} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[oklch(0.92_0.04_268)] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[oklch(0.235_0.18_268)]">
                        Scout · {diag.label}
                      </span>
                      <span className="rounded-full bg-card/80 px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">
                        {campaign.vertical}
                      </span>
                      <span className="text-[12px] text-muted-foreground">
                        Diagnosed in {diag.diagnosedIn}
                      </span>
                      <span className="text-[12px] text-muted-foreground">
                        · ~28 min of digging reclaimed
                      </span>
                    </div>

                    <h1 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-tight">
                      {diag.headline}
                    </h1>

                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                      {diag.subhead}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setOpen(true)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background transition hover:bg-foreground/90"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Re-diagnose
                      </button>
                    <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-semibold text-foreground transition hover:border-[oklch(0.235_0.18_268)]/40">
                        <Copy className="h-3.5 w-3.5" /> Copy summary
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confidence card */}
                <div className="rounded-2xl border border-[oklch(0.235_0.18_268)]/20 bg-card/80 p-5 backdrop-blur">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.235_0.18_268)]">
                    Scout's confidence
                  </div>
                  <div className="mt-3 space-y-3">
                    <ConfidenceRow label="Evidence" filled={diag.evidence} />
                    <ConfidenceRow label="Root-cause clarity" filled={diag.clarity} />
                    <ConfidenceRow label={isInvestigate ? "Reversibility" : "Action safety"} filled={diag.safety} />
                  </div>
                  <div className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-[11.5px] text-muted-foreground">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    <span>{diag.safetyLabel}</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Last action banner */}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 px-5 py-3 text-[13px]">
              <Info className="mt-0.5 h-4 w-4 text-warning" />
              <p className="text-foreground">
                <span className="font-semibold">Last action on this campaign:</span>{" "}
                <span className="text-muted-foreground">
                  {diag.lastAction}. Data may not reflect changes from the last few hours.
                </span>
              </p>
            </div>

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

                <ReasoningForKind diag={diag} />

                <div className="mt-8 grid grid-cols-1 gap-8 border-t border-border pt-6 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                      WHAT I CHECKED
                    </div>
                    <ul className="mt-3 space-y-2 text-[14px] text-foreground">
                      {whatIChecked(diag.kind).map((x) => (
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
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-3 w-3 rounded-full border-2 border-dashed border-muted-foreground/40" />
                        {whatsMissing(diag.kind)}
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
                    className="flex w-full items-center gap-2 text-[14px] font-semibold text-foreground"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${evidenceOpen ? "" : "-rotate-90"}`}
                    />
                    Evidence Scout used (4 sources)
                  </button>
                  {evidenceOpen && <EvidenceForKind diag={diag} />}
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
                    {diag.historyTitle ?? "What changed before this signal."}
                  </h3>
                  <ul className="mt-5 space-y-5">
                    {diag.history.map((item, i) => (
                      <ChangeItem
                        key={i}
                        {...item}
                        color={HISTORY_COLORS[i % HISTORY_COLORS.length]}
                        isLast={i === diag.history.length - 1}
                      />
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>

            {/* Action footer */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-8 overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div
                aria-hidden
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.235 0.18 268), oklch(0.38 0.16 268))",
                }}
              />
              <div className="grid grid-cols-1 gap-6 p-8 lg:grid-cols-[1fr_320px]">
                <ActionPanel diag={diag} campaign={campaign} onApply={requestDecision} />

                <aside className="rounded-2xl border border-border bg-secondary/40 p-5">
                  <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                    CLIENT-READY SUMMARY
                  </div>
                  <p className="mt-3 text-[13px] italic leading-relaxed text-foreground">
                    "{diag.appliedCopy}"
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-4 py-2 text-[13px] font-semibold text-[oklch(0.99_0_0)] transition hover:opacity-95">
                    <Copy className="h-3.5 w-3.5" /> Copy + log to CRM
                  </button>
                </aside>
              </div>
            </motion.section>
          </>
        )}
      </main>

      <DiagnoseModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => setOpen(false)}
        campaignName={campaign.name}
      />

      <DecisionCapture
        open={decisionOpen}
        onClose={() => setDecisionOpen(false)}
        onDecision={handleDecision}
        title="Capture your decision"
        recommendation={recommendationText}
        campaignName={campaign.name}
      />
    </div>
  );
}

/* ---------------- Sub components ---------------- */

function ActionPanel({
  diag,
  campaign,
  onApply,
}: {
  diag: Diag;
  campaign: any;
  onApply: (k: "applied" | "investigated" | "ack") => void;
}) {
  const [budget, setBudget] = useState(65);
  const checks = [
    "Landing page form submits — fire a test lead",
    "Conversion tag firing on the thank-you page (GTM preview)",
    "Recent LP changes in the last 14 days (ask the AM)",
    "Compare CVR drop start date against publishing dates",
  ];

  if (diag.kind === "investigate") {
    return (
      <div>
        <div className="text-[11px] font-semibold tracking-[0.14em] text-[oklch(0.235_0.18_268)]">
          INVESTIGATE · NO DIRECT LEVER
        </div>
        <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
          Open the evidence pack
        </h3>
        <p className="mt-2 max-w-lg text-[14px] text-muted-foreground">
          Deep-links to the LP + tracking screen with checks pre-loaded.
        </p>

        <div className="mt-5 rounded-xl border border-border bg-accent/40 p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Pre-loaded checks
          </div>
          <ul className="mt-3 space-y-2 text-[13.5px] text-foreground">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border border-border bg-card" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => onApply("investigated")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-5 py-2.5 text-[14px] font-semibold text-[oklch(0.99_0_0)] transition hover:opacity-95"
          >
            <ExternalLink className="h-4 w-4" /> Take me there
          </button>
          <button className="cursor-pointer rounded-full px-4 py-2 text-[14px] font-medium text-muted-foreground hover:text-foreground">
            Not now
          </button>
        </div>
      </div>
    );
  }

  if (diag.kind === "actionable-pacing") {
    return (
      <div>
        <div className="text-[11px] font-semibold tracking-[0.14em] text-[oklch(0.235_0.18_268)]">
          RECOMMENDED ACTION
        </div>
        <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
          Reduce WPCID 12346 daily budget
        </h3>
        <p className="mt-1 text-[13px] text-muted-foreground">WPCID 12346 — Google Search</p>

        <div className="mt-6 flex items-center justify-between text-[12px] text-muted-foreground">
          <span>$60 <span className="text-success">−20%</span></span>
          <span>$90 <span className="text-warning">+20%</span></span>
        </div>
        <input
          type="range"
          min={60}
          max={90}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="mt-1 w-full accent-[oklch(0.235_0.18_268)]"
        />
        <div className="mt-3 flex items-end justify-between">
          <span className="text-[12px] text-muted-foreground">
            Currently set to: <b className="text-foreground">$75</b> · 20% guardrail · KBAS min/max respected
          </span>
          <span className="font-display text-[28px] font-semibold text-foreground">
            ${budget}
            <span className="ml-2 rounded-md bg-[oklch(0.92_0.04_268)] px-2 py-0.5 text-[12px] font-medium text-[oklch(0.235_0.18_268)]">
              {budget === 75 ? "0%" : `${budget > 75 ? "+" : ""}${Math.round(((budget - 75) / 75) * 100)}%`}
            </span>
          </span>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-xl border border-[oklch(0.235_0.18_268)]/20 bg-[oklch(0.92_0.04_268)]/50 p-3 text-[13px] text-foreground">
          <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.235_0.18_268)]" />
          <p>
            <b>If applied:</b> I'll re-check pacing at +1d, +3d, and +7d to confirm the cycle lands in band.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => onApply("applied")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-5 py-2.5 text-[14px] font-semibold text-[oklch(0.99_0_0)] transition hover:opacity-95"
          >
            <Check className="h-4 w-4" /> Apply this change
          </button>
          <span className="text-[12.5px] text-muted-foreground">
            You're tuning the amount above — that's your call.
          </span>
        </div>
        <button className="mt-3 cursor-pointer text-[13px] text-muted-foreground hover:text-foreground">Not now</button>
      </div>
    );
  }

  if (diag.kind === "actionable-cpl") {
    return (
      <div>
        <div className="text-[11px] font-semibold tracking-[0.14em] text-[oklch(0.235_0.18_268)]">
          RECOMMENDED ACTION
        </div>
        <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
          Add 3 phrase-match negatives
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {["-\"how to\"", "-\"cost\"", "-\"prices\""].map((t) => (
            <span
              key={t}
              className="rounded-md border border-[oklch(0.235_0.18_268)]/20 bg-[oklch(0.92_0.04_268)] px-3 py-1.5 font-mono text-[13px] text-[oklch(0.235_0.18_268)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-xl border border-[oklch(0.235_0.18_268)]/20 bg-[oklch(0.92_0.04_268)]/50 p-3 text-[13px] text-foreground">
          <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.235_0.18_268)]" />
          <p>
            <b>If applied:</b> I'll watch CPL at +1d, +3d, and +7d to confirm the
            non-converting spend is gone — and that no good queries got caught.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => onApply("applied")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-5 py-2.5 text-[14px] font-semibold text-[oklch(0.99_0_0)] transition hover:opacity-95"
          >
            <Check className="h-4 w-4" /> Add negatives
          </button>
          <button className="cursor-pointer text-[14px] text-muted-foreground hover:text-foreground">
            Not now
          </button>
        </div>
      </div>
    );
  }

  // healthy
  return (
    <div>
      <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
        WHAT YOU CAN DO
      </div>
      <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
        No change needed this cycle
      </h3>
      <p className="mt-2 max-w-lg text-[14px] text-muted-foreground">
        Healthy campaigns don't need touch. Acknowledge to log a check-in and
        free your attention for the ones that do.
      </p>
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => onApply("ack")}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-5 py-2.5 text-[14px] font-semibold text-[oklch(0.99_0_0)] transition hover:opacity-95"
        >
          <Check className="h-4 w-4" /> Acknowledge
        </button>
        <Link to="/" className="cursor-pointer text-[14px] text-muted-foreground hover:text-foreground">
          Back to campaigns
        </Link>
      </div>
    </div>
  );
}

function AppliedScreen({
  diag,
  campaign,
  kind,
  onReset,
}: {
  diag: Diag;
  campaign: any;
  kind: "applied" | "investigated" | "ack";
  onReset: () => void;
}) {
  const isInvestigated = kind === "investigated";
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 grid place-items-center"
    >
      <div className="relative w-full max-w-[760px] overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-[0_30px_60px_-30px_oklch(0.235_0.18_268/0.18)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-10 h-[260px] w-[260px] opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.38 0.16 268 / 0.4), transparent)",
          }}
        />
        <div
          className={`grid h-14 w-14 place-items-center rounded-full ${
            isInvestigated
              ? "bg-[oklch(0.92_0.04_268)] text-[oklch(0.38_0.16_268)]"
              : "bg-[oklch(0.92_0.04_268)] text-[oklch(0.235_0.18_268)]"
          }`}
        >
          {isInvestigated ? <Search className="h-6 w-6" /> : <Check className="h-7 w-7" strokeWidth={3} />}
        </div>

        <h2 className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-tight">
          {diag.appliedTitle}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {isInvestigated ? (
            <>
              This one needs your eyes — there's no direct lever I can pull. I've
              pre-loaded the checks below so you don't have to start from zero.
            </>
          ) : (
            <>
              {campaign.name} has been updated. Scout will check back in 24 hours
              and again at +3 and +7 days.
            </>
          )}
        </p>

        {isInvestigated ? (
          <div className="mt-7 rounded-2xl border border-border bg-accent/40 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              What to verify
            </div>
            <ul className="mt-3 space-y-2.5 text-[14px] text-foreground">
              {[
                "Landing page form submits — fire a test lead",
                "Conversion tag firing on the thank-you page (GTM preview)",
                "Recent LP changes in the last 14 days (ask the AM)",
                "Compare CVR drop start date against publishing dates",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border border-border bg-card" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
              Logged to{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-foreground">
                agent_responses
              </code>{" "}
              as <b className="text-foreground">investigated</b>
            </div>
            <p className="mt-3 text-[12.5px] text-muted-foreground">
              If you find something and act, return here and tell me what it was —
              that's the strongest training signal.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-7 rounded-2xl border border-border bg-accent/40 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                What changed
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                {diag.appliedChange}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
                <span>
                  · Logged to{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-foreground">
                    agent_responses
                  </code>
                </span>
                <span>· Outcome check at +1d, +3d, +7d</span>
                <a href="#" className="font-semibold text-[oklch(0.235_0.18_268)] hover:underline">
                  Open in Admin
                </a>
              </div>
            </div>

            <div
              className="mt-5 flex items-start gap-3 rounded-2xl px-5 py-4"
              style={{
                background:
                  "linear-gradient(120deg, oklch(0.92 0.04 268) 0%, oklch(1 0 0) 100%)",
              }}
            >
              <Timer className="mt-0.5 h-5 w-5 text-[oklch(0.235_0.18_268)]" />
              <p className="text-[14px] text-foreground">
                <b>You just reclaimed ~28 minutes.</b>{" "}
                <span className="text-muted-foreground">
                  That's <b className="text-foreground">75 min</b> recovered today.
                  Time you can spend on the next client conversation, not the next
                  dashboard.
                </span>
              </p>
            </div>
          </>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[13.5px] font-semibold text-foreground transition hover:border-[oklch(0.235_0.18_268)]/40"
          >
            <ArrowLeft className="h-4 w-4" /> Back to campaigns
          </Link>
          {isInvestigated ? (
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-5 py-2.5 text-[13.5px] font-semibold text-[oklch(0.99_0_0)] transition hover:opacity-95"
            >
              Open in Admin <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <Link
              to="/observation-schedule/$id"
              params={{ id: campaign.id }}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[oklch(0.235_0.18_268)] px-5 text-[13.5px] font-semibold text-[oklch(0.99_0_0)] shadow-[0_12px_28px_-12px_oklch(0.235_0.18_268/0.7)] transition hover:opacity-95"
            >
              See observation schedule <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <button
            onClick={onReset}
            className="cursor-pointer text-[13px] text-muted-foreground hover:text-foreground"
          >
            Undo
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function ReasoningForKind({ diag }: { diag: Diag }) {
  if (diag.kind === "actionable-pacing") {
    return (
      <>
        <ReasoningBlock title="CAMPAIGN STATE">
          <p>
            Pacing at <b>1.35</b> with <b>8 days remaining</b> on a $7,000 cycle budget.
            That's <b>$9,420 spent</b> against a <b>$5,133 to-date target</b>.
          </p>
          <Chips chips={["$9,420 actual", "$5,133 expected", "Utilization 1.35"]} />
        </ReasoningBlock>
        <ReasoningBlock title="WHAT CHANGED">
          <p>
            KBAS reduced WPCID 12345 daily budget from <b>$40 → $33</b> two days ago — automation
            responding to the overspend. But it addressed the smaller publisher.
          </p>
          <Chips chips={["KBAS: $40→$33", "2 days ago"]} />
        </ReasoningBlock>
        <ReasoningBlock title="PUBLISHER DISTRIBUTION">
          <p>
            <b>WPCID 12346</b> (Google Search) now accounts for <b>80% of last 7d spend</b> at $75/day —
            $15 above the daily rate needed to land at cycle target. WPCID 12345 is correctly paced post-adjustment.
          </p>
          <Chips chips={["WPCID 12346 · 80% spend", "$75/day budget", "$60/day target"]} />
        </ReasoningBlock>
        <ReasoningBlock title="PROJECTION">
          <p>
            At current daily rate, the campaign spends out around <b>Day 25</b> of a 30-day cycle.
            That's the kind of overspend that triggers a credit.
          </p>
          <Chips chips={["Spend-out: Day 25", "Cycle end: Day 30"]} />
        </ReasoningBlock>
      </>
    );
  }
  if (diag.kind === "actionable-cpl") {
    return (
      <>
        <ReasoningBlock title="CAMPAIGN STATE">
          <p>
            CPL increased from <b>$42 → $57</b> over the last 7 days vs a <b>$45 goal</b>.
            Clicks and impressions are flat — this is a conversion-efficiency issue, not a volume one.
          </p>
          <Chips chips={["CPL $57 (7d)", "Goal $45", "+35%"]} />
        </ReasoningBlock>
        <ReasoningBlock title="KEYWORD CONCENTRATION">
          <p>
            Three broad-match terms — <i>hvac companies near me</i>, <i>heating system cost</i>,{" "}
            <i>ac unit prices</i> — consume <b>40% of spend</b> with <b>zero conversions</b> in 14 days.
          </p>
          <Chips chips={["3 keywords · 40% spend", "0 conversions · 14d"]} />
        </ReasoningBlock>
        <ReasoningBlock title="INTERPRETATION">
          <p>
            These read as <b>informational queries</b> (research intent), not service intent. Match-type
            and search-term patterns confirm they're catching upper-funnel traffic.
          </p>
          <Chips chips={["Broad match", "Informational intent"]} />
        </ReasoningBlock>
        <ReasoningBlock title="AUTOMATION ACTIVITY">
          <p>
            XBAS refreshed bids 7 days ago — routine on the 3-day schedule, in-band. No structural
            campaign change explains the CPL move.
          </p>
          <Chips chips={["XBAS · routine", "No structural change"]} />
        </ReasoningBlock>
      </>
    );
  }
  if (diag.kind === "investigate") {
    return (
      <>
        <ReasoningBlock title="CAMPAIGN STATE">
          <p>
            CVR fell from <b>4.2% → 2.3%</b> over 7 days. Clicks and keyword mix are flat —
            the volume side of the funnel didn't change.
          </p>
          <Chips chips={["CVR 2.3% (7d)", "Baseline 4.2%", "−45%"]} />
        </ReasoningBlock>
        <ReasoningBlock title="DISTRIBUTION">
          <p>
            The drop is <b>uniform across all 4 publishers</b> and the <b>top 20 keywords</b>.
            No segment is concentrated.
          </p>
          <Chips chips={["4 publishers · uniform", "Top 20 keywords · uniform"]} />
        </ReasoningBlock>
        <ReasoningBlock title="AUTOMATION ACTIVITY">
          <p>
            XBAS refreshed bids 4 days ago — routine on the 3-day schedule and well in-band.
            Shouldn't drive a 45% CVR drop. No structural campaign change in 14 days.
          </p>
          <Chips chips={["XBAS · routine", "No structural change"]} />
        </ReasoningBlock>
        <ReasoningBlock title="INTERPRETATION">
          <p>
            Uniform drop with no campaign-side cause is the fingerprint of a <b>downstream change</b> —
            landing page edit, form regression, or a tracking pixel that's no longer firing.
            No campaign-side lever applies.
          </p>
          <Chips chips={["Downstream signal", "No direct lever"]} />
        </ReasoningBlock>
      </>
    );
  }
  // healthy
  return (
    <>
      <ReasoningBlock title="CAMPAIGN STATE">
        <p>
          All headline metrics inside their normal bands. Utilization <b>0.94</b>,
          CPL <b>$48</b> vs <b>$50</b> goal, CVR <b>3.8%</b>, ROAS in line with the
          vertical benchmark.
        </p>
        <Chips chips={["Util 0.94", "CPL $48 / $50", "CVR 3.8%"]} />
      </ReasoningBlock>
      <ReasoningBlock title="AUTOMATION ACTIVITY">
        <p>
          <b>KBAS</b> rebalanced WPCID 12345 three days ago — a routine in-band shift on the
          3-day schedule, within publisher KBAS bounds. <b>No manual intervention needed</b> in 14 days.
        </p>
        <Chips chips={["KBAS · routine", "No manual touch · 14d"]} />
      </ReasoningBlock>
      <ReasoningBlock title="WORTH MONITORING">
        <p>
          <b>CPC</b> trended <b>+12%</b> over the last 14 days. Not actionable today,
          but worth flagging for the next client check-in.
        </p>
        <Chips chips={["CPC +12% · 14d"]} />
      </ReasoningBlock>
    </>
  );
}

function EvidenceForKind({ diag }: { diag: Diag }) {
  if (diag.kind === "actionable-pacing") {
    return (
      <div className="mt-5 space-y-5">
        <EvidenceTitle label="PACING UTILIZATION · CYCLE TO DATE" headline="You'll spend out 5 days early at this rate." />
        <SparkChart kind="pacing" />
        <div className="border-t border-border pt-4">
          <EvidenceTitle label="PUBLISHER DISTRIBUTION · LAST 7 DAYS" headline="80% of spend on a single publisher." />
          <PublisherBars data={[
            { p: "WPCID 12346", v: 5712, share: "80%", cpl: "$51", cvr: "3.4%", color: "oklch(0.235 0.18 268)" },
            { p: "WPCID 12345", v: 1141, share: "16%", cpl: "$48", cvr: "3.8%", color: "oklch(0.6 0.13 200)" },
            { p: "Other (3)", v: 285, share: "4%", cpl: "$62", cvr: "2.9%", color: "oklch(0.58 0.19 300)" },
          ]} />
        </div>
      </div>
    );
  }
  if (diag.kind === "actionable-cpl") {
    return (
      <div className="mt-5 space-y-5">
        <EvidenceTitle label="CPL · LAST 14 DAYS" headline="$42 → $57 against a $45 goal." />
        <SparkChart kind="cpl-up" />
        <div className="border-t border-border pt-4">
          <EvidenceTitle label="TOP KEYWORDS BY 7-DAY SPEND" headline="Three of the top five drove zero conversions." />
          <KeywordTable />
        </div>
      </div>
    );
  }
  if (diag.kind === "investigate") {
    return (
      <div className="mt-5 space-y-5">
        <EvidenceTitle label="PUBLISHER DISTRIBUTION · LAST 7 DAYS" headline="Drop is uniform across all publishers." />
        <PublisherBars data={[
          { p: "WPCID 12346", v: 1812, share: "43%", cpl: "$74", cvr: "2.4%", color: "oklch(0.235 0.18 268)" },
          { p: "WPCID 12345", v: 1140, share: "27%", cpl: "$69", cvr: "2.2%", color: "oklch(0.6 0.13 200)" },
          { p: "WPCID 12347", v: 850, share: "20%", cpl: "$71", cvr: "2.3%", color: "oklch(0.58 0.19 300)" },
          { p: "WPCID 12348", v: 430, share: "10%", cpl: "$78", cvr: "2.1%", color: "oklch(0.62 0.15 160)" },
        ]} />
        <div className="border-t border-border pt-4">
          <EvidenceTitle label="CVR · LAST 14 DAYS" headline="4.2% → 2.3% — uniform across segments." />
          <SparkChart kind="cvr-down" />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-5">
      <EvidenceTitle label="HEALTH SNAPSHOT" headline="All metrics inside their normal bands." />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricTile label="UTILIZATION" value="0.94" vs="vs 1.00" tone="ok" />
        <MetricTile label="CPL (7D)" value="$48" vs="vs $50" tone="ok" />
        <MetricTile label="CVR (7D)" value="3.8%" vs="vs 3.5%+" tone="ok" />
        <MetricTile label="CPC TREND" value="+12%" vs="vs flat" tone="warn" />
      </div>
    </div>
  );
}

function whatIChecked(kind: Kind): string[] {
  switch (kind) {
    case "actionable-pacing":
      return [
        "Utilization vs cycle target",
        "CPL vs goal & 28-day baseline",
        "Publisher distribution (4 publishers)",
        "Change history (last 14 days)",
        "KBAS / XBAS state",
        "Smart Bidding constraint",
      ];
    case "actionable-cpl":
      return [
        "CPL trend (28d)",
        "Keyword cost concentration",
        "Match-type breakdown",
        "Quality Score",
        "Search-term sample (top 50)",
        "Conversion attribution coverage",
      ];
    case "investigate":
      return [
        "CVR by keyword (top 20)",
        "CVR by publisher",
        "Click + impression trend",
        "Change log (14d)",
        "KBAS / XBAS state",
      ];
    default:
      return [
        "Utilization vs cycle target",
        "CPL vs goal and 28d baseline",
        "Publisher distribution",
        "Change history",
        "Keyword-level performance",
      ];
  }
}
function whatsMissing(kind: Kind): string {
  if (kind === "actionable-pacing") return "No client-context note this invocation";
  if (kind === "actionable-cpl") return "Search-term report sample is 14d — broader window may surface more";
  if (kind === "investigate") return "LP analytics and tag-firing data not in evidence package";
  return "No client-context notes provided";
}

/* ---------------- Atoms ---------------- */

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
                background: i < filled ? "oklch(0.235 0.18 268)" : "oklch(0.9 0.022 80)",
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[12px] font-semibold text-foreground">{filled}/5</span>
      </div>
    </div>
  );
}

function ReasoningBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-l-2 border-[oklch(0.235_0.18_268)]/70 pl-5">
      <div className="text-[11px] font-semibold tracking-[0.14em] text-[oklch(0.235_0.18_268)]">{title}</div>
      <div className="mt-2 text-[14.5px] leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function Chips({ chips }: { chips: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((c) => (
        <span
          key={c}
          className="rounded-md px-2.5 py-1 text-[12px] font-medium text-[oklch(0.235_0.18_268)]"
          style={{ background: "oklch(0.235 0.18 268 / 0.1)" }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function MetricTile({ label, value, vs, tone }: { label: string; value: string; vs: string; tone: "ok" | "warn" }) {
  const bg = tone === "warn" ? "oklch(0.92 0.04 268)" : "oklch(0.92 0.04 268)";
  const border = tone === "warn" ? "oklch(0.9 0.022 80)" : "oklch(0.9 0.022 80)";
  return (
    <div className="cursor-pointer rounded-xl border p-4 transition-colors hover:border-[oklch(0.235_0.18_268)]/40" style={{ background: bg, borderColor: border }}>
      <div className="text-[10.5px] font-semibold tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-[24px] font-semibold text-foreground">{value}</div>
      <div className="text-[12px] text-muted-foreground">{vs}</div>
    </div>
  );
}

const HISTORY_COLORS = [
  "oklch(0.235 0.18 268)", // navy
  "oklch(0.6 0.13 200)",   // teal
  "oklch(0.58 0.19 300)",  // violet
  "oklch(0.62 0.15 160)",  // green
];

function ChangeItem({
  label,
  title,
  sub,
  ago,
  color = "oklch(0.235 0.18 268)",
  isLast,
}: {
  label: string;
  title: string;
  sub?: string;
  ago: string;
  color?: string;
  isLast?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="relative flex shrink-0 flex-col items-center">
        <span
          className="relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 bg-card"
          style={{ borderColor: color, boxShadow: `0 0 0 3px color-mix(in oklab, ${color} 16%, transparent)` }}
        />
        {!isLast && (
          <div
            className="absolute top-[12px] h-[calc(100%+1.25rem)] w-0.5"
            style={{ background: `linear-gradient(180deg, ${color}, color-mix(in oklab, ${color} 25%, transparent))` }}
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-[14px]">
            <span className="font-semibold" style={{ color }}>{label}</span>{" "}
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

function EvidenceTitle({ label, headline }: { label: string; headline: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">{label}</div>
      <h3 className="mt-1 font-display text-[16px] font-semibold">{headline}</h3>
    </div>
  );
}

function SparkChart({ kind }: { kind: "pacing" | "cpl-up" | "cvr-down" }) {
  const stroke =
    kind === "cvr-down" ? "oklch(0.38 0.16 268)" : kind === "pacing" ? "oklch(0.38 0.16 268)" : "oklch(0.235 0.18 268)";
  const fill =
    kind === "cvr-down" ? "oklch(0.38 0.16 268 / 0.12)" : kind === "pacing" ? "oklch(0.38 0.16 268 / 0.12)" : "oklch(0.235 0.18 268 / 0.12)";
  const path =
    kind === "pacing"
      ? "M 0 90 L 60 70 L 120 50 L 180 35 L 240 25 L 300 18"
      : kind === "cpl-up"
        ? "M 0 80 L 50 78 L 100 72 L 150 60 L 200 50 L 250 38 L 300 28"
        : "M 0 30 L 50 32 L 100 38 L 150 48 L 200 62 L 250 78 L 300 88";
  return (
    <div className="mt-3 rounded-xl border border-border bg-background p-4">
      <svg viewBox="0 0 300 110" className="w-full">
        <line x1="0" y1="50" x2="300" y2="50" stroke="oklch(0.9 0.022 80)" strokeDasharray="4 4" />
        <path d={`${path} L 300 110 L 0 110 Z`} fill={fill} />
        <path d={path} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="300" cy={kind === "cvr-down" ? 88 : kind === "cpl-up" ? 28 : 18} r="3.5" fill={stroke} />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>14d ago</span>
        <span>today</span>
      </div>
    </div>
  );
}

function PublisherBars({ data }: { data: Array<{ p: string; v: number; share: string; cpl: string; cvr: string; color: string }> }) {
  const total = data.reduce((a, b) => a + b.v, 0);
  return (
    <div className="mt-3">
      <div className="flex h-3.5 w-full gap-1 overflow-hidden rounded-full">
        {data.map((d) => (
          <span
            key={d.p}
            className="h-full rounded-full transition-all"
            style={{
              width: `${(d.v / total) * 100}%`,
              background: `linear-gradient(90deg, ${d.color}, color-mix(in oklab, ${d.color} 70%, white))`,
              boxShadow: `0 1px 6px -1px color-mix(in oklab, ${d.color} 55%, transparent)`,
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {data.map((d) => (
          <span key={d.p} className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
            {d.p} · <span className="font-semibold text-foreground">{d.share}</span>
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-[1.4fr_auto_auto_auto_auto] gap-x-3 gap-y-2 text-[12.5px]">
        <span className="text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">Publisher</span>
        <span className="text-right text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">7d spend</span>
        <span className="text-right text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">Share</span>
        <span className="text-right text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">CPL</span>
        <span className="text-right text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">CVR</span>
        {data.map((d) => (
          <div key={d.p} className="contents">
            <span className="flex items-center gap-2 text-foreground">
              <span className="h-2 w-2 rounded-sm" style={{ background: d.color }} />
              {d.p}
            </span>
            <span className="text-right text-foreground">${d.v.toLocaleString()}</span>
            <span className="text-right text-foreground">{d.share}</span>
            <span className="text-right text-foreground">{d.cpl}</span>
            <span className="text-right text-foreground">{d.cvr}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeywordTable() {
  const rows = [
    { kw: "hvac companies near me", match: "BROAD", spend: "$412", conv: "0", cpl: "—", bad: true },
    { kw: "heating system cost", match: "BROAD", spend: "$298", conv: "0", cpl: "—", bad: true },
    { kw: "ac unit prices", match: "BROAD", spend: "$241", conv: "0", cpl: "—", bad: true },
    { kw: "plumber near me", match: "PHRASE", spend: "$188", conv: "6", cpl: "$31", bad: false },
    { kw: "emergency plumber", match: "EXACT", spend: "$142", conv: "5", cpl: "$28", bad: false },
  ];
  return (
    <div className="mt-3">
      <div className="grid grid-cols-[1.6fr_auto_auto_auto_auto] gap-x-3 border-b border-border pb-2 text-[10.5px] font-mono uppercase tracking-widest text-muted-foreground">
        <span>Keyword</span>
        <span className="text-right">Match</span>
        <span className="text-right">Spend</span>
        <span className="text-right">Conv</span>
        <span className="text-right">CPL</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.kw}
          className={`grid cursor-pointer grid-cols-[1.6fr_auto_auto_auto_auto] gap-x-3 border-b border-border py-2.5 text-[13px] transition-colors hover:bg-muted last:border-b-0 ${
            r.bad ? "bg-[oklch(0.92_0.04_268)]" : ""
          }`}
        >
          <span className={`truncate ${r.bad ? "text-[oklch(0.235_0.18_268)]" : "text-foreground"}`}>
            {r.bad && "⚠ "}
            {r.kw}
          </span>
          <span className="text-right text-muted-foreground">{r.match}</span>
          <span className="text-right text-foreground">{r.spend}</span>
          <span className={`text-right ${r.bad ? "font-semibold text-[oklch(0.235_0.18_268)]" : "text-foreground"}`}>{r.conv}</span>
          <span className="text-right text-foreground">{r.cpl}</span>
        </div>
      ))}
    </div>
  );
}
