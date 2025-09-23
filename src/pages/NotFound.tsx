import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-pulse-glow"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-neon-cyan/10 rounded-full blur-3xl animate-float"></div>
      
      <Card className="relative z-10 p-12 bg-glass border-glass-border backdrop-blur-glass max-w-md mx-6 text-center animate-fade-in">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-neon-pink animate-pulse-glow" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            404
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            SYSTEM ERROR
          </p>
          <p className="text-sm text-muted-foreground">
            The requested pathway could not be found in the mainframe
          </p>
        </div>
        
        <Button 
          asChild
          className="bg-glass border-glass-border backdrop-blur-glass hover:bg-glass-hover transition-all duration-300 border-neon-cyan/30 hover:border-neon-cyan/50 text-neon-cyan hover:shadow-neon w-full"
        >
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Return to Dashboard
          </a>
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
