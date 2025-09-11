import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Heart, Info, Cpu, Lightbulb, Lock } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Cpu,
      title: "Advanced AI Models",
      description: "Powered by RoBERTa and DistilRoBERTa natural language processing models, combined with GPT-4 for nuanced understanding of emotional context and decision-making patterns."
    },
    {
      icon: Lightbulb,
      title: "Psychological Foundation",
      description: "Built on established research in action vs inaction regret, counterfactual thinking theory, and cognitive behavioral principles to provide scientifically-grounded insights."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your personal reflections remain confidential and secure. We process your input with end-to-end encryption and don't store sensitive information permanently."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            The Foundation of ReLiveAI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining cutting-edge artificial intelligence with psychological science to help you understand 
            and grow from your experiences. Our empathetic AI analyzes your reflections through the lens of 
            established research on regret, decision-making, and human psychology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="ethnic-card text-center hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* NLP Models & Psychological Grounding */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="ethnic-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4 flex items-center justify-center gap-3">
                <Brain className="h-6 w-6 text-primary" />
                How Our AI Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-3 text-primary flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    NLP Models (RoBERTa, DistilRoBERTa)
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Our system leverages state-of-the-art transformer models including RoBERTa 
                    (Robustly Optimized BERT) and DistilRoBERTa for deep understanding of natural language. 
                    These models excel at capturing emotional nuances, contextual meaning, and the subtle 
                    patterns in how people express regret and decision-making processes.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-3 text-secondary flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Psychological Grounding
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Every analysis is grounded in established psychological research on action vs inaction regret, 
                    counterfactual thinking theory, and cognitive behavioral principles. We understand that regret 
                    by inaction often feels more persistent, while regret by action tends to fade faster - 
                    insights crucial for personalized guidance.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-semibold text-lg text-accent text-center">Our Ethical Values</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h5 className="font-medium mb-2">Privacy</h5>
                    <p className="text-sm text-muted-foreground">
                      End-to-end encryption ensures your reflections remain completely private and secure.
                    </p>
                  </div>
                  <div className="text-center">
                    <Heart className="h-8 w-8 text-secondary mx-auto mb-3" />
                    <h5 className="font-medium mb-2">Empathy</h5>
                    <p className="text-sm text-muted-foreground">
                      Every response is crafted with compassion, understanding, and respect for human complexity.
                    </p>
                  </div>
                  <div className="text-center">
                    <Brain className="h-8 w-8 text-accent mx-auto mb-3" />
                    <h5 className="font-medium mb-2">No Judgment</h5>
                    <p className="text-sm text-muted-foreground">
                      We provide insights for growth and understanding, never criticism or prescriptive advice.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tagline & Disclaimer */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <blockquote className="text-2xl italic text-primary font-medium mb-4">
              "Your reflections remain yours. We provide guidance, not prescriptions."
            </blockquote>
            <div className="ornament-divider mx-auto max-w-md"></div>
          </div>

          <Card className="ethnic-card border-l-4 border-primary">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-2">Important Disclaimer</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ReLiveAI is designed for reflection and self-understanding, not as a substitute 
                    for professional mental health care. If you're experiencing persistent distress, 
                    anxiety, or depression, please consider consulting with a qualified mental health professional. 
                    This tool is for reflection and growth, not a substitute for professional advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;