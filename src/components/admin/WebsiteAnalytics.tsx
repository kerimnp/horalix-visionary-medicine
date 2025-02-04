import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Mail, MousePointerClick, UserPlus } from "lucide-react";

interface DailyData {
  date: string;
  visits: number;
  contacts: number;
}

interface PageDistributionData {
  name: string;
  value: number;
}

interface AnalyticsData {
  uniqueContacts: number;
  uniqueVisitors: number;
  totalSubscribers: number;
  timelineData: DailyData[];
  pageDistribution: PageDistributionData[];
}

async function fetchAnalytics(): Promise<AnalyticsData> {
  // Get unique contacts count by counting distinct emails
  const { data: uniqueEmails } = await supabase
    .from('contact_submissions')
    .select('email')
    .order('created_at', { ascending: false });

  // Count unique emails
  const uniqueEmailsCount = new Set(uniqueEmails?.map(submission => submission.email)).size;

  // Get unique visitors count (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { data: uniqueVisitors } = await supabase
    .from('site_visits')
    .select('visitor_id')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false });

  const uniqueVisitorCount = new Set(uniqueVisitors?.map(v => v.visitor_id)).size;

  // Get total subscribers
  const { count: subscriberCount } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true });

  // Get daily visits and contacts for the last 30 days
  const [{ data: dailyVisits }, { data: dailyContacts }] = await Promise.all([
    supabase
      .from('site_visits')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString()),
    supabase
      .from('contact_submissions')
      .select('created_at, email')
      .gte('created_at', thirtyDaysAgo.toISOString())
  ]);

  // Get page visits distribution
  const { data: pageVisits } = await supabase
    .from('site_visits')
    .select('page_path')
    .gte('created_at', thirtyDaysAgo.toISOString());

  // Process daily data
  const dailyData: Record<string, DailyData> = {};
  const now = new Date();
  
  // Initialize all days in the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dailyData[dateStr] = { date: dateStr, visits: 0, contacts: 0 };
  }

  // Fill in actual data
  dailyVisits?.forEach(visit => {
    const date = new Date(visit.created_at).toISOString().split('T')[0];
    if (dailyData[date]) {
      dailyData[date].visits = (dailyData[date].visits || 0) + 1;
    }
  });

  // Count unique contacts per day
  const dailyUniqueContacts: Record<string, Set<string>> = {};
  dailyContacts?.forEach(contact => {
    const date = new Date(contact.created_at).toISOString().split('T')[0];
    if (!dailyUniqueContacts[date]) {
      dailyUniqueContacts[date] = new Set();
    }
    dailyUniqueContacts[date].add(contact.email);
  });

  // Update daily data with unique contact counts
  Object.entries(dailyUniqueContacts).forEach(([date, emails]) => {
    if (dailyData[date]) {
      dailyData[date].contacts = emails.size;
    }
  });

  // Convert to array and sort by date
  const timelineData = Object.values(dailyData).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Process page distribution data
  const pageDistribution = pageVisits?.reduce((acc: Record<string, number>, { page_path }) => {
    const cleanPath = page_path === '/' ? 'Home' : page_path.replace('/', '').charAt(0).toUpperCase() + page_path.slice(2);
    acc[cleanPath] = (acc[cleanPath] || 0) + 1;
    return acc;
  }, {});

  const pageDistributionData = Object.entries(pageDistribution || {}).map(([name, value]) => ({
    name,
    value
  }));

  return {
    uniqueContacts: uniqueEmailsCount || 0,
    uniqueVisitors: uniqueVisitorCount || 0,
    totalSubscribers: subscriberCount || 0,
    timelineData,
    pageDistribution: pageDistributionData
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function WebsiteAnalytics() {
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-medical-electric" />
      </div>
    );
  }

  const conversionRate = data?.uniqueContacts && data.uniqueVisitors 
    ? ((data.uniqueContacts / data.uniqueVisitors) * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors (30d)</CardTitle>
            <Users className="h-4 w-4 text-medical-electric" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Unique visitors in the last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Contacts</CardTitle>
            <Mail className="h-4 w-4 text-medical-electric" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.uniqueContacts.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Unique contact form submissions</p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MousePointerClick className="h-4 w-4 text-medical-electric" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-gray-500">Visitors who submitted contact form</p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
            <UserPlus className="h-4 w-4 text-medical-electric" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Total newsletter subscribers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">30 Day Timeline</TabsTrigger>
          <TabsTrigger value="pages">Popular Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>30 Day Activity Timeline</CardTitle>
              <CardDescription>Daily visitors and contact form submissions</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.timelineData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value, name) => [value, name === 'visits' ? 'Page Views' : 'Contact Forms']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#8884d8" 
                    name="Page Views"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contacts" 
                    stroke="#82ca9d" 
                    name="Contact Forms"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Most Visited Pages</CardTitle>
              <CardDescription>Distribution of page visits in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.pageDistribution || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data?.pageDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
