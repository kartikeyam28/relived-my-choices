import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, User, Lock } from "lucide-react";

const TimelineSection = () => {
  // Mock data for timeline entries
  const timelineEntries = [
    {
      id: 1,
      date: "2024-01-15",
      regretScore: 7.8,
      regretType: "Regret by Inaction",
      decision: "Didn't invest in crypto when Bitcoin was at $20k",
      insights: 3,
    },
    {
      id: 2,
      date: "2024-01-10",
      regretScore: 5.2,
      regretType: "Regret by Action",
      decision: "Bought an expensive car instead of saving for a house",
      insights: 4,
    },
    {
      id: 3,
      date: "2024-01-08",
      regretScore: 6.5,
      regretType: "Regret by Inaction",
      decision: "Didn't pursue a relationship with someone I really liked",
      insights: 5,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score <= 3) return "text-green-600 bg-green-100";
    if (score <= 6) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getTypeColor = (type: string) => {
    return type.includes("Inaction") 
      ? "bg-accent/20 text-accent border-accent/30" 
      : "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <section id="timeline" className="py-20 ethnic-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            Your Analysis Timeline
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your regret patterns over time and discover insights 
            about your decision-making journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Login Required State */}
          <Card className="ethnic-card mb-8 text-center p-8">
            <div className="mb-6">
              <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Sign In Required</h3>
              <p className="text-muted-foreground">
                Create an account to save your analyses and track your patterns over time
              </p>
            </div>
            <Button variant="ethnic" size="lg">
              <User className="h-4 w-4" />
              Sign In to Continue
            </Button>
          </Card>

          {/* Sample Timeline (Preview) */}
          <div className="space-y-6 opacity-75">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-ethnic rounded-full" />
              <h3 className="text-xl font-semibold text-muted-foreground">
                Sample Timeline (Preview)
              </h3>
            </div>

            {timelineEntries.map((entry, index) => (
              <Card key={entry.id} className="ethnic-card relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-ethnic rounded-l-2xl" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getScoreColor(entry.regretScore)}>
                        {entry.regretScore}/10
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(entry.regretType)}>
                        {entry.regretType}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-foreground mb-3 font-medium">
                    {entry.decision}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      <span>{entry.insights} insights generated</span>
                    </div>
                    
                    <Button variant="ghost" size="sm" disabled>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-75">
            <Card className="ethnic-card text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">6.5</div>
                <div className="text-sm text-muted-foreground">Average Regret Score</div>
              </CardContent>
            </Card>

            <Card className="ethnic-card text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-secondary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Total Analyses</div>
              </CardContent>
            </Card>

            <Card className="ethnic-card text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-accent mb-1">67%</div>
                <div className="text-sm text-muted-foreground">Inaction Regrets</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;