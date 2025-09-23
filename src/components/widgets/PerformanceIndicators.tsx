import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gauge, Zap, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceIndicatorsProps {
  data: Array<{
    id: string;
    name: string;
    email: string;
    payment: string;
  }>;
  loading?: boolean;
}

export const PerformanceIndicators = ({ data, loading = false }: PerformanceIndicatorsProps) => {
  // Calculate performance metrics
  const totalRevenue = data.reduce((sum, item) => sum + (parseFloat(item.payment) || 0), 0);
  const avgPayment = data.length > 0 ? totalRevenue / data.length : 0;
  const highValueUsers = data.filter(item => parseFloat(item.payment) > avgPayment).length;
  const completionRate = data.length > 0 ? (data.filter(item => item.email && parseFloat(item.payment) > 0).length / data.length) * 100 : 0;

  const indicators = [
    {
      label: "Revenue Performance",
      value: Math.min((totalRevenue / 20000) * 100, 100), // Target: $20k
      status: totalRevenue > 15000 ? "excellent" : totalRevenue > 10000 ? "good" : "needs-improvement",
      icon: Gauge,
      color: "cyan"
    },
    {
      label: "Conversion Efficiency", 
      value: completionRate,
      status: completionRate > 80 ? "excellent" : completionRate > 60 ? "good" : "needs-improvement",
      icon: Target,
      color: "purple"
    },
    {
      label: "User Quality Score",
      value: Math.min((highValueUsers / data.length) * 200, 100), // Normalized score
      status: highValueUsers > data.length * 0.4 ? "excellent" : highValueUsers > data.length * 0.2 ? "good" : "needs-improvement",
      icon: Award,
      color: "pink"
    },
    {
      label: "System Performance",
      value: 94, // Simulated system performance
      status: "excellent",
      icon: Zap,
      color: "green"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-neon-green";
      case "good": return "text-neon-yellow";
      case "needs-improvement": return "text-neon-orange";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent": return "bg-neon-green/10 text-neon-green border-neon-green/30";
      case "good": return "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30";
      case "needs-improvement": return "bg-neon-orange/10 text-neon-orange border-neon-orange/30";
      default: return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  return (
    <Card className="p-6 bg-glass border-glass-border backdrop-blur-glass hover:shadow-glow transition-all duration-300 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-green/10 border border-neon-green/30">
          <Gauge className="w-5 h-5 text-neon-green" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Indicators</h3>
          <p className="text-sm text-muted-foreground">Real-time system metrics</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted/20 rounded animate-pulse" />
              <div className="h-3 bg-muted/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {indicators.map((indicator, index) => (
            <div key={indicator.label} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <indicator.icon className={cn("w-4 h-4", getStatusColor(indicator.status))} />
                  <span className="text-sm font-medium text-foreground">
                    {indicator.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-lg font-bold", getStatusColor(indicator.status))}>
                    {indicator.value.toFixed(1)}%
                  </span>
                  <Badge className={getStatusBadge(indicator.status)}>
                    {indicator.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              
              <Progress 
                value={indicator.value} 
                className="h-2 bg-muted/20"
              />
            </div>
          ))}
        </div>
      )}

      {/* Overall Performance Score */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {loading ? "..." : Math.round(indicators.reduce((sum, ind) => sum + ind.value, 0) / indicators.length)}%
          </div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
            Overall Performance
          </p>
        </div>
      </div>
    </Card>
  );
};