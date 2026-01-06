-- Drop the security definer view and recreate as regular view
DROP VIEW IF EXISTS public.chat_usage_summary;

CREATE VIEW public.chat_usage_summary AS
SELECT 
  date,
  COUNT(*) as total_requests,
  SUM(input_messages) as total_input_messages,
  DATE_TRUNC('month', date)::DATE as month
FROM public.chat_usage
GROUP BY date
ORDER BY date DESC;