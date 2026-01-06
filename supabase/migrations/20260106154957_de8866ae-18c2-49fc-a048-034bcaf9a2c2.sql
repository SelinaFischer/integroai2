-- Create table to track chatbot usage
CREATE TABLE public.chat_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  input_messages INTEGER NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Create index for fast date-based queries
CREATE INDEX idx_chat_usage_date ON public.chat_usage(date);

-- Enable RLS
ALTER TABLE public.chat_usage ENABLE ROW LEVEL SECURITY;

-- Allow edge functions to insert (using service role)
CREATE POLICY "Service role can insert usage" 
ON public.chat_usage 
FOR INSERT 
WITH CHECK (true);

-- Allow reading usage stats (for admin dashboard later)
CREATE POLICY "Anyone can read usage stats" 
ON public.chat_usage 
FOR SELECT 
USING (true);

-- Create a view for daily/monthly aggregates
CREATE OR REPLACE VIEW public.chat_usage_summary AS
SELECT 
  date,
  COUNT(*) as total_requests,
  SUM(input_messages) as total_input_messages,
  DATE_TRUNC('month', date)::DATE as month
FROM public.chat_usage
GROUP BY date
ORDER BY date DESC;