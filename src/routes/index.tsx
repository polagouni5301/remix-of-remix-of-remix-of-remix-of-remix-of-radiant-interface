import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  ArrowUpRight,
  Filter,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  LayoutGrid,
  Rows3,
  Database,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Header } from "../components/scout/Header";
import { DiagnoseModal } from "../components/scout/DiagnoseModal";
import { campaigns as baseCampaigns, outcomes } from "../data/campaigns";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workspace · Scout" },
      {
        name: "description",
        content:
          "Your campaign workspace. Pick anything you want a second pair of eyes on — Scout will diagnose it in seconds.",
      },
    ],
  }),
  component: Home,
});

const FILTERS = ["All", "Needs a look", "Pacing", "CPL", "Wins"] as const;
type Filter = (typeof FILTERS)[number];

function toneOf(c: any): "success" | "warning" | "neutral" {
  return c.metric.tone as any;
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const openModal = (c: any) => {
    setSelected(c);
    setOpen(true);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return baseCampaigns.filter((c) => {
      if (q && !(c.name.toLowerCase().includes(q) || c.id.includes(q))) return false;
      if (filter === "Needs a look") return toneOf(c) === "warning";
      if (filter === "Wins") return toneOf(c) === "success";
      if (filter === "Pacing")
        return (
          c.metric.label.toLowerCase().includes("util") ||
          c.metric.label.toLowerCase().includes("imp")
        );
      if (filter === "CPL") return c.metric.label.toLowerCase().includes("cpl");
      return true;
    });
  }, [query, filter]);

  const handleSearch = () => {
    const match =
      baseCampaigns.find((c) => c.id === query.trim()) ||
      baseCampaigns.find((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase()),
      );
    openModal(match || baseCampaigns[0]);
  };

  const runDiagnosis = () => {
    if (!selected) return;
    setOpen(false);
    navigate({ to: "/diagnose/$id", params: { id: selected.id } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1320px] px-6 pb-24 pt-12 md:px-10">
        {/* GREETING — editorial */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-primary">Workspace</span>
            <span className="h-px w-10 bg-border" />
            <span>Tuesday · 09:14 PT</span>
          </div>

          <div className="mt-5 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.5fr_1fr]">
            <h1 className="font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[0.98] tracking-tight">
              <span className="block text-muted-foreground/70">Good morning,</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-[oklch(0.6_0.2_38)] to-[oklch(0.72_0.2_55)] bg-clip-text text-transparent">
                  Jordan.
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 10"
                  className="absolute -bottom-1 left-0 w-full"
                >
                  <path
                    d="M2 6 Q 50 1 100 4 T 198 4"
                    stroke="oklch(0.62 0.2 38)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.45"
                  />
                </svg>
              </span>
            </h1>

            <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground lg:text-right">
              Six campaigns are in your book today. Scout has already done a
              quiet pass — pick whichever one is on your mind and dig in.
            </p>
          </div>
        </motion.section>

        {/* SEARCH */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-border p-6 md:p-8"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.97 0.04 55) 0%, oklch(0.95 0.07 35) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-[300px] w-[300px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.62 0.2 35 / 0.45), transparent)",
            }}
          />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                <Sparkles className="h-3 w-3" /> Scout · campaign analyst
              </div>
              <h2 className="mt-3 font-display text-[24px] font-semibold tracking-tight md:text-[28px]">
                Got a campaign on your mind?{" "}
                <span className="text-muted-foreground">I'll do the digging.</span>
              </h2>
            </div>
            <div className="flex w-full items-center gap-2 rounded-full border border-border bg-card p-2 shadow-[0_4px_24px_-12px_rgba(20,23,31,0.15)] md:w-[460px]">
              <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by name or ID — e.g. Cool-O-Mat or 5212017"
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.52_0.19_28/0.7)] hover:opacity-95"
              >
                <Sparkles className="h-3.5 w-3.5" /> Diagnose
              </button>
            </div>
          </div>
        </motion.section>

        {/* TOOLBAR + GRID */}
        <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-[22px] font-semibold tracking-tight">
                  Your book — {filtered.length} of {baseCampaigns.length}
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Sorted by how long since you last touched them. Treat this as
                  a glance, not a queue.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-3 py-1 text-[12px] font-medium transition ${
                        filter === f
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex items-center rounded-full border border-border bg-card p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`grid h-7 w-7 place-items-center rounded-full ${
                      view === "grid"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`grid h-7 w-7 place-items-center rounded-full ${
                      view === "list"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground"
                    }`}
                    aria-label="List view"
                  >
                    <Rows3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {view === "grid" && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c, i) => {
                  const tone = toneOf(c);
                  const toneClasses =
                    tone === "warning"
                      ? "bg-[oklch(0.97_0.05_60)] text-[oklch(0.5_0.16_45)] border-[oklch(0.85_0.1_55)]"
                      : tone === "success"
                        ? "bg-[oklch(0.96_0.05_155)] text-[oklch(0.4_0.12_155)] border-[oklch(0.85_0.08_155)]"
                        : "bg-secondary text-muted-foreground border-border";
                  const Trend =
                    tone === "warning" ? TrendingDown : tone === "success" ? TrendingUp : Activity;
                  return (
                    <motion.button
                      type="button"
                      key={c.id}
                      onClick={() => openModal(c)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_44px_-22px_oklch(0.4_0.15_25/0.35)]"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-[oklch(0.72_0.2_55)] transition-transform duration-500 group-hover:scale-x-100"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest text-muted-foreground">
                            {c.vertical}
                          </span>
                          <span className="text-[11px] font-mono text-muted-foreground">
                            #{c.id}
                          </span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>

                      <h3 className="mt-4 font-display text-[20px] font-semibold tracking-tight">
                        {c.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                        {c.note}
                      </p>

                      <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                            {c.metric.label}
                          </div>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span
                              className={`font-display text-[26px] font-semibold leading-none ${
                                tone === "warning"
                                  ? "text-[oklch(0.55_0.18_38)]"
                                  : tone === "success"
                                    ? "text-[oklch(0.5_0.13_155)]"
                                    : "text-foreground"
                              }`}
                            >
                              {c.metric.value}
                            </span>
                            <span className="text-[12px] text-muted-foreground">
                              {c.metric.vs}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium ${toneClasses}`}
                        >
                          <Trend className="h-3 w-3" />
                          {tone === "warning" ? "Drift" : tone === "success" ? "Lift" : "Stable"}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Last touched {c.lastActionDays}d ago
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {view === "list" && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-4 border-b border-border bg-secondary/50 px-5 py-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span>Campaign</span>
                  <span>Metric</span>
                  <span>Last touched</span>
                  <span />
                </div>
                {filtered.map((c, i) => {
                  const tone = toneOf(c);
                  return (
                    <motion.button
                      key={c.id}
                      onClick={() => openModal(c)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="grid w-full grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-4 border-b border-border px-5 py-4 text-left transition last:border-b-0 hover:bg-secondary/40"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-display text-[15px] font-semibold">
                          {c.name}
                        </div>
                        <div className="mt-0.5 text-[12px] text-muted-foreground">
                          {c.vertical} · #{c.id}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                          {c.metric.label}
                        </div>
                        <div
                          className={`mt-0.5 font-display text-[16px] font-semibold ${
                            tone === "warning"
                              ? "text-[oklch(0.55_0.18_38)]"
                              : tone === "success"
                                ? "text-[oklch(0.5_0.13_155)]"
                                : "text-foreground"
                          }`}
                        >
                          {c.metric.value}{" "}
                          <span className="text-[12px] font-normal text-muted-foreground">
                            {c.metric.vs}
                          </span>
                        </div>
                      </div>
                      <div className="text-[13px] text-muted-foreground">
                        {c.lastActionDays} days ago
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </motion.button>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/40 p-10 text-center">
                <Filter className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-3 text-[14px] text-muted-foreground">
                  Nothing matches that filter. Try another slice.
                </p>
              </div>
            )}

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-5">
              <Search className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <p className="text-[14px] text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Looking for a campaign that isn't here?
                </span>{" "}
                Use the search above — Scout can run a diagnosis on anything in
                your book. You always pick what's worth your time.
              </p>
            </div>
          </div>

          {/* SIDEBAR — recent outcomes */}
          <aside>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="sticky top-24 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                  Last week's actions
                </span>
                <button className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:opacity-80">
                  See all <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
              <h3 className="mt-2 font-display text-[19px] font-semibold tracking-tight">
                What your decisions did
              </h3>

              <ul className="mt-5 space-y-5">
                {outcomes.map((o) => (
                  <li
                    key={o.account}
                    className="border-t border-border pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-[14px] font-semibold text-foreground">
                        {o.account}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {o.ago}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {o.action}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-[13px] font-semibold ${
                          o.tone === "success"
                            ? "text-[oklch(0.5_0.13_155)]"
                            : "text-foreground"
                        }`}
                      >
                        {o.result}
                      </span>
                      {o.badge && (
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground">
                          {o.badge}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary">
                  <Sparkles className="h-3 w-3" /> Scout suggests
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground">
                  Two HVAC campaigns share the same drifting negative-keyword
                  list. Want me to diagnose them as a group?
                </p>
                <button className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:underline">
                  Run group diagnosis <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          </aside>
        </section>
      </main>

      <div className="fixed bottom-5 left-5 z-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[12px] font-medium text-background shadow-lg">
          <Database className="h-3.5 w-3.5 text-warning" />
          Mock API · 10 endpoints
        </div>
      </div>

      <DiagnoseModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={runDiagnosis}
        campaignName={selected?.name || ""}
      />
    </div>
  );
}