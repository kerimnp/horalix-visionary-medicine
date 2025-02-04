import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

async function fetchAnalytics() {
  // Get total contact submissions
  const { count: contactCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true });

  // Get total subscribers
  const { count: subscriberCount } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true });

  // Get monthly contact submissions for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data: monthlyData } = await supabase
    .from('contact_submissions')
    .select('created_at')
    .gte('created_at', sixMonthsAgo.toISOString());

  // Process monthly data
  const monthlyVisits = monthlyData?.reduce((acc: any, item) => {
    const date = new Date(item.created_at);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyVisits || {}).map(([name, visits]) => ({
    name,
    visits,
  }));

  return {
    totalContacts: contactCount || 0,
    totalSubscribers: subscriberCount || 0,
    monthlyData: chartData,
  };
}

export function WebsiteAnalytics() {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading analytics...</div>;
  }

  const contactRate = data?.totalContacts ? ((data.totalContacts / (data.totalContacts + data.totalSubscribers)) * 100).toFixed(1) : '0';
  const subscriptionRate = data?.totalSubscribers ? ((data.totalSubscribers / (data.totalContacts + data.totalSubscribers)) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold">Total Contacts</h3>
          <p className="text-3xl font-bold">{data?.totalContacts || 0}</p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold">Contact Rate</h3>
          <p className="text-3xl font-bold">{contactRate}%</p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold">Subscription Rate</h3>
          <p className="text-3xl font-bold">{subscriptionRate}%</p>
        </div>
      </div>

      <div className="h-[400px] border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Monthly Contacts</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.monthlyData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visits" fill="#00A3FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}