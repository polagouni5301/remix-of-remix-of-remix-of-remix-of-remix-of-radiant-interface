import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Copy } from "lucide-react";
import { Button } from "../components/ui/button";
import { Header } from "../components/scout/Header";
import { getCampaign } from "../data/campaigns";
import { ScoutMark } from "@/components/scout/Logo";

const OBSERVATIONS = [
  {
    offset: "+1 DAY",
    text: "Confirm spend rate has dropped below 1.20 utilization.",
  },
  {
    offset: "+3 DAYS",
    text: "Watch for spend migrating to a different publisher in WPCID mix.",
  },
  {
    offset: "+7 DAYS",
    text: "Verify projected end-of-cycle spend is within target band; CPL stable.",
  },
];

export const Route = createFileRoute("/observation-schedule/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Observation Schedule - ${params.id} - LocaliQ` }],
  }),
  loader: ({ params }) => {
    const campaign = getCampaign(params.id);
    if (!campaign) throw notFound();
    return campaign;
  },
  component: ObservationSchedulePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-muted-foreground">
      Campaign not found.
    </div>
  ),
});

function ObservationSchedulePage() {
  const { id } = useParams({ from: "/observation-schedule/$id" });
  const campaign = getCampaign(id);

  if (!campaign) return null;

  return (
    <div className="min-h-screen text-foreground bg-page-schedule">
      <Header />
      <main className="mx-auto max-w-[1280px] px-8 pb-24 pt-8">
        {/* Crumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted-foreground">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-foreground transition hover:text-[oklch(0.235_0.18_268)]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to campaigns
            </Link>
            <span>·</span>
            <span className="font-mono">#{campaign.id}</span>
            <span>·</span>
            <span className="truncate font-semibold text-foreground">{campaign.name}</span>
          </div>
          <span className="font-mono text-[11.5px] uppercase tracking-[0.14em]">
            data through yesterday EOD
          </span>
        </div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 overflow-hidden rounded-3xl border border-border p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(1 0 0) 0%, oklch(0.94 0.05 45) 60%, oklch(0.94 0.05 45) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.665 0.215 36 / 0.55), transparent)",
            }}
          />
          <div className="relative flex items-start gap-6">
           <div  className="-ml-7 mr-3 shrink-0">
                    <ScoutMark size={100} />
                  </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.26em] text-[oklch(0.38_0.16_268)]">
                Observation schedule
              </p>
              <h1 className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-semibold leading-[1.02] tracking-tight text-foreground">
                Here's what I'll check on this campaign.
              </h1>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-muted-foreground">
                These are commitments to look, not predictions of outcomes. If a check comes
                back differently than I'd expect, I'll surface it back here with what's
                different.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Observations Content */}
        <section className="mt-8 grid grid-cols-1 gap-8 ">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              What I&apos;ll observe
            </div>

            <div className="mt-6 space-y-4">
              {OBSERVATIONS.map((item) => (
                <div
                  key={item.offset}
                  className="cursor-pointer rounded-xl border border-border bg-background p-5 transition-colors hover:border-[oklch(0.235_0.18_268)]/40"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                    <div className="inline-flex min-w-0 shrink-0 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-[oklch(0.38_0.16_268)] sm:w-[110px]">
                      <span className="h-2 w-2 rounded-full bg-[oklch(0.235_0.18_268)]" />
                      {item.offset}
                    </div>
                    <p className="text-[15px] leading-[1.55] text-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-dashed border-border bg-secondary/30 p-5">
              <p className="text-[13.5px] leading-[1.7] text-muted-foreground">
                <span className="font-semibold text-foreground">Why no forecast?</span> Predicted
                metric values and dollar impacts aren&apos;t in MVP. They need calibrated outcome
                data we don&apos;t have yet. Once enough +7d observations accumulate per action
                type, forecasts can be derived empirically. Until then, Scout commits to what
                it&apos;ll check.
              </p>
            </div>
          </motion.div>

          
        </section>
      </main>
    </div>
  );
}
