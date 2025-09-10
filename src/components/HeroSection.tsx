import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Users } from "lucide-react";
import heroPattern from "@/assets/hero-pattern.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-subtle" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-text">
            Reflect. Relearn. ReLive.
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Understand your past decisions, explore the 'what ifs', and make 
            better choices with AI-powered regret analysis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("demo")}
              className="animate-pulse-warm"
            >
              <Brain className="h-5 w-5" />
              Analyze a Decision
            </Button>
            <Button
              variant="mandala"
              size="xl"
              onClick={() => scrollToSection("how-it-works")}
            >
              Learn More
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="ethnic-card">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">7.2</div>
                <div className="text-sm text-muted-foreground">Average Regret Score</div>
              </CardContent>
            </Card>

            <Card className="ethnic-card">
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 text-secondary mx-auto mb-3" />
                <div className="text-2xl font-bold text-secondary mb-1">94%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </CardContent>
            </Card>

            <Card className="ethnic-card">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-accent mb-1">12,547</div>
                <div className="text-sm text-muted-foreground">Sessions Analyzed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;