-- Create trigger function to start opportunity nurture sequence
CREATE OR REPLACE FUNCTION public.start_opportunity_drip_sequence()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only start for opportunity leads
  IF NEW.lead_type = 'opportunity' THEN
    INSERT INTO public.drip_sequences (lead_id, sequence_type, next_send_at)
    VALUES (NEW.id, 'opportunity_nurture', now() + INTERVAL '1 hour')
    ON CONFLICT (lead_id, sequence_type) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-start opportunity sequence on new lead
DROP TRIGGER IF EXISTS start_opportunity_drip_on_new_lead ON public.leads;
CREATE TRIGGER start_opportunity_drip_on_new_lead
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.start_opportunity_drip_sequence();