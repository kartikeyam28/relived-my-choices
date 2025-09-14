import { Heart, Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "How It Works", href: "#how-it-works" },
        { name: "Try Demo", href: "#demo" },
        { name: "Timeline", href: "#timeline" },
        { name: "About", href: "#about" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQ", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Psychology Research", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.getElementById(sectionId.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-gradient-subtle border-t border-border/50">
      {/* Ornamental Divider */}
      <div className="ornament-divider mb-16" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-ethnic rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold">R</span>
              </div>
              <span className="font-bold text-2xl hero-text">ReLiveAI</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Empowering better decision-making through AI-powered regret analysis 
              and counterfactual thinking. Learn from your past to build a better future.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 hover:text-primary transition-smooth"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="ethnic-card p-6 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Get insights on decision-making psychology and updates on new features.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="ethnic">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Ornamental Divider */}
        <div className="ornament-divider mx-auto max-w-lg mb-8"></div>
        
        <div className="border-t border-border/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 ReLiveAI. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button onClick={() => scrollToSection('privacy')} className="hover:text-primary transition-colors">
                  Privacy Policy
                </button>
                <span>|</span>
                <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">
                  Contact
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
              Made in India 🇮🇳 with AI and Care
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;