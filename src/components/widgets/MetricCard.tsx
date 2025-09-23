import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  color: 'cyan' | 'purple' | 'pink' | 'green' | 'yellow' | 'orange';
  loading?: boolean;
}

const colorClasses = {
  cyan: 'border-neon-cyan/30 bg-neon-cyan/5',
  purple: 'border-neon-purple/30 bg-neon-purple/5',
  pink: 'border-neon-pink/30 bg-neon-pink/5',
  green: 'border-neon-green/30 bg-neon-green/5',
  yellow: 'border-neon-yellow/30 bg-neon-yellow/5',
  orange: 'border-neon-orange/30 bg-neon-orange/5'
};

const iconColors = {
  cyan: 'text-neon-cyan',
  purple: 'text-neon-purple', 
  pink: 'text-neon-pink',
  green: 'text-neon-green',
  yellow: 'text-neon-yellow',
  orange: 'text-neon-orange'
};

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend, 
  color, 
  loading = false 
}: MetricCardProps) => {
  return (
    <Card className={cn(
      "p-6 bg-glass border-glass-border backdrop-blur-glass transition-all duration-300 hover:bg-glass-hover hover:shadow-glow group animate-fade-in",
      colorClasses[color]
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl transition-all duration-300 group-hover:shadow-neon",
          colorClasses[color]
        )}>
          <Icon className={cn("w-6 h-6", iconColors[color])} />
        </div>
        <Badge 
          variant={trend === 'up' ? 'default' : 'destructive'}
          className="bg-glass border-glass-border backdrop-blur-glass"
        >
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {change}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        {loading ? (
          <div className="h-8 bg-muted/20 rounded animate-pulse" />
        ) : (
          <p className={cn(
            "text-3xl font-bold transition-all duration-300",
            iconColors[color]
          )}>
            {value}
          </p>
        )}
      </div>
      
      {/* Animated border effect */}
      <div className={cn(
        "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
        `shadow-${color === 'cyan' ? 'neon' : 'glow'}`
      )} />
    </Card>
  );
};