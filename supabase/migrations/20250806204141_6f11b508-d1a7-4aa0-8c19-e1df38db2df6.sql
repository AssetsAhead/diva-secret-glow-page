-- Fix security warnings by setting search_path for functions
DROP FUNCTION IF EXISTS public.generate_order_number();
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
BEGIN
  SELECT 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD((EXTRACT(EPOCH FROM NOW())::INTEGER % 10000)::TEXT, 4, '0')
  INTO new_number;
  RETURN new_number;
END;
$$;

DROP FUNCTION IF EXISTS public.set_order_number();
CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number = generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;