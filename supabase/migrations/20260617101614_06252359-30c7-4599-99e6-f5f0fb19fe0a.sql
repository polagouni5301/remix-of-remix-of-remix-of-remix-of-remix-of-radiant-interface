CREATE TABLE public.campaigns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id text NOT NULL UNIQUE,
    vertical text NOT NULL,
    name text NOT NULL,
    note text NOT NULL,
    metric_label text NOT NULL,
    metric_value text NOT NULL,
    metric_vs text NOT NULL,
    metric_tone text NOT NULL CHECK (metric_tone IN ('success', 'warning', 'neutral')),
    last_action_days integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaigns TO authenticated;
GRANT ALL ON public.campaigns TO service_role;

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users"
ON public.campaigns
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE TABLE public.outcomes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    account text NOT NULL,
    ago text NOT NULL,
    action text NOT NULL,
    result text NOT NULL,
    tone text NOT NULL CHECK (tone IN ('success', 'warning', 'neutral')),
    badge text,
    created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.outcomes TO authenticated;
GRANT ALL ON public.outcomes TO service_role;

ALTER TABLE public.outcomes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users"
ON public.outcomes
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();