import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Zap,
  RefreshCcw,
  Database,
  Eye
} from "lucide-react";
import { MetricCard } from "./widgets/MetricCard";
import { RevenueChart } from "./widgets/RevenueChart";
import { ConversionFunnel } from "./widgets/ConversionFunnel";
import { UserEngagement } from "./widgets/UserEngagement";
import { PerformanceIndicators } from "./widgets/PerformanceIndicators";
import { DataTable } from "./widgets/DataTable";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import cyberpunkHero from "@/assets/cyberpunk-hero.jpg";

interface DashboardData {
  id: string;
  name: string;
  fatherName: string;
  email: string;
  payment: string;
}

export const Dashboard = () => {
  const { data, loading, error, refreshData } = useGoogleSheets();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (data.length > 0) {
      setLastUpdated(new Date());
    }
  }, [data]);

  // Process data for metrics
  const totalUsers = data.length;
  const totalRevenue = data.reduce((sum, item) => sum + (parseFloat(item.payment) || 0), 0);
  const avgRevenue = totalUsers > 0 ? totalRevenue / totalUsers : 0;
  const activeUsers = data.filter(item => item.email && item.email.includes('@')).length;

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cyberpunkHero})` }}
      />
      
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-pulse-glow"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl animate-float"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent neon-glow">
                CYBERPUNK DASHBOARD
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">Real-time data visualization control center</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-glass border-glass-border backdrop-blur-glass text-neon-cyan border-neon-cyan/30">
                <Database className="w-4 h-4 mr-2" />
                {totalUsers} Records
              </Badge>
              <Button 
                onClick={refreshData}
                disabled={loading}
                className="bg-glass border-glass-border backdrop-blur-glass hover:bg-glass-hover transition-all duration-300 border-neon-cyan/30 hover:border-neon-cyan/50 text-neon-cyan hover:shadow-neon"
              >
                <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <Card className="p-4 bg-glass border-glass-border backdrop-blur-glass animate-slide-in-right">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-glow shadow-neon"></div>
                  <span className="text-sm text-neon-green font-medium">SYSTEM ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm text-muted-foreground">
                    Last sync: {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              {error && (
                <Badge variant="destructive" className="animate-pulse-glow border-red-500/50">
                  ⚠ CONNECTION ERROR
                </Badge>
              )}
            </div>
          </Card>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            change="+12.5%"
            icon={DollarSign}
            trend="up"
            color="cyan"
            loading={loading}
          />
          <MetricCard
            title="Total Users"
            value={totalUsers.toString()}
            change="+8.2%"
            icon={Users}
            trend="up"
            color="purple"
            loading={loading}
          />
          <MetricCard
            title="Avg Revenue"
            value={`$${avgRevenue.toFixed(2)}`}
            change="+15.3%"
            icon={TrendingUp}
            trend="up"
            color="pink"
            loading={loading}
          />
          <MetricCard
            title="Active Users"
            value={activeUsers.toString()}
            change="+5.7%"
            icon={Activity}
            trend="up"
            color="green"
            loading={loading}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={data} loading={loading} />
          <UserEngagement data={data} loading={loading} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConversionFunnel data={data} loading={loading} />
          <PerformanceIndicators data={data} loading={loading} />
        </div>

        {/* Data Table - Full Width */}
        <DataTable data={data} loading={loading} />
      </div>
    </div>
  );
};