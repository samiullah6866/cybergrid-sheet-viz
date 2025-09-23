import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

interface RevenueChartProps {
  data: Array<{
    id: string;
    name: string;
    payment: string;
  }>;
  loading?: boolean;
}

export const RevenueChart = ({ data, loading = false }: RevenueChartProps) => {
  // Process data for chart
  const chartData = data.slice(0, 8).map((item, index) => ({
    name: item.name.split(' ')[0] || `User ${index + 1}`,
    revenue: parseFloat(item.payment) || 0,
    index: index + 1
  }));

  return (
    <Card className="p-6 bg-glass border-glass-border backdrop-blur-glass hover:shadow-glow transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
            <TrendingUp className="w-5 h-5 text-neon-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Revenue Trends</h3>
            <p className="text-sm text-muted-foreground">Individual user payments</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-64 bg-muted/10 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground">Loading chart data...</div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value) => [`$${value}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--neon-cyan))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--neon-cyan))', strokeWidth: 2, r: 6 }}
                activeDot={{ 
                  r: 8, 
                  fill: 'hsl(var(--neon-cyan))',
                  stroke: 'hsl(var(--background))',
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};