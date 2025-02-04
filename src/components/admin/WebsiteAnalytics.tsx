import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', visits: 4000 },
  { name: 'Feb', visits: 3000 },
  { name: 'Mar', visits: 2000 },
  { name: 'Apr', visits: 2780 },
  { name: 'May', visits: 1890 },
  { name: 'Jun', visits: 2390 },
];

export function WebsiteAnalytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold">Total Visits</h3>
          <p className="text-3xl font-bold">16,060</p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold">Contact Rate</h3>
          <p className="text-3xl font-bold">2.4%</p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold">Subscription Rate</h3>
          <p className="text-3xl font-bold">1.8%</p>
        </div>
      </div>

      <div className="h-[400px] border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Monthly Visits</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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