import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, BookOpen, Users, Lock, Eye } from "lucide-react";
import aiBrainIcon from "@/assets/ai-brain-icon.jpg";

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "RoBERTa for regret detection and GPT-4 for counterfactual generation",
      details: "Our system combines state-of-the-art language models to understand the nuances of human regret and generate meaningful alternative scenarios."
    },
    {
      icon: BookOpen,
      title: "Psychological Foundation",
      description: "Based on established research in counterfactual thinking",
      details: "Grounded in decades of psychology research on regret, decision-making, and the cognitive patterns that shape our emotional responses to past choices."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and never shared with third parties",
      details: "We implement end-to-end encryption and give you complete control over your data. Delete your analyses anytime with one click."
    }
  ];

  const psychologyPoints = [
    "Action vs. Inaction Regret: Research shows we regret things we didn't do more than things we did",
    "Counterfactual Thinking: The human tendency to imagine alternative outcomes helps us learn",
    "Regret Intensity: Measured through linguistic analysis and emotional indicators",
    "Decision Patterns: Understanding your regret types helps improve future choices"
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            About ReLiveAI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine cutting-edge AI with established psychological research 
            to help you understand and learn from your past decisions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* AI System Overview */}
          <Card className="ethnic-card mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    How Our AI Works
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    ReLiveAI uses a sophisticated multi-model approach to analyze your decisions. 
                    Our RoBERTa-based classifier identifies regret patterns with 94% accuracy, 
                    while our counterfactual generator creates realistic alternative scenarios 
                    to help you explore "what if" situations.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">Natural Language Processing for emotion detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-sm">Machine Learning for regret classification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm">Generative AI for counterfactual scenarios</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <img
                    src={aiBrainIcon}
                    alt="AI Brain with ethnic patterns"
                    className="w-64 h-64 mx-auto rounded-2xl shadow-warm ethnic-pattern p-4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="ethnic-card h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-gradient-ethnic rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium mb-3 text-foreground">
                      {feature.description}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.details}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Psychology Foundation */}
          <Card className="ethnic-card mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="h-6 w-6 text-accent" />
                Psychological Foundation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our analysis is grounded in decades of psychological research on regret, 
                decision-making, and counterfactual thinking. We leverage established frameworks 
                to provide scientifically-backed insights into your decision patterns.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {psychologyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-ethnic flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Safety */}
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Privacy & Safety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-secondary" />
                    Data Protection
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• End-to-end encryption for all personal data</li>
                    <li>• No sharing with third parties, ever</li>
                    <li>• Complete user control over data retention</li>
                    <li>• Anonymous analytics only for improving the service</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-accent" />
                    Transparency
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Clear confidence scores for all analyses</li>
                    <li>• Explanation of AI decision-making process</li>
                    <li>• Open about model limitations and biases</li>
                    <li>• Regular model updates and performance reports</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Remember:</strong> ReLiveAI is a tool for self-reflection and learning, 
                  not a replacement for professional therapy or counseling. For serious emotional 
                  issues, please consult with qualified mental health professionals.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;