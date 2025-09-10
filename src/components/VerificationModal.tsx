import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, User, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: {
    id: string;
    title: string;
    severity: "warning" | "critical";
    location: string;
    description: string;
    timestamp: string;
    sensorId: string;
  } | null;
}

export function VerificationModal({ isOpen, onClose, alert }: VerificationModalProps) {
  const [action, setAction] = useState<"approve" | "dismiss" | null>(null);
  const [notes, setNotes] = useState("");
  const [operatorId, setOperatorId] = useState("");

  const handleSubmit = () => {
    if (!action || !operatorId.trim()) return;
    
    // In a real app, this would send data to backend
    console.log({
      alertId: alert?.id,
      action,
      notes: notes.trim(),
      operatorId: operatorId.trim(),
      timestamp: new Date().toISOString()
    });
    
    // Reset form
    setAction(null);
    setNotes("");
    setOperatorId("");
    onClose();
  };

  const handleCancel = () => {
    setAction(null);
    setNotes("");
    setOperatorId("");
    onClose();
  };

  if (!alert) return null;

  const getSeverityColor = (severity: "warning" | "critical") => {
    return severity === "critical" ? "destructive" : "secondary";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <AlertTriangle className="h-6 w-6 mr-2 text-warning" />
            Alert Verification Required
          </DialogTitle>
          <DialogDescription>
            Review and verify the following safety alert before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Details */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg">{alert.title}</h3>
              <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                {alert.severity.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {alert.timestamp}
              </div>
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {alert.location}
              </div>
              <div>
                <strong>Sensor ID:</strong> {alert.sensorId}
              </div>
            </div>
            
            <p className="text-sm">{alert.description}</p>
          </div>

          {/* Action Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Verification Action</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={action === "approve" ? "default" : "outline"}
                onClick={() => setAction("approve")}
                className={`justify-start h-auto p-4 ${
                  action === "approve" ? "bg-success hover:bg-success/90 text-white" : ""
                }`}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Approve Alert</div>
                  <div className="text-xs opacity-75">Confirm safety risk</div>
                </div>
              </Button>
              
              <Button
                variant={action === "dismiss" ? "default" : "outline"}
                onClick={() => setAction("dismiss")}
                className={`justify-start h-auto p-4 ${
                  action === "dismiss" ? "bg-critical hover:bg-critical/90 text-white" : ""
                }`}
              >
                <XCircle className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Dismiss Alert</div>
                  <div className="text-xs opacity-75">False alarm</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Operator ID */}
          <div className="space-y-2">
            <Label htmlFor="operator-id">Operator ID</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="operator-id"
                placeholder="Enter your operator ID"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this verification..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!action || !operatorId.trim()}
            className={
              action === "approve" 
                ? "bg-success hover:bg-success/90" 
                : action === "dismiss" 
                ? "bg-critical hover:bg-critical/90" 
                : ""
            }
          >
            {action === "approve" && "Approve Alert"}
            {action === "dismiss" && "Dismiss Alert"}
            {!action && "Select Action"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}