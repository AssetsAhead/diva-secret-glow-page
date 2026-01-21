-- Create drip sequences tracking table
CREATE TABLE public.drip_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  sequence_type TEXT NOT NULL CHECK (sequence_type IN ('customer_welcome', 'opportunity_nurture')),
  current_step INTEGER NOT NULL DEFAULT 1,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_sent_at TIMESTAMPTZ,
  next_send_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'unsubscribed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(lead_id, sequence_type)
);

-- Enable RLS
ALTER TABLE public.drip_sequences ENABLE ROW LEVEL SECURITY;

-- Block public access (only service role can manage)
CREATE POLICY "drip_sequences_block_public_select" ON public.drip_sequences
  FOR SELECT USING (false);
CREATE POLICY "drip_sequences_block_public_insert" ON public.drip_sequences
  FOR INSERT WITH CHECK (false);
CREATE POLICY "drip_sequences_block_public_update" ON public.drip_sequences
  FOR UPDATE USING (false);
CREATE POLICY "drip_sequences_block_public_delete" ON public.drip_sequences
  FOR DELETE USING (false);

-- Admin policy for service role
CREATE POLICY "drip_sequences_admin_all" ON public.drip_sequences
  FOR ALL USING (true);

-- Create index for efficient queries
CREATE INDEX idx_drip_sequences_next_send ON public.drip_sequences(next_send_at) 
  WHERE status = 'active' AND completed_at IS NULL;

CREATE INDEX idx_drip_sequences_lead ON public.drip_sequences(lead_id);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_drip_sequences_updated_at
  BEFORE UPDATE ON public.drip_sequences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically start drip sequence for new customers
CREATE OR REPLACE FUNCTION public.start_customer_drip_sequence()
RETURNS TRIGGER AS $$
BEGIN
  -- Only start for customer leads
  IF NEW.lead_type = 'customer' THEN
    INSERT INTO public.drip_sequences (lead_id, sequence_type, next_send_at)
    VALUES (NEW.id, 'customer_welcome', now() + INTERVAL '1 hour')
    ON CONFLICT (lead_id, sequence_type) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to start drip when new customer lead is created
CREATE TRIGGER start_drip_on_new_customer
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.start_customer_drip_sequence();