import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users2 } from "lucide-react";

interface UserEngagementProps {
  data: Array<{
    id: string;
    name: string;
    email: string;
    payment: string;
  }>;
  loading?: boolean;
}

export const UserEngagement = ({ data, loading = false }: UserEngagementProps) => {
  // Process data for engagement metrics
  const engagementData = [
    {
      category: "High Value",
      users: data.filter(item => parseFloat(item.payment) > 2000).length,
      color: "#00ffff"
    },
    {
      category: "Medium Value", 
      users: data.filter(item => {
        const payment = parseFloat(item.payment);
        return payment >= 1000 && payment <= 2000;
      }).length,
      color: "#bf00ff"
    },
    {
      category: "Low Value",
      users: data.filter(item => {
        const payment = parseFloat(item.payment);
        return payment > 0 && payment < 1000;
      }).length,
      color: "#ff0080"
    },
    {
      category: "No Payment",
      users: data.filter(item => parseFloat(item.payment) === 0).length,
      color: "#00ff80"
    }
  ];

  return (
    <Card className="p-6 bg-glass border-glass-border backdrop-blur-glass hover:shadow-glow transition-all duration-300 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/30">
          <Users2 className="w-5 h-5 text-neon-purple" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Engagement</h3>
          <p className="text-sm text-muted-foreground">Segmentation by payment value</p>
        </div>
      </div>

      {loading ? (
        <div className="h-64 bg-muted/10 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground">Loading engagement data...</div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value) => [value, 'Users']}
              />
              <Bar 
                dataKey="users" 
                fill="hsl(var(--neon-purple))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Engagement Summary */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-neon-cyan">
              {data.filter(item => parseFloat(item.payment) > 1000).length}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">High Engagement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neon-pink">
              {((data.filter(item => parseFloat(item.payment) > 0).length / data.length) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Conversion Rate</p>
          </div>
        </div>
      </div>
    </Card>
  );
};