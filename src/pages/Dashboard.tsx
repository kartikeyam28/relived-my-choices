import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Brain, ArrowLeft, Target, Lightbulb, TrendingUp, Heart, CheckCircle, AlertTriangle, Smile, Clock, Lock, Download } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  label: string;
  confidence: number;
  intensity: number;
  reflection: string;
  perspective: string;
  insights: string[];
  suggestions: string[];
  affectedDomain: string;
  emotionalTone: {
    primary: string;
    secondary: string[];
  };
  currentImpact: string;
  futureProjection: string;
  irreversibleLimitation: string;
  threatAnalysis: {
    stress: { level: string; score: number };
    anxiety: { level: string; score: number };
    motivationLoss: { level: string; score: number };
    healthRisk: { level: string; score: number };
  };
}

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (location.state?.analysisResult) {
      setResult(location.state.analysisResult);
    } else {
      // Redirect to home if no analysis result
      navigate('/');
    }
  }, [location.state, navigate]);

  const generatePDF = async () => {
    if (!dashboardRef.current || !result) return;

    setIsGeneratingPDF(true);
    toast({
      title: "Generating PDF",
      description: "Please wait while we create your analysis report...",
    });

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;

      // Helper function to add text with word wrap
      const addText = (text: string, fontSize: number, isBold: boolean = false, color: [number, number, number] = [0, 0, 0]) => {
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", isBold ? "bold" : "normal");
        pdf.setTextColor(color[0], color[1], color[2]);
        const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
        
        lines.forEach((line: string) => {
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += fontSize * 0.5;
        });
        yPosition += 3;
      };

      // Helper function to check and add new page
      const checkNewPage = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Title Page
      pdf.setFillColor(139, 69, 19);
      pdf.rect(0, 0, pageWidth, 50, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text("ReLiveAI", pageWidth / 2, 25, { align: "center" });
      pdf.setFontSize(16);
      pdf.text("Regret Analysis Report", pageWidth / 2, 38, { align: "center" });
      
      yPosition = 65;
      pdf.setTextColor(0, 0, 0);

      // Date
      addText(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 10, false, [100, 100, 100]);
      yPosition += 5;

      // Summary Section
      addText("Analysis Summary", 18, true, [139, 69, 19]);
      pdf.setDrawColor(139, 69, 19);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      addText(`Regret Type: ${result.label}`, 12, true);
      addText(`Regret Intensity: ${result.intensity.toFixed(1)} / 10`, 12, true);
      addText(`Analysis Confidence: ${result.confidence}%`, 12, true);
      addText(`Affected Domain: ${result.affectedDomain}`, 12, true);
      yPosition += 5;

      // Emotional Tone
      checkNewPage(40);
      addText("Emotional Analysis", 16, true, [139, 69, 19]);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
      addText(`Primary Emotion: ${result.emotionalTone.primary}`, 11, true);
      addText(`Secondary Emotions: ${result.emotionalTone.secondary.join(', ')}`, 11, false);
      yPosition += 5;

      // Reflection
      checkNewPage(50);
      addText("Your Reflection", 16, true, [139, 69, 19]);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
      addText(result.reflection, 10, false);
      yPosition += 5;

      // Alternative Perspective
      checkNewPage(50);
      addText("Alternative Perspective", 16, true, [139, 69, 19]);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
      addText(result.perspective, 10, false);
      yPosition += 5;

      // Impact Analysis
      checkNewPage(70);
      addText("Impact Analysis", 16, true, [139, 69, 19]);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
      
      addText("Current Impact:", 12, true);
      addText(result.currentImpact, 10, false);
      yPosition += 3;
      
      addText("Future Projection:", 12, true);
      addText(result.futureProjection, 10, false);
      yPosition += 3;
      
      addText("Irreversible Limitation:", 12, true);
      addText(result.irreversibleLimitation, 10, false);
      yPosition += 5;

      // Threat Analysis
      checkNewPage(80);
      addText("Threat Analysis - Emotional & Health Perspective", 16, true, [139, 69, 19]);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      const threats = [
        { name: 'Stress', data: result.threatAnalysis.stress },
        { name: 'Anxiety', data: result.threatAnalysis.anxiety },
        { name: 'Motivation Loss', data: result.threatAnalysis.motivationLoss },
        { name: 'Health Risk', data: result.threatAnalysis.healthRisk }
      ];

      threats.forEach((threat) => {
        checkNewPage(20);
        addText(`${threat.name}: ${threat.data.level} (${threat.data.score}/5)`, 11, true);
        
        // Draw progress bar
        const barWidth = 60;
        const barHeight = 4;
        pdf.setFillColor(230, 230, 230);
        pdf.rect(margin + 5, yPosition, barWidth, barHeight, 'F');
        
        const fillWidth = (threat.data.score / 5) * barWidth;
        const color = threat.data.level === 'High' ? [239, 68, 68] : 
                     threat.data.level === 'Medium' ? [251, 146, 60] : [34, 197, 94];
        pdf.setFillColor(color[0], color[1], color[2]);
        pdf.rect(margin + 5, yPosition, fillWidth, barHeight, 'F');
        
        yPosition += 10;
      });
      yPosition += 5;

      // Psychological Insights
      checkNewPage(60);
      addText("Psychological Insights", 16, true, [139, 69, 19]);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      result.insights.forEach((insight, index) => {
        checkNewPage(25);
        addText(`${index + 1}. ${insight}`, 10, false);
        yPosition += 2;
      });
      yPosition += 5;

      // Growth Suggestions
      checkNewPage(60);
      addText("Growth Suggestions", 16, true, [139, 69, 19]);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      result.suggestions.forEach((suggestion, index) => {
        checkNewPage(25);
        addText(`${index + 1}. ${suggestion}`, 10, false);
        yPosition += 2;
      });
      yPosition += 10;

      // Disclaimer
      checkNewPage(30);
      pdf.setFillColor(250, 250, 250);
      pdf.rect(margin, yPosition, pageWidth - 2 * margin, 20, 'F');
      yPosition += 7;
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(100, 100, 100);
      const disclaimerLines = pdf.splitTextToSize(
        "This tool is for reflection and growth, not a substitute for professional advice. If you're experiencing significant distress, please consult with a qualified mental health professional.",
        pageWidth - 2 * margin - 10
      );
      disclaimerLines.forEach((line: string) => {
        pdf.text(line, pageWidth / 2, yPosition, { align: "center" });
        yPosition += 4;
      });

      // Save PDF
      pdf.save(`ReLiveAI_Analysis_${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: "PDF Generated Successfully",
        description: "Your analysis report has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading analysis...</p>
        </div>
      </div>
    );
  }

  // Data for charts
  const regretScoreData = [
    { name: 'Your Score', value: result.intensity },
    { name: 'Average', value: 5.2 },
    { name: 'Maximum', value: 10 }
  ];

  const regretTypeData = [
    { name: 'Regret by Action', value: result.label === 'Regret by Action' ? 1 : 0, color: '#ef4444' },
    { name: 'Regret by Inaction', value: result.label === 'Regret by Inaction' ? 1 : 0, color: '#f97316' },
    { name: 'No Regret', value: result.label === 'No Regret' ? 1 : 0, color: '#22c55e' }
  ];

  const confidenceData = [
    { name: 'Analysis Confidence', value: result.confidence }
  ];

  const RegretMeter = ({ score }: { score: number }) => {
    const percentage = (score / 10) * 100;
    
    return (
      <div className="relative w-32 h-16 mx-auto">
        <svg width="128" height="64" viewBox="0 0 128 64" className="transform rotate-0">
          <path
            d="M 16 56 A 48 48 0 0 1 112 56"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 16 56 A 48 48 0 0 1 112 56"
            fill="none"
            stroke="url(#regretGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="150.8"
            strokeDashoffset={150.8 - (150.8 * percentage) / 100}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="regretGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--ethnic-gold))" />
              <stop offset="100%" stopColor="hsl(var(--destructive))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{score.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">/ 10</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle" ref={dashboardRef}>
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold hero-text">Regret Analysis Dashboard</h1>
                <p className="text-muted-foreground">Your personalized insights and analytics</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="ethnic">
                <Brain className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Regret Type */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Regret Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {result.label}
              </Badge>
            </CardContent>
          </Card>

          {/* Regret Score */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle>Regret Intensity</CardTitle>
            </CardHeader>
            <CardContent>
              <RegretMeter score={result.intensity} />
            </CardContent>
          </Card>

          {/* Confidence */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle>Analysis Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {result.confidence}%
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-ethnic h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart - Regret Score Comparison */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Regret Score Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regretScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" opacity="0.6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart - Regret Type Distribution */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle>Regret Type Classification</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={regretTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {regretTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 0 ? entry.color : '#e5e7eb'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {regretTypeData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded" 
                        style={{ backgroundColor: entry.value > 0 ? entry.color : '#e5e7eb' }}
                      />
                      <span className={entry.value > 0 ? 'font-medium' : 'text-muted-foreground'}>
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Affected Domain & Emotional Tone */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Affected Life Domain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 rounded-lg p-6 text-center">
                <p className="text-xl font-semibold text-foreground">{result.affectedDomain}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-accent" />
                Emotional Tone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent">
                  <p className="text-sm text-muted-foreground mb-1">Primary Emotion</p>
                  <p className="text-lg font-semibold text-foreground">{result.emotionalTone.primary}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Secondary Emotions</p>
                  <div className="flex flex-wrap gap-2">
                    {result.emotionalTone.secondary.map((emotion, index) => (
                      <Badge key={index} variant="secondary">{emotion}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reflection & Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-secondary" />
                Your Reflection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="text-foreground leading-relaxed">{result.reflection}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Alternative Perspective
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6">
                <TypewriterText 
                  text={result.perspective}
                  speed={30}
                  delay={500}
                  className="text-foreground leading-relaxed block"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Impact, Future Projection & Irreversible Limitation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Current Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/10 rounded-lg p-4">
                <p className="text-sm leading-relaxed text-foreground">{result.currentImpact}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Future Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm leading-relaxed text-foreground">{result.futureProjection}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" />
                Irreversible Limitation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-accent/10 rounded-lg p-4">
                <p className="text-sm leading-relaxed text-foreground">{result.irreversibleLimitation}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Threat Analysis */}
        <Card className="ethnic-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Threat Analysis - Emotional & Health Perspective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Threat Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Risk Level</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-medium">Stress</td>
                    <td className="py-3 px-4">
                      <Badge variant={result.threatAnalysis.stress.level === 'High' ? 'destructive' : result.threatAnalysis.stress.level === 'Medium' ? 'secondary' : 'outline'}>
                        {result.threatAnalysis.stress.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{result.threatAnalysis.stress.score} / 5</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-muted rounded-full h-2 max-w-[120px]">
                        <div 
                          className="bg-gradient-to-r from-primary to-destructive h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(result.threatAnalysis.stress.score / 5) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-medium">Anxiety</td>
                    <td className="py-3 px-4">
                      <Badge variant={result.threatAnalysis.anxiety.level === 'High' ? 'destructive' : result.threatAnalysis.anxiety.level === 'Medium' ? 'secondary' : 'outline'}>
                        {result.threatAnalysis.anxiety.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{result.threatAnalysis.anxiety.score} / 5</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-muted rounded-full h-2 max-w-[120px]">
                        <div 
                          className="bg-gradient-to-r from-primary to-destructive h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(result.threatAnalysis.anxiety.score / 5) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-medium">Motivation Loss</td>
                    <td className="py-3 px-4">
                      <Badge variant={result.threatAnalysis.motivationLoss.level === 'High' ? 'destructive' : result.threatAnalysis.motivationLoss.level === 'Medium' ? 'secondary' : 'outline'}>
                        {result.threatAnalysis.motivationLoss.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{result.threatAnalysis.motivationLoss.score} / 5</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-muted rounded-full h-2 max-w-[120px]">
                        <div 
                          className="bg-gradient-to-r from-primary to-destructive h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(result.threatAnalysis.motivationLoss.score / 5) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-medium">Health Risk</td>
                    <td className="py-3 px-4">
                      <Badge variant={result.threatAnalysis.healthRisk.level === 'High' ? 'destructive' : result.threatAnalysis.healthRisk.level === 'Medium' ? 'secondary' : 'outline'}>
                        {result.threatAnalysis.healthRisk.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{result.threatAnalysis.healthRisk.score} / 5</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-muted rounded-full h-2 max-w-[120px]">
                        <div 
                          className="bg-gradient-to-r from-primary to-destructive h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(result.threatAnalysis.healthRisk.score / 5) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights & Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Psychological Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.insights.map((insight, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                Growth Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download PDF Button */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="ethnic"
            size="lg"
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="min-w-[250px]"
          >
            {isGeneratingPDF ? (
              <>
                <Brain className="h-5 w-5 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Download Analysis Report (PDF)
              </>
            )}
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <div className="ornament-divider mx-auto max-w-md mb-6"></div>
          <p className="text-sm text-muted-foreground italic">
            "This tool is for reflection and growth, not a substitute for professional advice."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;