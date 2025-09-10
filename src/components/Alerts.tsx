import { useState } from "react";
import { AlertTriangle, Clock, MapPin, Eye, MessageSquare, Download, ArrowLeft, Navigation, Users, Wifi, WifiOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: "ALT-001",
    title: "Slope Failure Imminent",
    shortMessage: "Critical instability detected",
    location: "Sector 7, North Wall",
    severity: "critical" as const,
    timestamp: "2 minutes ago",
    description: "Seismic sensors detecting unusual vibration patterns indicating potential catastrophic slope failure. Immediate evacuation recommended.",
    status: "active",
    sensorId: "VIB-073",
    affectedWorkers: 12,
    safeRoute: "Route Alpha via Service Road 1 → Exit Gate 3",
    coordinates: { x: 65, y: 25 }
  },
  {
    id: "ALT-002", 
    title: "Groundwater Pressure Critical",
    shortMessage: "Drainage system overwhelmed",
    location: "Sector 12, Drainage Point B",
    severity: "critical" as const,
    timestamp: "8 minutes ago",
    description: "Pore pressure exceeding critical thresholds. Risk of saturated slope failure within 6-12 hours.",
    status: "active",
    sensorId: "PPR-156",
    affectedWorkers: 8,
    safeRoute: "Route Bravo via Haul Road 2 → Exit Gate 1",
    coordinates: { x: 25, y: 55 }
  },
  {
    id: "ALT-003",
    title: "Excessive Rainfall Alert",
    shortMessage: "Storm threshold exceeded",
    location: "Site-wide Weather Station",
    severity: "warning" as const,
    timestamp: "25 minutes ago", 
    description: "24-hour rainfall accumulation reached 85mm. Monitor slope conditions closely for next 48 hours.",
    status: "acknowledged",
    sensorId: "WTH-001",
    affectedWorkers: 45,
    safeRoute: "All personnel remain on current operations",
    coordinates: { x: 50, y: 10 }
  },
  {
    id: "ALT-004",
    title: "Sensor Communication Lost",
    shortMessage: "Equipment malfunction detected",
    location: "Sector 5, North Wall",
    severity: "warning" as const,
    timestamp: "1 hour ago",
    description: "Communication lost with strain monitoring device. Manual inspection required within 4 hours.",
    status: "resolved",
    sensorId: "STR-089",
    affectedWorkers: 0,
    safeRoute: "Maintenance access via Service Road 3",
    coordinates: { x: 40, y: 70 }
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
  const [selectedAlert, setSelectedAlert] = useState<typeof alerts[0] | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  if (selectedAlert) {
    return <AlertDetailView alert={selectedAlert} onBack={() => setSelectedAlert(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Edge Mode Banner */}
      <div className={`p-4 rounded-lg border-2 transition-all ${
        isOfflineMode 
          ? 'bg-critical text-critical-foreground border-critical animate-pulse' 
          : 'bg-muted/50 border-border'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isOfflineMode ? (
              <WifiOff className="h-6 w-6" />
            ) : (
              <Wifi className="h-6 w-6" />
            )}
            <div>
              <p className="font-bold text-lg">
                {isOfflineMode ? 'EDGE MODE ACTIVE' : 'Network Connected'}
              </p>
              <p className="text-sm opacity-90">
                {isOfflineMode ? 'Offline siren/lights operational' : 'Real-time monitoring active'}
              </p>
            </div>
          </div>
          <Button
            variant={isOfflineMode ? "secondary" : "outline"}
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className="font-bold"
          >
            {isOfflineMode ? 'Exit Edge Mode' : 'Enable Edge Mode'}
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Safety Alerts</h1>
        <p className="text-lg md:text-xl text-muted-foreground">Monitor and respond to critical safety events</p>
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

      {/* Alerts List - Mobile Optimized */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">Active Alerts</h2>
        
        <div className="space-y-3">
          {alerts.filter(alert => alert.status === "active").map((alert) => (
            <Card 
              key={alert.id} 
              className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                alert.severity === "critical" 
                  ? "border-l-critical bg-critical/5 hover:bg-critical/10" 
                  : "border-l-warning bg-warning/5 hover:bg-warning/10"
              }`}
              onClick={() => setSelectedAlert(alert)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    variant={alert.severity === "critical" ? "destructive" : "secondary"}
                    className="text-xs font-bold px-3 py-1"
                  >
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">{alert.timestamp}</span>
                </div>
                
                <h3 className="font-bold text-lg mb-1 text-foreground">{alert.shortMessage}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {alert.location}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>ID: {alert.sensorId}</span>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {alert.affectedWorkers} workers
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="font-bold">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Alerts */}
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            {alerts.filter(alert => alert.status !== "active").map((alert) => (
              <Card key={alert.id} className="opacity-75">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="outline"
                        className="text-xs"
                      >
                        {alert.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">{alert.shortMessage}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Alert Detail View Component
function AlertDetailView({ alert, onBack }: { alert: typeof alerts[0], onBack: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="font-bold">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Alerts
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{alert.title}</h1>
          <p className="text-muted-foreground">{alert.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Banner */}
          <Card className={`border-l-4 ${
            alert.severity === "critical" 
              ? "border-l-critical bg-critical/10" 
              : "border-l-warning bg-warning/10"
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge 
                  variant={alert.severity === "critical" ? "destructive" : "secondary"}
                  className="text-sm font-bold px-4 py-2"
                >
                  {alert.severity.toUpperCase()} ALERT
                </Badge>
                <span className="text-sm text-muted-foreground font-medium">{alert.timestamp}</span>
              </div>
              <p className="text-lg font-medium text-foreground mb-4">{alert.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Sensor ID</p>
                  <p className="font-bold">{alert.sensorId}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Affected Personnel</p>
                  <p className="font-bold">{alert.affectedWorkers} workers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Hazard Zone Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg h-64 overflow-hidden border-2">
                <div className="absolute inset-0 p-4">
                  <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded relative">
                    {/* Hazard Zone */}
                    <div
                      className={`absolute border-2 rounded-lg ${
                        alert.severity === "critical" 
                          ? "bg-critical/80 border-critical" 
                          : "bg-warning/80 border-warning"
                      } shadow-lg`}
                      style={{
                        left: `${alert.coordinates.x}%`,
                        top: `${alert.coordinates.y}%`,
                        width: "20%",
                        height: "25%"
                      }}
                    >
                      <div className="p-2 text-white text-xs font-bold text-center">
                        <div>HAZARD</div>
                        <div>ZONE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Safe Route */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="h-5 w-5 mr-2" />
                Recommended Safe Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <p className="font-bold text-success mb-2">EVACUATION ROUTE</p>
                <p className="text-foreground">{alert.safeRoute}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Emergency Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-critical hover:bg-critical/90 text-white font-bold" size="lg">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send SMS Alert
            </Button>
            
            <Button variant="outline" className="w-full font-bold" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Export CAP XML
            </Button>
            
            <div className="pt-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium">Emergency Contacts:</p>
              <p>Site Manager: +1-800-MINE-MGR</p>
              <p>Emergency Services: 911</p>
              <p>Control Room: +1-800-CONTROL</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}