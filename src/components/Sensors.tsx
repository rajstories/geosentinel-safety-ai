import { Activity, Battery, Wifi, MapPin, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const sensorData = [
  {
    id: "STR-089",
    name: "Strain Gauge Alpha",
    type: "Strain",
    location: "Sector 5, North Wall",
    status: "online",
    battery: 87,
    signal: 95,
    lastReading: "2 mins ago",
    value: "0.05mm",
    threshold: "Critical: >2.0mm"
  },
  {
    id: "VIB-073", 
    name: "Seismic Monitor Beta",
    type: "Vibration",
    location: "Sector 7, Level 3",
    status: "alert",
    battery: 92,
    signal: 88,
    lastReading: "1 min ago",
    value: "15.2 Hz",
    threshold: "Warning: >10 Hz"
  },
  {
    id: "PPR-156",
    name: "Pore Pressure Sensor",
    type: "Pore Pressure", 
    location: "Sector 12, Drainage Point B",
    status: "warning",
    battery: 76,
    signal: 82,
    lastReading: "3 mins ago",
    value: "45.2 kPa",
    threshold: "Critical: >50 kPa"
  },
  {
    id: "WTH-001",
    name: "Weather Station Central",
    type: "Rainfall",
    location: "Site Center, Elevation 450m",
    status: "online", 
    battery: 95,
    signal: 98,
    lastReading: "30 secs ago",
    value: "85mm/24h",
    threshold: "Warning: >75mm"
  },
  {
    id: "INC-204",
    name: "Inclinometer Delta", 
    type: "Tilt",
    location: "Sector 3, East Slope",
    status: "online",
    battery: 83,
    signal: 91,
    lastReading: "1 min ago", 
    value: "0.8°",
    threshold: "Critical: >2.0°"
  },
  {
    id: "STR-112",
    name: "Strain Gauge Gamma",
    type: "Strain",
    location: "Sector 8, South Wall", 
    status: "offline",
    battery: 12,
    signal: 0,
    lastReading: "2 hours ago",
    value: "N/A",
    threshold: "Critical: >2.0mm"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "success";
    case "warning": return "warning";
    case "alert": return "critical";
    case "offline": return "muted";
    default: return "muted";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "online": return "default";
    case "warning": return "secondary";
    case "alert": return "destructive"; 
    case "offline": return "outline";
    default: return "outline";
  }
};

const getBatteryColor = (battery: number) => {
  if (battery > 50) return "text-success";
  if (battery > 20) return "text-warning"; 
  return "text-critical";
};

const getSignalColor = (signal: number) => {
  if (signal > 80) return "text-success";
  if (signal > 50) return "text-warning";
  return "text-critical";
};

export function Sensors() {
  const onlineSensors = sensorData.filter(s => s.status === "online").length;
  const totalSensors = sensorData.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Sensor Network</h1>
        <p className="text-xl text-muted-foreground">Monitor all field devices and data collection</p>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online Sensors</p>
                <p className="text-3xl font-bold text-success">{onlineSensors}/{totalSensors}</p>
              </div>
              <Activity className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-3xl font-bold text-critical">2</p>
              </div>
              <AlertCircle className="h-8 w-8 text-critical" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Battery</p>
                <p className="text-3xl font-bold text-warning">71%</p>
              </div>
              <Battery className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Health</p>
                <p className="text-3xl font-bold text-success">92%</p>
              </div>
              <Wifi className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorData.map((sensor) => (
          <Card key={sensor.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{sensor.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={getStatusBadge(sensor.status)} className="text-xs">
                      {sensor.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {sensor.type}
                    </Badge>
                  </div>
                </div>
                <Activity className={`h-5 w-5 ${getStatusColor(sensor.status) === "success" ? "text-success" : 
                  getStatusColor(sensor.status) === "warning" ? "text-warning" : 
                  getStatusColor(sensor.status) === "critical" ? "text-critical" : "text-muted-foreground"}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {sensor.location}
                </div>
                <p className="text-xs text-muted-foreground">ID: {sensor.id}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Battery</span>
                    <span className={getBatteryColor(sensor.battery)}>{sensor.battery}%</span>
                  </div>
                  <Progress value={sensor.battery} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Signal</span>
                    <span className={getSignalColor(sensor.signal)}>{sensor.signal}%</span>
                  </div>
                  <Progress value={sensor.signal} className="h-2" />
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Current Reading</span>
                  <span className="text-sm font-medium">{sensor.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{sensor.threshold}</p>
                <p className="text-xs text-muted-foreground">Last: {sensor.lastReading}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}