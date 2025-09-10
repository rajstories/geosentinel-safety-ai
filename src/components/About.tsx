import { Shield, Eye, Brain, Zap, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Eye,
    title: "Real-time Monitoring",
    description: "Continuous 24/7 monitoring of critical slope stability parameters using advanced sensor networks."
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Machine learning algorithms analyze sensor data patterns to predict potential slope failures before they occur."
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Immediate notifications when critical thresholds are exceeded, enabling rapid emergency response."
  },
  {
    icon: Users,
    title: "Multi-user Access", 
    description: "Secure access for mine operators, safety officers, and government regulators with role-based permissions."
  }
];

const specifications = [
  { label: "Sensor Types", value: "Strain, Vibration, Pore Pressure, Rainfall, Inclinometer" },
  { label: "Update Frequency", value: "Real-time (30-second intervals)" },
  { label: "Data Retention", value: "7 years of historical data" },
  { label: "Alert Response Time", value: "< 60 seconds" },
  { label: "System Uptime", value: "99.9% guaranteed availability" },
  { label: "Compliance", value: "ISO 45001, MSHA Standards" }
];

export function About() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-16 w-16 text-primary mr-4" />
          <h1 className="text-5xl font-bold text-primary">GeoSentinel AI</h1>
        </div>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
          Advanced artificial intelligence system for real-time slope stability monitoring and early warning in open-pit mining operations.
        </p>
        <div className="flex justify-center space-x-4">
          <Badge variant="default" className="px-4 py-2 text-sm">
            Government Certified
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            ISO 45001 Compliant
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            AI-Powered
          </Badge>
        </div>
      </div>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-center text-muted-foreground leading-relaxed">
            To protect lives and prevent catastrophic slope failures in mining operations through 
            cutting-edge AI monitoring technology, providing mine operators and safety personnel 
            with the critical information needed to make informed decisions and ensure worker safety.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-foreground">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <feature.icon className="h-6 w-6 mr-3 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-foreground">Technical Specifications</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between items-center p-4 rounded-lg bg-muted/30">
                  <span className="font-medium text-foreground">{spec.label}</span>
                  <span className="text-muted-foreground text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Award className="h-6 w-6 mr-3 text-primary" />
            Safety & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-success/10 border border-success/20">
              <Shield className="h-12 w-12 text-success mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Safety First</h3>
              <p className="text-sm text-muted-foreground">
                Designed with worker safety as the primary objective, meeting all international mining safety standards.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <Eye className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Regulatory Approved</h3>
              <p className="text-sm text-muted-foreground">
                Certified by government agencies and compliant with MSHA regulations and ISO 45001 standards.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-warning/10 border border-warning/20">
              <Zap className="h-12 w-12 text-warning mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">
                Successfully deployed in 47+ mining operations worldwide, preventing critical incidents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Get Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              For technical support, system configuration, or emergency assistance, contact our 24/7 support team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">Emergency Hotline</p>
                <p className="text-muted-foreground">+1-800-GEO-SAFE</p>
              </div>
              <div>
                <p className="font-medium">Technical Support</p>
                <p className="text-muted-foreground">support@geosentinel.ai</p>
              </div>
              <div>
                <p className="font-medium">System Status</p>
                <p className="text-muted-foreground">status.geosentinel.ai</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}