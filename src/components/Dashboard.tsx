import { AlertTriangle, Activity, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const kpiData = [
  {
    title: "Risk Level",
    value: "MODERATE",
    description: "Overall site risk assessment",
    icon: AlertTriangle,
    status: "warning" as const,
    trend: "+2% from yesterday"
  },
  {
    title: "Sensors Online",
    value: "47/52",
    description: "Active monitoring devices",
    icon: Activity,
    status: "success" as const,
    trend: "5 offline for maintenance"
  },
  {
    title: "Time to Failure",
    value: "72h",
    description: "Predicted slope stability",
    icon: Clock,
    status: "success" as const,
    trend: "Stable conditions"
  },
  {
    title: "Active Alerts", 
    value: "3",
    description: "Requiring attention",
    icon: TrendingUp,
    status: "warning" as const,
    trend: "2 new since 06:00"
  },
];

const getStatusColor = (status: "success" | "warning" | "critical") => {
  switch (status) {
    case "success": return "text-success";
    case "warning": return "text-warning";
    case "critical": return "text-critical";
    default: return "text-foreground";
  }
};

const getBadgeVariant = (status: "success" | "warning" | "critical") => {
  switch (status) {
    case "success": return "default";
    case "warning": return "secondary";  
    case "critical": return "destructive";
    default: return "default";
  }
};

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Mine Safety Dashboard</h1>
        <p className="text-xl text-muted-foreground">Real-time monitoring and risk assessment</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-5 w-5 ${getStatusColor(kpi.status)}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-3xl font-bold ${getStatusColor(kpi.status)}`}>
                  {kpi.value}
                </span>
                <Badge variant={getBadgeVariant(kpi.status)} className="text-xs">
                  {kpi.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{kpi.description}</p>
              <p className="text-xs text-muted-foreground">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Activity className="h-6 w-6 mr-2 text-primary" />
            Live Hazard Map
          </CardTitle>
          <CardDescription>
            Interactive site map showing sensor locations and risk zones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Interactive Map Loading...</p>
              <p className="text-sm text-muted-foreground">
                Live sensor data and hazard zones will appear here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <CardDescription>Latest system events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-warning/10 border border-warning/20">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Vibration anomaly detected - Sector 7
                </p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-success/10 border border-success/20">
              <Activity className="h-5 w-5 text-success" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  All strain gauges operational - Sector 3
                </p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Scheduled maintenance completed - Sensor Bank A
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}