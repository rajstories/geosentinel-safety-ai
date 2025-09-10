import { AlertTriangle, Clock, MapPin, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: "ALT-001",
    title: "Vibration Anomaly Detected",
    location: "Sector 7, Level 3",
    severity: "critical" as const,
    timestamp: "2 minutes ago",
    description: "Seismic sensors detecting unusual vibration patterns indicating potential instability",
    status: "active",
    sensorId: "VIB-073"
  },
  {
    id: "ALT-002", 
    title: "Pore Pressure Rising",
    location: "Sector 12, Drainage Point B",
    severity: "warning" as const,
    timestamp: "8 minutes ago",
    description: "Groundwater pressure exceeding normal parameters, monitor for slope stability",
    status: "active",
    sensorId: "PPR-156"
  },
  {
    id: "ALT-003",
    title: "Rainfall Threshold Exceeded",
    location: "Site-wide Weather Station",
    severity: "warning" as const,
    timestamp: "25 minutes ago", 
    description: "24-hour rainfall accumulation reached 85mm, approaching critical levels",
    status: "acknowledged",
    sensorId: "WTH-001"
  },
  {
    id: "ALT-004",
    title: "Strain Gauge Offline",
    location: "Sector 5, North Wall",
    severity: "warning" as const,
    timestamp: "1 hour ago",
    description: "Communication lost with strain monitoring device, manual inspection required",
    status: "resolved",
    sensorId: "STR-089"
  }
];

const getSeverityColor = (severity: "warning" | "critical") => {
  switch (severity) {
    case "warning": return "warning";
    case "critical": return "critical";
    default: return "warning";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "critical";
    case "acknowledged": return "warning"; 
    case "resolved": return "success";
    default: return "muted";
  }
};

export function Alerts() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Safety Alerts</h1>
        <p className="text-xl text-muted-foreground">Monitor and respond to critical safety events</p>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-3xl font-bold text-critical">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-critical" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
                <p className="text-3xl font-bold text-warning">1</p>
              </div>
              <Eye className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-3xl font-bold text-success">12</p>
              </div>
              <Clock className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">All Alerts</h2>
        
        {alerts.map((alert) => (
          <Card key={alert.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={getSeverityColor(alert.severity) === "critical" ? "destructive" : "secondary"}
                      className="text-xs font-medium"
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge 
                      variant={getStatusColor(alert.status) === "success" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {alert.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{alert.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {alert.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {alert.timestamp}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Sensor ID: {alert.sensorId}
                </span>
                <div className="space-x-2">
                  {alert.status === "active" && (
                    <>
                      <Button variant="outline" size="sm">
                        Acknowledge
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Investigate
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}