import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Brain, ArrowLeft, Target, Lightbulb, TrendingUp, Heart, CheckCircle } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";

interface AnalysisResult {
  label: string;
  confidence: number;
  intensity: number;
  reflection: string;
  perspective: string;
  insights: string[];
  suggestions: string[];
}

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (location.state?.analysisResult) {
      setResult(location.state.analysisResult);
    } else {
      // Redirect to home if no analysis result
      navigate('/');
    }
  }, [location.state, navigate]);

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
    <div className="min-h-screen bg-gradient-subtle">
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