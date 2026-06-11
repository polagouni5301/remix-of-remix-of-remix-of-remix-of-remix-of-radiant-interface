import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function CampaignCard({ campaign, index = 0 }) {
  const tone = campaign.metric.tone;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/campaign/$id"
        params={{ id: campaign.id }}
        className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[0_12px_40px_-20px_rgba(20,23,31,0.25)]"
      >
        <div className="flex items-start justify-between">
          <div className="text-[13px] text-muted-foreground">
            <span className="text-ink-soft">#{campaign.id}</span>
            <span className="mx-2">·</span>
            <span>{campaign.vertical}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h3 className="mt-3 font-display text-[22px] font-semibold text-foreground">
          {campaign.name}
        </h3>
        <p className="mt-2 text-[14px] italic text-muted-foreground">{campaign.note}</p>
        <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
          <span className="text-[13px] text-muted-foreground">{campaign.metric.label}</span>
          <div className="flex items-baseline gap-2">
            <span
              className={`font-display text-[26px] font-semibold ${
                tone === "warning" ? "text-warning" : "text-foreground"
              }`}
            >
              {campaign.metric.value}
            </span>
            <span className="text-[13px] text-muted-foreground">{campaign.metric.vs}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
