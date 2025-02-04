import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

async function fetchAnalytics() {
  // Get total contact submissions
  const { count: contactCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true });

  // Get total subscribers
  const { count: subscriberCount } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true });

  // Get total site visits
  const { count: visitCount } = await supabase
    .from('site_visits')
    .select('*', { count: 'exact', head: true });

  // Get monthly contact submissions and visits for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [{ data: monthlyContacts }, { data: monthlyVisits }] = await Promise.all([
    supabase
      .from('contact_submissions')
      .select('created_at')
      .gte('created_at', sixMonthsAgo.toISOString()),
    supabase
      .from('site_visits')
      .select('created_at')
      .gte('created_at', sixMonthsAgo.toISOString())
  ]);

  // Get page visits distribution
  const { data: pageVisits } = await supabase
    .from('site_visits')
    .select('page_path');

  // Process monthly data
  const processMonthlyData = (data: any[]) => {
    return data?.reduce((acc: any, item) => {
      const date = new Date(item.created_at);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {});
  };

  const monthlyContactsData = processMonthlyData(monthlyContacts || []);
  const monthlyVisitsData = processMonthlyData(monthlyVisits || []);

  // Process page visits data
  const pageVisitsData = pageVisits?.reduce((acc: any, item) => {
    acc[item.page_path] = (acc[item.page_path] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyContactsData || {}).map(([name, contacts]) => ({
    name,
    contacts,
    visits: monthlyVisitsData[name] || 0
  }));

  const pageDistributionData = Object.entries(pageVisitsData || {}).map(([name, value]) => ({
    name,
    value
  }));

  return {
    totalContacts: contactCount || 0,
    totalSubscribers: subscriberCount || 0,
    totalVisits: visitCount || 0,
    monthlyData: chartData,
    pageDistribution: pageDistributionData
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function WebsiteAnalytics() {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-medical-electric" />
      </div>
    );
  }

  const conversionRate = data?.totalContacts && data.totalVisits 
    ? ((data.totalContacts / data.totalVisits) * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalVisits.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalContacts.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalSubscribers.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
          <TabsTrigger value="pages">Page Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.monthlyData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#8884d8" name="Visits" />
                  <Line type="monotone" dataKey="contacts" stroke="#82ca9d" name="Contacts" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page Visit Distribution</CardTitle>
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