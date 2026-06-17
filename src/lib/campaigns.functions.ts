import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getCampaigns = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("campaigns")
      .select("*")
      .order("last_action_days", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  });

export const getCampaignByExternalId = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ externalId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: campaign, error } = await supabaseAdmin
      .from("campaigns")
      .select("*")
      .eq("external_id", data.externalId)
      .single();

    if (error) throw new Error(error.message);
    return campaign;
  });

export const getOutcomes = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("outcomes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw new Error(error.message);
    return data || [];
  });

export const seedCampaigns = createServerFn({ method: "POST" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const campaignsData = [
      {
        external_id: "5212017",
        vertical: "Plumbing",
        name: "Acme Plumbing",
        note: "Hasn't been checked in 11 days — probably fine, easy to confirm.",
        metric_label: "CPL (7d)",
        metric_value: "$48",
        metric_vs: "vs $50",
        metric_tone: "neutral",
        last_action_days: 11,
      },
      {
        external_id: "7720915",
        vertical: "Roofing",
        name: "Acme Roofing Co.",
        note: "Conversion rate stepped down across the board.",
        metric_label: "CVR (7d)",
        metric_value: "2.3%",
        metric_vs: "vs 4.2%",
        metric_tone: "warning",
        last_action_days: 9,
      },
      {
        external_id: "3140833",
        vertical: "HVAC",
        name: "Cool-O-Matic",
        note: "Pacing has drifted past 1.20 in the last 48 hours.",
        metric_label: "Utilization",
        metric_value: "1.35",
        metric_vs: "vs 1.00",
        metric_tone: "warning",
        last_action_days: 6,
      },
      {
        external_id: "4881204",
        vertical: "Plumbing",
        name: "Mountain View Plumbing",
        note: "CPL has been trending up against goal for a week.",
        metric_label: "CPL (7d)",
        metric_value: "$57",
        metric_vs: "vs $45",
        metric_tone: "warning",
        last_action_days: 4,
      },
      {
        external_id: "6620331",
        vertical: "Dental",
        name: "Bright Smile Dental",
        note: "Brand search is flat — non-brand keywords are losing share.",
        metric_label: "Imp Share",
        metric_value: "61%",
        metric_vs: "vs 78%",
        metric_tone: "warning",
        last_action_days: 13,
      },
      {
        external_id: "9013477",
        vertical: "Legal",
        name: "Harbor & Vale Attorneys",
        note: "Strong week — conversions doubled after the LP swap.",
        metric_label: "Conv (7d)",
        metric_value: "42",
        metric_vs: "vs 21",
        metric_tone: "success",
        last_action_days: 2,
      },
    ];

    const { error } = await supabaseAdmin.from("campaigns").upsert(campaignsData, {
      onConflict: "external_id",
    });

    if (error) throw new Error(error.message);

    const outcomesData = [
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

    const { error: outcomesError } = await supabaseAdmin.from("outcomes").upsert(outcomesData, {
      onConflict: "id",
    });

    if (outcomesError) throw new Error(outcomesError.message);

    return { seeded: true, campaigns: campaignsData.length, outcomes: outcomesData.length };
  });
