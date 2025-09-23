import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Filter } from "lucide-react";

interface ConversionFunnelProps {
  data: Array<{
    id: string;
    name: string;
    email: string;
    payment: string;
  }>;
  loading?: boolean;
}

export const ConversionFunnel = ({ data, loading = false }: ConversionFunnelProps) => {
  // Calculate funnel metrics
  const totalUsers = data.length;
  const usersWithEmail = data.filter(item => item.email && item.email.includes('@')).length;
  const paidUsers = data.filter(item => parseFloat(item.payment) > 0).length;
  
  const emailConversion = totalUsers > 0 ? (usersWithEmail / totalUsers) * 100 : 0;
  const paymentConversion = usersWithEmail > 0 ? (paidUsers / usersWithEmail) * 100 : 0;

  const funnelSteps = [
    {
      stage: "Total Visitors",
      count: totalUsers,
      percentage: 100,
      color: "bg-neon-cyan"
    },
    {
      stage: "Email Provided", 
      count: usersWithEmail,
      percentage: emailConversion,
      color: "bg-neon-purple"
    },
    {
      stage: "Completed Payment",
      count: paidUsers, 
      percentage: paymentConversion,
      color: "bg-neon-green"
    }
  ];

  return (
    <Card className="p-6 bg-glass border-glass-border backdrop-blur-glass hover:shadow-glow transition-all duration-300 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/30">
          <Filter className="w-5 h-5 text-neon-purple" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Conversion Funnel</h3>
          <p className="text-sm text-muted-foreground">User journey analytics</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted/20 rounded animate-pulse" />
              <div className="h-6 bg-muted/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {funnelSteps.map((step, index) => (
            <div key={step.stage} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{step.stage}</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-neon-cyan">{step.count}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({step.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <Progress 
                  value={step.percentage} 
                  className="h-3 bg-muted/20"
                />
                <div 
                  className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${step.color} shadow-glow`}
                  style={{ width: `${step.percentage}%` }}
                />
              </div>
              
              {index < funnelSteps.length - 1 && (
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};