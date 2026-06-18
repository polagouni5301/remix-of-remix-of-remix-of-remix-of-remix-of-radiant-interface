import { useNavigate } from "react-router-dom";
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
  CheckCircle2,
  AlertTriangle,
  LayoutGrid,
  Rows3,
  Database,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Header } from "../components/scout/Header";
import { campaigns as mockCampaigns, outcomes as mockOutcomes } from "../data/campaigns";
import { DiagnoseModal } from "../components/scout/DiagnoseModal";
import { useAuth } from "../lib/auth-context";

const FILTERS = ["All", "Needs a look", "Pacing", "CPL", "Wins"];

function toneOf(c) { return c.metric ? c.metric.tone : "neutral"; }

export default function Home() {
  const navigate = useNavigate();
  const user = {}; const authLoading = false;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid");



  const dbCampaigns = mockCampaigns; const campaignsLoading = false; const campaigns = dbCampaigns;

  const dbOutcomes = mockOutcomes;



  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user]);

  const openModal = (c) => {
    setSelected(c);
    setOpen(true);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (campaigns || []).filter((c) => {
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
  }, [query, filter, campaigns]);

  const handleSearch = () => {
    const match =
      campaigns.find((c) => c.id === query.trim()) ||
      campaigns.find((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));
    openModal(match || campaigns[0]);
  };

  const runDiagnosis = () => {
    if (!selected) return;
    setOpen(false);
    navigate(`/diagnose/${selected.id}`);
  };

  const counts = {
    total: campaigns.length,
    warning: (campaigns || []).filter((c) => toneOf(c) === "warning").length,
    success: (campaigns || []).filter((c) => toneOf(c) === "success").length,
  };

  const userName = user?.email ? user.email.split("@")[0] : "Jordan";

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Top gradient banner only — body stays clean white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px]"
        style={{ background: "var(--grad-home-banner)" }}
      />

      <Header />

      <main className="relative z-10 mx-auto max-w-[1320px] px-8 pb-24 pt-10">
        {/* WORKSPACE STRIP */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {/* Decorative backdrop behind greeting */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute -left-10 -top-10 h-[280px] w-[280px] rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.94 0.05 45 / 0.55), transparent)",
              }}
            />

            <div
              className="absolute right-0 top-6 h-[220px] w-[420px] rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(closest-side, oklch(0.78 0.13 40 / 0.4), transparent)",
              }}
            />

            <svg className="absolute left-0 top-0 h-full w-full opacity-[0.07]" aria-hidden>
              <defs>
                <pattern id="dotGrid" width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="oklch(0.235 0.18 268)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotGrid)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 items-end gap-6">
            <h1 className="font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[0.98] tracking-tight">
              <span className="block text-muted-foreground/70">Good morning,</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[oklch(0.235_0.18_268)] via-[oklch(0.38_0.16_268)] to-[oklch(0.235_0.18_268)] bg-clip-text text-transparent">
                  {userName.charAt(0).toUpperCase() + userName.slice(1)}.
                </span>
                <svg aria-hidden viewBox="0 0 200 10" className="absolute -bottom-1 left-0 w-full">
                  <path
                    d="M2 6 Q 50 1 100 4 T 198 4"
                    stroke="oklch(0.235 0.18 268)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.45"
                  />
                </svg>
              </span>
            </h1>
          </div>
        </motion.section>

        {/* SEARCH */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative mt-8 overflow-hidden rounded-3xl border border-border p-6 md:p-8"
          style={{
            background: "linear-gradient(120deg, oklch(1 0 0) 0%, oklch(0.94 0.05 45) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-[300px] w-[300px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.665 0.215 36 / 0.45), transparent)",
            }}
          />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.235_0.18_268_/_0.2)] bg-card/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.235_0.18_268)]">
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
                className="flex-1 bg-transparent px-2 py-2 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />

              <button
                onClick={handleSearch}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.665_0.215_36/0.7)] hover:opacity-95"
              >
                <Sparkles className="h-3.5 w-3.5" /> Diagnose
              </button>
            </div>
          </div>
        </motion.section>

        {/* TOOLBAR */}
        <section className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-[22px] font-semibold tracking-tight">
                  A few campaigns you might want to look at
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Ordered by how long since each was last touched not by severity. Scout is still
                  learning how you prioritize, so treat these as a glance, not a queue. You always
                  know what's worth your time.
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
                      view === "grid" ? "bg-foreground text-background" : "text-muted-foreground"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`grid h-7 w-7 place-items-center rounded-full ${
                      view === "list" ? "bg-foreground text-background" : "text-muted-foreground"
                    }`}
                    aria-label="List view"
                  >
                    <Rows3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* GRID VIEW */}
            {view === "grid" && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c, i) => {
                  const tone = toneOf(c);
                  const toneClasses =
                    tone === "warning"
                      ? "bg-[oklch(0.92_0.04_268)] text-[oklch(0.235_0.18_268)] border-[oklch(0.85_0.04_268)]"
                      : tone === "success"
                        ? "bg-[oklch(0.95_0.03_165)] text-[oklch(0.4_0.12_165)] border-[oklch(0.88_0.04_165)]"
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
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-0.5 hover:border-[oklch(0.235_0.18_268)]/40 hover:shadow-[0_18px_44px_-22px_oklch(0.235_0.18_268/0.35)]"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-[oklch(0.78_0.13_40)] transition-transform duration-500 group-hover:scale-x-100"
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
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[oklch(0.235_0.18_268)]" />
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
                                  ? "text-[oklch(0.235_0.18_268)]"
                                  : tone === "success"
                                    ? "text-[oklch(0.4_0.12_165)]"
                                    : "text-foreground"
                              }`}
                            >
                              {c.metric.value}
                            </span>
                            <span className="text-[12px] text-muted-foreground">{c.metric.vs}</span>
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

            {/* LIST VIEW */}
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
                      className="grid w-full grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-4 border-b border-border px-5 py-4 text-left transition hover:bg-secondary/40 last:border-b-0"
                    >
                      <div>
                        <div className="font-display text-[15px] font-semibold">{c.name}</div>
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
                              ? "text-[oklch(0.235_0.18_268)]"
                              : tone === "success"
                                ? "text-[oklch(0.4_0.12_165)]"
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

            {filtered.length === 0 && !campaignsLoading && (
              <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
                <Database className="h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-[15px] font-medium text-foreground">No campaigns found</p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Try adjusting your search or filter.
                </p>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Scout suggests
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.92_0.04_268)] px-2 py-0.5 text-[11px] font-medium text-[oklch(0.235_0.18_268)]">
                  <Sparkles className="h-3 w-3" /> {counts.warning} actions
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {campaigns
                  .filter((c) => toneOf(c) === "warning")
                  .slice(0, 4)
                  .map((c) => (
                    <li key={c.id} className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.235_0.18_268)]" />
                      <div>
                        <button
                          onClick={() => openModal(c)}
                          className="text-left text-[13px] font-medium text-foreground hover:underline"
                        >
                          {c.name}
                        </button>
                        <p className="text-[12px] text-muted-foreground">{c.note}</p>
                      </div>
                    </li>
                  ))}
                {(campaigns || []).filter((c) => toneOf(c) === "warning").length === 0 && (
                  <li className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[oklch(0.4_0.12_165)]" />
                    All campaigns look healthy.
                  </li>
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Recent outcomes
                </h3>
                <button className="text-[11px] font-medium text-primary hover:underline">
                  View all
                </button>
              </div>
              <ul className="mt-4 space-y-3">
                {(dbOutcomes || []).map((o) => (
                  <li
                    key={o.id}
                    className="rounded-xl border border-border p-3 transition hover:bg-secondary/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-foreground">{o.account}</span>
                      <span className="text-[11px] text-muted-foreground">{o.ago}</span>
                    </div>
                    <p className="mt-1 text-[12px] text-muted-foreground">{o.action}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                          o.tone === "success"
                            ? "bg-[oklch(0.95_0.03_165)] text-[oklch(0.4_0.12_165)] border-[oklch(0.88_0.04_165)]"
                            : o.tone === "warning"
                              ? "bg-[oklch(0.92_0.04_268)] text-[oklch(0.235_0.18_268)] border-[oklch(0.85_0.04_268)]"
                              : "bg-secondary text-muted-foreground border-border"
                        }`}
                      >
                        {o.tone === "success" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : o.tone === "warning" ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : (
                          <Activity className="h-3 w-3" />
                        )}
                        {o.result}
                      </span>
                      {o.badge && (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          {o.badge}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
                {dbOutcomes.length === 0 && (
                  <li className="text-[13px] text-muted-foreground">No outcomes yet.</li>
                )}
              </ul>
            </motion.div>
          </aside>
        </section>
      </main>

      <DiagnoseModal
        open={open}
        onClose={() => setOpen(false)}
        campaignName={selected?.name || ""}
        onSubmit={() => runDiagnosis()}
      />
      <DiagnoseModal
        open={open}
        onClose={() => setOpen(false)}
        campaignName={selected?.name || ""}
        onSubmit={() => runDiagnosis()}
      />
    </div>
  );
}
