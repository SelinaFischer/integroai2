-- Create table to track login attempts for rate limiting
CREATE TABLE public.admin_login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  success BOOLEAN NOT NULL DEFAULT false
);

-- Index for fast IP lookup
CREATE INDEX idx_admin_login_attempts_ip_time ON public.admin_login_attempts(ip_address, attempted_at);

-- Enable RLS
ALTER TABLE public.admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- Allow edge functions to insert/read (using service role)
CREATE POLICY "Service role can manage login attempts" 
ON public.admin_login_attempts 
FOR ALL
USING (true)
WITH CHECK (true);

-- Auto-cleanup old attempts (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_login_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.admin_login_attempts 
  WHERE attempted_at < now() - interval '1 hour';
END;
$$;