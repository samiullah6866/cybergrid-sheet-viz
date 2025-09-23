import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, User, Mail, DollarSign, Hash } from "lucide-react";

interface DataTableProps {
  data: Array<{
    id: string;
    name: string;
    fatherName: string;
    email: string;
    payment: string;
  }>;
  loading?: boolean;
}

export const DataTable = ({ data, loading = false }: DataTableProps) => {
  return (
    <Card className="p-6 bg-glass border-glass-border backdrop-blur-glass hover:shadow-glow transition-all duration-300 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
          <Database className="w-5 h-5 text-neon-cyan" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Live Data Records</h3>
          <p className="text-sm text-muted-foreground">Real-time Google Sheets data</p>
        </div>
        <Badge className="bg-neon-green/10 text-neon-green border-neon-green/30 ml-auto">
          {data.length} Records
        </Badge>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 bg-muted/10 rounded-lg animate-pulse">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-muted/20 rounded w-24"></div>
                  <div className="h-3 bg-muted/15 rounded w-32"></div>
                </div>
                <div className="h-6 bg-muted/20 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-3 bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg font-semibold text-sm text-neon-cyan">
            <div className="col-span-2 flex items-center gap-2">
              <Hash className="w-3 h-3" />
              ID
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <User className="w-3 h-3" />
              Name
            </div>
            <div className="col-span-2">Father Name</div>
            <div className="col-span-3 flex items-center gap-2">
              <Mail className="w-3 h-3" />
              Email
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <DollarSign className="w-3 h-3" />
              Payment
            </div>
          </div>

          {/* Table Rows */}
          {data.map((record, index) => (
            <div 
              key={record.id || index}
              className="grid grid-cols-12 gap-4 p-3 bg-glass/50 border border-glass-border/50 rounded-lg hover:bg-glass-hover hover:border-neon-cyan/30 transition-all duration-300 group"
            >
              <div className="col-span-2">
                <Badge className="bg-neon-purple/10 text-neon-purple border-neon-purple/30 text-xs">
                  {record.id}
                </Badge>
              </div>
              <div className="col-span-3">
                <span className="font-medium text-foreground group-hover:text-neon-cyan transition-colors">
                  {record.name}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground text-sm">
                  {record.fatherName}
                </span>
              </div>
              <div className="col-span-3">
                <span className="text-neon-cyan/80 text-sm font-mono">
                  {record.email}
                </span>
              </div>
              <div className="col-span-2">
                <Badge 
                  className={`
                    ${parseFloat(record.payment) > 3000 
                      ? 'bg-neon-green/10 text-neon-green border-neon-green/30' 
                      : parseFloat(record.payment) > 1500
                      ? 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30'
                      : 'bg-neon-orange/10 text-neon-orange border-neon-orange/30'
                    }
                  `}
                >
                  ${parseFloat(record.payment).toLocaleString()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="text-center py-12">
          <Database className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No data records found</p>
          <p className="text-sm text-muted-foreground/70">Check your Google Sheets connection</p>
        </div>
      )}
    </Card>
  );
};