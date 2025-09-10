import { useState } from "react";
import { AlertTriangle, Activity, Clock, TrendingUp, X, MapPin, Users, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const kpiData = [
  {
    title: "Current Risk",
    value: "MODERATE",
    description: "Overall site assessment",
    icon: AlertTriangle,
    status: "warning" as const,
    detail: "Level 3/5"
  },
  {
    title: "Time-to-Failure", 
    value: "72h",
    description: "Predicted stability window",
    icon: Clock,
    status: "success" as const,
    detail: "Est. 3 days"
  },
  {
    title: "Sensors Online",
    value: "47/52",
    description: "Active monitoring network",
    icon: Activity,
    status: "success" as const,
    detail: "90% operational"
  },
  {
    title: "Last Update",
    value: "30s",
    description: "Data refresh interval",
    icon: TrendingUp,
    status: "success" as const,
    detail: "Real-time"
  },
];

const riskZones = [
  {
    id: "zone-1",
    name: "Sector 7 - North Wall",
    risk: "critical",
    probability: 85,
    eta: "6-12 hours",
    sensors: ["VIB-073", "STR-089"],
    workers: 12,
    coordinates: { x: 65, y: 25, width: 15, height: 20 }
  },
  {
    id: "zone-2", 
    name: "Sector 12 - Drainage Area",
    risk: "warning",
    probability: 45,
    eta: "24-48 hours",
    sensors: ["PPR-156", "STR-112"],
    workers: 8,
    coordinates: { x: 25, y: 55, width: 20, height: 15 }
  },
  {
    id: "zone-3",
    name: "Sector 3 - East Slope",
    risk: "elevated",
    probability: 25,
    eta: "72+ hours",
    sensors: ["INC-204", "STR-134"],
    workers: 15,
    coordinates: { x: 50, y: 70, width: 18, height: 12 }
  }
];

const getRiskZoneColor = (risk: string) => {
  switch (risk) {
    case "critical": return "bg-critical/80 border-critical hover:bg-critical/90";
    case "warning": return "bg-warning/80 border-warning hover:bg-warning/90";
    case "elevated": return "bg-yellow-500/80 border-yellow-500 hover:bg-yellow-500/90";
    default: return "bg-success/80 border-success hover:bg-success/90";
  }
};

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
  const [selectedZone, setSelectedZone] = useState<typeof riskZones[0] | null>(null);

  return (
    <div className="space-y-6 relative">
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Mine Safety Dashboard</h1>
        <p className="text-lg md:text-xl text-muted-foreground">Real-time monitoring and risk assessment</p>
      </div>

      {/* KPI Cards - Mobile optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="relative overflow-hidden shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <kpi.icon className={`h-6 w-6 ${getStatusColor(kpi.status)}`} />
                  <Badge variant={getBadgeVariant(kpi.status)} className="text-xs font-bold">
                    {kpi.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {kpi.title}
                  </p>
                  <p className={`text-2xl md:text-3xl font-bold ${getStatusColor(kpi.status)} leading-tight`}>
                    {kpi.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.detail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-bold">
              <MapPin className="h-6 w-6 mr-2 text-primary" />
              Live Risk Zones
            </CardTitle>
            <CardDescription className="text-base">
              Click on colored zones to view risk details and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg h-[400px] md:h-[500px] overflow-hidden border-2 border-border">
              {/* Mine Layout Background */}
              <div className="absolute inset-0 p-4">
                <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded relative">
                  
                  {/* Risk Zone Polygons */}
                  {riskZones.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={`absolute border-2 rounded-lg transition-all duration-200 cursor-pointer ${getRiskZoneColor(zone.risk)} shadow-lg hover:shadow-xl transform hover:scale-105`}
                      style={{
                        left: `${zone.coordinates.x}%`,
                        top: `${zone.coordinates.y}%`,
                        width: `${zone.coordinates.width}%`,
                        height: `${zone.coordinates.height}%`
                      }}
                    >
                      <div className="p-2 text-white text-xs font-bold text-center">
                        <div>{zone.name}</div>
                        <div className="text-white/90">{zone.probability}%</div>
                      </div>
                    </button>
                  ))}
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg">
                    <p className="text-xs font-bold text-foreground mb-2">Risk Levels</p>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-critical rounded"></div>
                        <span className="text-xs text-foreground font-medium">Critical</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-warning rounded"></div>
                        <span className="text-xs text-foreground font-medium">Warning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span className="text-xs text-foreground font-medium">Elevated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side Panel for Zone Details */}
        {selectedZone ? (
          <Card className="shadow-lg border-l-4 border-l-warning">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-bold">{selectedZone.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedZone(null)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Risk Level */}
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm font-medium text-muted-foreground mb-1">Failure Probability</p>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-warning">{selectedZone.probability}%</span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedZone.risk.toUpperCase()}
                  </Badge>
                </div>
                <Progress value={selectedZone.probability} className="h-3" />
              </div>

              {/* ETA */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Estimated Time to Failure</p>
                <p className="text-lg font-bold text-foreground">{selectedZone.eta}</p>
              </div>

              {/* Workers */}
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedZone.workers} personnel in area
                </span>
              </div>

              {/* Sensors */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Active Sensors</p>
                <div className="flex flex-wrap gap-1">
                  {selectedZone.sensors.map((sensor) => (
                    <Badge key={sensor} variant="outline" className="text-xs">
                      {sensor}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-border">
                <Button className="w-full bg-warning hover:bg-warning/90 text-white font-bold" size="lg">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Verify Alert
                </Button>
                <Button variant="outline" className="w-full font-bold" size="lg">
                  Dismiss Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground mb-2">Select Risk Zone</p>
              <p className="text-sm text-muted-foreground">
                Click on colored zones in the map to view detailed risk information and available actions.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}