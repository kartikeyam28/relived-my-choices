import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TypewriterText from "@/components/TypewriterText";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Gauge, Target, Lightbulb, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  label: string;
  confidence: number;
  intensity: number;
  reflection: string;
  perspective: string;
  insights: string[];
  suggestions: string[];
}

const DemoAnalyzer = () => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const exampleRegret = "I turned down a job offer at a startup three years ago because I thought it was too risky. The company went public last year and all early employees became millionaires. I stayed at my safe corporate job and now feel stuck and underpaid.";

  const realAnalyze = async (text: string): Promise<AnalysisResult> => {
    console.log('Calling analyze-regret function with text:', text.substring(0, 100) + '...');
    
    const { data, error } = await supabase.functions.invoke('analyze-regret', {
      body: { text }
    });

    console.log('Function response:', { data, error });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Function error: ${error.message}`);
    }

    // Check if the response contains an error from the edge function
    if (data && data.error) {
      console.error('Edge function returned error:', data);
      throw new Error(`API Error: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
    }

    if (!data || !data.label) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response from analysis service');
    }

    return data as AnalysisResult;
  };

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const analysis = await realAnalyze(input);
      setResult(analysis);
      
      // Show success toast and redirect to dashboard
      toast({
        title: "Analysis Complete",
        description: "Redirecting to your personalized dashboard...",
      });
      
      // Redirect to dashboard with analysis results
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { analysisResult: analysis }
        });
      }, 1500);
      
    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to analyze decision. Please try again.";
      
      // Show more detailed error information
      console.error("Detailed error:", {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
        error: error
      });
      
      toast({
        title: "Analysis Failed",
        description: `${errorMessage}. Try testing the API connection first.`,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExample = () => {
    setInput(exampleRegret);
  };

  const handleTestAPI = async () => {
    setIsAnalyzing(true);
    
    try {
      console.log('Testing OpenAI API connection...');
      const { data, error } = await supabase.functions.invoke('test-openai');
      
      console.log('Test API response:', { data, error });
      
      if (error) {
        console.error('Test API supabase error:', error);
        toast({
          title: "API Test Failed",
          description: `Supabase Error: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      
      if (data?.success) {
        toast({
          title: "API Test Successful ✅",
          description: "OpenAI API connection is working properly!",
        });
      } else {
        console.error('Test API failed with data:', data);
        toast({
          title: "API Test Failed", 
          description: data?.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Test API catch error:', error);
      toast({
        title: "API Test Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const RegretMeter = ({ score }: { score: number }) => {
    const percentage = (score / 10) * 100;
    const rotation = (percentage / 100) * 180;
    
    return (
      <div className="relative w-32 h-16 mx-auto">
        <svg width="128" height="64" viewBox="0 0 128 64" className="transform rotate-0">
          {/* Background arc */}
          <path
            d="M 16 56 A 48 48 0 0 1 112 56"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Score arc */}
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
          {/* Gradient definition */}
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
            <div className="text-2xl font-bold text-foreground">{score}</div>
            <div className="text-xs text-muted-foreground">/ 10</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="demo" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            Try the Analyzer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience our AI-powered regret analysis tool. Describe a past decision 
            and get insights into your regret patterns.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Describe Your Decision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe a decision you regret or want to analyze. Be as detailed as possible about what happened, what choices you made, and how you feel about it now..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-32 resize-none border-border/50 focus:border-primary"
              />
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="ethnic"
                  onClick={handleAnalyze}
                  disabled={!input.trim() || isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Analyze Decision
                    </>
                  )}
                </Button>
                
                <Button
                  variant="mandala"
                  onClick={handleExample}
                  disabled={isAnalyzing}
                >
                  Try Example
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleTestAPI}
                  disabled={isAnalyzing}
                  className="min-w-fit"
                >
                  Test API
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-secondary" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!result && !isAnalyzing && (
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a decision above and click "Analyze" to see results</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-12">
                  <Brain className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
                  <p className="text-muted-foreground">AI is analyzing your decision...</p>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                   {/* Regret Type */}
                   <div>
                     <h4 className="font-semibold mb-2">Regret Type</h4>
                     <Badge variant="secondary" className="text-sm">
                       {result.label}
                     </Badge>
                   </div>

                   {/* Regret Meter */}
                   <div>
                     <h4 className="font-semibold mb-3">Regret Intensity</h4>
                     <RegretMeter score={result.intensity} />
                   </div>

                   {/* Confidence */}
                   <div>
                     <h4 className="font-semibold mb-2">Confidence</h4>
                     <div className="flex items-center gap-2">
                       <div className="flex-1 bg-muted rounded-full h-2">
                         <div
                           className="bg-gradient-ethnic h-2 rounded-full transition-all duration-1000"
                           style={{ width: `${result.confidence}%` }}
                         />
                       </div>
                       <span className="text-sm font-medium">
                         {result.confidence}%
                       </span>
                     </div>
                   </div>

                   {/* Alternative Perspective */}
                   <div>
                     <h4 className="font-semibold mb-3 flex items-center gap-2">
                       <Lightbulb className="h-4 w-4 text-accent" />
                       Alternative Perspective
                     </h4>
                     <div className="bg-muted/50 rounded-lg p-4">
                       <TypewriterText 
                         text={result.perspective}
                         speed={30}
                         delay={500}
                         className="text-sm leading-relaxed block"
                       />
                     </div>
                   </div>

                  {/* Insights */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Insights</h4>
                    <ul className="space-y-2">
                      {result.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoAnalyzer;