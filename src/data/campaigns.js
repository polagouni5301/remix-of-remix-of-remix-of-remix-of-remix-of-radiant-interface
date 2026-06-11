export const campaigns = [
  {
    id: "5212017",
    vertical: "Plumbing",
    name: "Acme Plumbing",
    note: "Hasn't been checked in 11 days — probably fine, easy to confirm.",
    metric: { label: "CPL (7d)", value: "$48", vs: "vs $50", tone: "neutral" },
    lastActionDays: 11,
  },
  {
    id: "7720915",
    vertical: "Roofing",
    name: "Acme Roofing Co.",
    note: "Conversion rate stepped down across the board.",
    metric: { label: "CVR (7d)", value: "2.3%", vs: "vs 4.2%", tone: "warning" },
    lastActionDays: 9,
  },
  {
    id: "3140833",
    vertical: "HVAC",
    name: "Cool-O-Matic",
    note: "Pacing has drifted past 1.20 in the last 48 hours.",
    metric: { label: "Utilization", value: "1.35", vs: "vs 1.00", tone: "warning" },
    lastActionDays: 6,
  },
  {
    id: "4881204",
    vertical: "Plumbing",
    name: "Mountain View Plumbing",
    note: "CPL has been trending up against goal for a week.",
    metric: { label: "CPL (7d)", value: "$57", vs: "vs $45", tone: "warning" },
    lastActionDays: 4,
  },
];

export const outcomes = [
  {
    account: "Riverside HVAC",
    ago: "11d ago",
    action: "Added 'cost' negative",
    result: "+7d: CPL −$9.40 ✓",
    tone: "success",
  },
  {
    account: "Coastal Auto",
    ago: "6d ago",
    action: "Reduced WPCID 12345 to $48",
    result: "+7d: pacing 1.02 ✓",
    tone: "success",
  },
  {
    account: "Hilltop Dental",
    ago: "4d ago",
    action: "Investigated tracking",
    result: "You followed up · pixel fixed",
    tone: "neutral",
    badge: "SELF-REPORTED",
  },
];

export function getCampaign(id) {
  return campaigns.find((c) => c.id === id);
}
