import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Brain, Lightbulb, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Edit,
      title: "Input",
      description: "Describe a decision you regret or want to analyze",
      details: "Share your experience in detail - what happened, what choices you made, and how you feel about it now.",
      color: "text-primary",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Brain,
      title: "Analyze",
      description: "AI determines regret type and intensity",
      details: "Our RoBERTa-based model identifies whether you feel regret by action or inaction, measuring intensity on a 0-10 scale.",
      color: "text-secondary",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: Lightbulb,
      title: "Simulate",
      description: "Explore counterfactual narratives and insights",
      details: "Discover what might have happened with different choices, gaining valuable insights for future decisions.",
      color: "text-accent",
      gradient: "from-accent/20 to-accent/5"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 ethnic-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system uses advanced psychology and machine learning 
            to help you understand and learn from your decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                <Card className={`ethnic-card h-full bg-gradient-to-br ${step.gradient}`}>
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-ethnic flex items-center justify-center ${step.color}`}>
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <CardTitle className={`text-2xl ${step.color}`}>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-lg font-medium mb-3 text-foreground">
                      {step.description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.details}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-primary/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-card/50 backdrop-blur-sm rounded-full px-8 py-4 border border-border/50">
            <span className="text-sm font-medium text-muted-foreground">
              Powered by
            </span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-primary">RoBERTa</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-semibold text-secondary">GPT-4</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-semibold text-accent">Psychology Research</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;