import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { MessageSquare, TrendingUp, Calendar, ArrowLeft, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const VERIFY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-admin`;

export default function AdminStats() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    sessionStorage.getItem("adminAuthenticated") === "true"
  );
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  
  const [dailyData, setDailyData] = useState<DailyUsage[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ requests: 0, messages: 0 });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const resp = await fetch(VERIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await resp.json();

      if (resp.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuthenticated", "true");
      } else {
        setAuthError(data.error || "Invalid password");
      }
    } catch (e) {
      setAuthError("Failed to verify. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    async function fetchUsageData() {
      try {
        const { data: daily, error: dailyError } = await supabase
          .from("chat_usage")
          .select("date, input_messages")
          .order("date", { ascending: false })
          .limit(1000);

        if (dailyError) {
          console.error("Error fetching daily data:", dailyError);
        }

        if (daily) {
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
            .slice(-14);

          setDailyData(aggregatedDaily);

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
  }, [isAuthenticated]);

  return (
    <>
      <Helmet>
        <title>Chat Usage Stats | IntegroAI Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {!isAuthenticated ? (
        /* Login Form */
        <div className="min-h-screen flex items-center justify-center p-6">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>Enter the admin password to view stats</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    disabled={authLoading}
                  />
                </div>
                {authError && (
                  <p className="text-sm text-destructive">{authError}</p>
                )}
                <Button type="submit" className="w-full" disabled={authLoading || !password}>
                  {authLoading ? "Verifying..." : "Access Stats"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Stats Dashboard */
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
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
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
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
      )}
    </>
  );
}
