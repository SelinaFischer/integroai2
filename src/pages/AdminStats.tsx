import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { MessageSquare, TrendingUp, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DailyUsage {
  date: string;
  total_requests: number;
  total_input_messages: number;
}

interface MonthlyUsage {
  month: string;
  total_requests: number;
  total_input_messages: number;
}

export default function AdminStats() {
  const [dailyData, setDailyData] = useState<DailyUsage[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ requests: 0, messages: 0 });

  useEffect(() => {
    async function fetchUsageData() {
      try {
        // Fetch daily usage (last 30 days)
        const { data: daily, error: dailyError } = await supabase
          .from("chat_usage")
          .select("date, input_messages")
          .order("date", { ascending: false })
          .limit(1000);

        if (dailyError) {
          console.error("Error fetching daily data:", dailyError);
        }

        if (daily) {
          // Aggregate by date
          const dateMap = new Map<string, { requests: number; messages: number }>();
          
          daily.forEach((row) => {
            const dateStr = row.date;
            const existing = dateMap.get(dateStr) || { requests: 0, messages: 0 };
            dateMap.set(dateStr, {
              requests: existing.requests + 1,
              messages: existing.messages + (row.input_messages || 0),
            });
          });

          const aggregatedDaily = Array.from(dateMap.entries())
            .map(([date, stats]) => ({
              date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              total_requests: stats.requests,
              total_input_messages: stats.messages,
            }))
            .reverse()
            .slice(-14); // Last 14 days

          setDailyData(aggregatedDaily);

          // Aggregate by month
          const monthMap = new Map<string, { requests: number; messages: number }>();
          
          daily.forEach((row) => {
            const date = new Date(row.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            const existing = monthMap.get(monthKey) || { requests: 0, messages: 0 };
            monthMap.set(monthKey, {
              requests: existing.requests + 1,
              messages: existing.messages + (row.input_messages || 0),
            });
          });

          const aggregatedMonthly = Array.from(monthMap.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, stats]) => ({
              month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }),
              total_requests: stats.requests,
              total_input_messages: stats.messages,
            }));

          setMonthlyData(aggregatedMonthly);

          // Calculate totals
          const totalRequests = daily.length;
          const totalMessages = daily.reduce((sum, row) => sum + (row.input_messages || 0), 0);
          setTotals({ requests: totalRequests, messages: totalMessages });
        }
      } catch (e) {
        console.error("Failed to fetch usage data:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchUsageData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Chat Usage Stats | IntegroAI Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chat Usage Statistics</h1>
              <p className="text-muted-foreground">Monitor chatbot usage and costs</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Requests
                    </CardTitle>
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totals.requests.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Input Messages
                    </CardTitle>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totals.messages.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Avg Messages/Request
                    </CardTitle>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {totals.requests > 0 ? (totals.messages / totals.requests).toFixed(1) : "0"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Chart */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Daily Requests (Last 14 Days)</CardTitle>
                  <CardDescription>Number of chat requests per day</CardDescription>
                </CardHeader>
                <CardContent>
                  {dailyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Bar dataKey="total_requests" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Requests" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      No usage data yet. Start using the chatbot to see stats!
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Monthly Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Total requests and input messages by month</CardDescription>
                </CardHeader>
                <CardContent>
                  {monthlyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="total_requests"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                          name="Requests"
                        />
                        <Line
                          type="monotone"
                          dataKey="total_input_messages"
                          stroke="hsl(var(--accent-warm))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--accent-warm))" }}
                          name="Input Messages"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      No monthly data available yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}
