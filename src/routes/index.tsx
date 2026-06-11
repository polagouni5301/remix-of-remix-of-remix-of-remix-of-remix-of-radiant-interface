import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, Database } from "lucide-react";
import { useState } from "react";
import { Header } from "../components/scout/Header";
import { ScoutMark } from "../components/scout/Logo";
import { CampaignCard } from "../components/scout/CampaignCard";
import { DiagnoseModal } from "../components/scout/DiagnoseModal";
import { campaigns, outcomes } from "../data/campaigns";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LocaliQ Campaign Intelligence" },
      { name: "description", content: "Scout your campaigns. Diagnose pacing, CPL, CVR and publisher mix in seconds." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(/** @type {any} */(null));

  const openModal = (campaign) => {
    setSelected(campaign);
    setOpen(true);
  };

  const handleDiagnoseSearch = () => {
    const match =
      campaigns.find((c) => c.id === query.trim()) ||
      campaigns.find((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));
    openModal(match || campaigns[0]);
  };

  const runDiagnosis = () => {
    if (!selected) return;
    setOpen(false);
    navigate({ to: "/diagnose/$id", params: { id: selected.id } });
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1280px] px-8 pb-24 pt-10">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border p-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.018 90) 0%, oklch(0.97 0.012 160) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-[340px] w-[340px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.42 0.1 160 / 0.35), transparent)",
            }}
          />
          <div className="relative flex items-start gap-6">
            <ScoutMark size={56} />
            <div className="flex-1">
              <div className="text-[11px] font-semibold tracking-[0.16em] text-primary">
                SCOUT · YOUR CAMPAIGN ANALYST
              </div>
              <h1 className="mt-3 max-w-2xl font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-foreground">
                Got a campaign on your mind? I'll do the digging.
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                Drop in any campaign you want a second pair of eyes on. I'll pull pacing,
                change history, keyword performance, publisher mix, and tracking — and
                walk you through what I'm seeing.
              </p>

              <div className="mt-7 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-[0_4px_24px_-12px_rgba(20,23,31,0.15)]">
                <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleDiagnoseSearch()}
                  placeholder="Search any campaign by name or ID — e.g. Cool-O-Mat"
                  className="flex-1 bg-transparent px-2 py-2 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={handleDiagnoseSearch}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.32_0.07_160/0.7)] transition hover:opacity-95"
                >
                  <Sparkles className="h-4 w-4" />
                  Diagnose
                </button>
              </div>
              <p className="mt-3 text-[13px] text-muted-foreground">
                You pick the campaign. I won't decide what's worth your time —{" "}
                <span className="text-foreground">you know your book best.</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* LIST + SIDEBAR */}
        <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-display text-[26px] font-semibold tracking-tight">
              A few campaigns you might want to look at
            </h2>
            <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
              Ordered by how long since each was last touched — not by severity. Scout is
              still learning how you prioritize, so treat these as a glance, not a queue.
              You always know what's worth your time.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {campaigns.map((c, i) => (
                <CampaignCard key={c.id} campaign={c} index={i} onClick={openModal} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-start gap-4 rounded-2xl border border-dashed border-border bg-secondary/50 p-5"
            >
              <Search className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <p className="text-[14px] text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Looking for a different campaign?
                </span>{" "}
                Use the search above — you can run a check on anything in your book. Scout
                has no opinions about which ones deserve your time.
              </p>
            </motion.div>
          </div>

          <aside>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="sticky top-24 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                  OUTCOMES FROM LAST WEEK
                </span>
                <button className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:opacity-80">
                  See all <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <h3 className="mt-1 font-display text-[20px] font-semibold tracking-tight">
                What your last actions did
              </h3>

              <ul className="mt-5 space-y-5">
                {outcomes.map((o) => (
                  <li
                    key={o.account}
                    className="border-t border-border pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-foreground">{o.account}</span>
                      <span className="text-[12px] text-muted-foreground">{o.ago}</span>
                    </div>
                    <p className="mt-1 text-[13px] text-muted-foreground">{o.action}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-[13px] font-semibold ${
                          o.tone === "success" ? "text-success" : "text-foreground"
                        }`}
                      >
                        {o.result}
                      </span>
                      {o.badge && (
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground">
                          {o.badge}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
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
