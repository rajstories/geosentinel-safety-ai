import { useState } from "react";
import { CheckCircle, AlertTriangle, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerificationModal } from "./VerificationModal";

const pendingAlerts = [
  {
    id: "ALT-001",
    title: "Vibration Anomaly Detected",
    location: "Sector 7, Level 3",
    severity: "critical" as const,
    timestamp: "2 minutes ago",
    description: "Seismic sensors detecting unusual vibration patterns indicating potential instability. Immediate verification required before escalation to emergency protocols.",
    sensorId: "VIB-073"
  },
  {
    id: "ALT-002",
    title: "Pore Pressure Rising",
    location: "Sector 12, Drainage Point B",
    severity: "warning" as const,
    timestamp: "8 minutes ago",
    description: "Groundwater pressure exceeding normal parameters. Field inspection recommended to assess drainage system effectiveness.",
    sensorId: "PPR-156"
  }
];

const recentVerifications = [
  {
    id: "VER-001",
    alertTitle: "Strain Gauge Offline",
    action: "dismissed",
    operator: "OP-247",
    timestamp: "15 minutes ago",
    notes: "False alarm - sensor temporarily disconnected during maintenance"
  },
  {
    id: "VER-002", 
    alertTitle: "Rainfall Threshold Exceeded",
    action: "approved",
    operator: "OP-152",
    timestamp: "45 minutes ago",
    notes: "Confirmed excessive rainfall, slope monitoring increased to hourly intervals"
  },
  {
    id: "VER-003",
    alertTitle: "Temperature Sensor Malfunction",
    action: "dismissed",
    operator: "OP-091",
    timestamp: "1 hour ago",
    notes: "Equipment error resolved, sensor recalibrated and operational"
  }
];

export function Verification() {
  const [selectedAlert, setSelectedAlert] = useState<typeof pendingAlerts[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVerifyAlert = (alert: typeof pendingAlerts[0]) => {
    setSelectedAlert(alert);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAlert(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Alert Verification</h1>
        <p className="text-xl text-muted-foreground">Review and verify system-generated safety alerts</p>
      </div>

      {/* Verification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Verification</p>
                <p className="text-3xl font-bold text-warning">{pendingAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Today</p>
                <p className="text-3xl font-bold text-success">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-3xl font-bold text-primary">4.2m</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Alerts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Pending Verification</h2>
        
        {pendingAlerts.length > 0 ? (
          <div className="space-y-4">
            {pendingAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-warning">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={alert.severity === "critical" ? "destructive" : "secondary"}
                          className="text-xs font-medium"
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          REQUIRES VERIFICATION
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{alert.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{alert.location}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                        <span>•</span>
                        <span>ID: {alert.sensorId}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleVerifyAlert(alert)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Verify Alert
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">No alerts pending verification at this time.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Verifications */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Recent Verifications</h2>
        
        <div className="space-y-3">
          {recentVerifications.map((verification) => (
            <Card key={verification.id} className="transition-all hover:shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <Badge 
                        variant={verification.action === "approved" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {verification.action.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{verification.alertTitle}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {verification.operator}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {verification.timestamp}
                      </div>
                    </div>
                    {verification.notes && (
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        "{verification.notes}"
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    {verification.action === "approved" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <VerificationModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        alert={selectedAlert}
      />
    </div>
  );
}