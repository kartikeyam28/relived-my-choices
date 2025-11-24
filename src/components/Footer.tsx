import { Heart, Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const dialogContent: Record<string, { title: string; content: string }> = {
    "product-overview": {
      title: "Product Overview",
      content: "Our platform is designed to help individuals, teams, and organizations understand human behavior and decision making with clarity. Built with advanced artificial intelligence and modern interaction design principles, the product delivers accurate insights, actionable analytics, and real-time predictive understanding. From emotion analysis to cognitive pattern mapping, it provides a smooth and intuitive experience that adapts to every user. The product is suitable for educational institutions, corporate environments, researchers, mental health professionals, and end users seeking deeper self-awareness."
    },
    "how-it-works": {
      title: "How It Works",
      content: "The system operates on a multi-layer architecture that combines data input, behavior modeling, and insight generation. Users begin by interacting with a simple interface or uploading relevant data. The platform then processes the information through its AI engine, which includes natural language understanding, behavioral analysis models, and psychological pattern detection. These components work together to identify trends, predict potential outcomes, and generate meaningful interpretations. The final output is presented in clear dashboards and reports that are easy to understand and ready to share."
    },
    "demo": {
      title: "Try Demo",
      content: "The interactive demo allows new users to experience the platform in real time. It showcases key features such as instant analysis, personalized summaries, and guided workflows. Visitors can test sample scenarios, upload custom text or data, and view live insights produced by the engine. The demo is optimized to give an accurate representation of the full product without requiring registration or technical expertise."
    },
    "about": {
      title: "About",
      content: "We are a team of engineers, behavioral scientists, designers, and AI researchers focused on making complex psychological insights accessible and reliable. Our mission is to bridge the gap between human intuition and data-driven understanding. With a commitment to accuracy, transparency, and user empowerment, we continuously improve our models and user experience to support a wide range of applications across industries."
    },
    "privacy-policy": {
      title: "Privacy Policy",
      content: "We prioritize the privacy of all users and enforce strict data protection standards. All user data is encrypted during storage and transmission. The platform does not share or sell personal information and allows users to control their own data preferences, including retrieval and deletion. Our privacy practices comply with global data protection regulations and undergo regular security reviews."
    },
    "terms-of-service": {
      title: "Terms of Service",
      content: "The terms of service establish the legal framework for using the platform. They cover acceptable use guidelines, account responsibilities, intellectual property rights, service limitations, and liability boundaries. By using the platform, users agree to follow these rules to maintain safety, transparency, and fairness for all participants."
    },
    "contact-us": {
      title: "Contact Us",
      content: "For inquiries, partnerships, feedback, or custom project discussions, our team can be reached through email, web forms, or business communication channels. We aim to respond within one business day and ensure that every request is handled with clarity and professionalism."
    },
    "faq": {
      title: "FAQ",
      content: "The FAQ section provides quick answers to common questions about features, pricing, security, functionality, and account management. It is updated regularly based on user feedback and product improvements, helping visitors find information efficiently without waiting for support responses."
    },
    "psychology-research": {
      title: "Psychology Research",
      content: "This segment highlights the scientific foundation behind the platform. It includes published papers, real-world studies, and validated models that support the system's accuracy and reliability. The platform is built upon established psychological frameworks and continuously refined through academic collaboration and research trials."
    },
    "api-documentation": {
      title: "API Documentation",
      content: "Developers can integrate the platform into their own applications using the available APIs. The documentation includes endpoint descriptions, authentication methods, example requests, response formats, and best practices for implementation. It is designed to be clear, structured, and accessible for developers at all levels."
    },
    "blog": {
      title: "Blog",
      content: "The blog offers insights into new features, industry trends, psychological concepts, product updates, and expert discussions. It serves as an educational hub for users who want to stay informed about human behavior research, AI innovation, and practical use cases."
    },
    "case-studies": {
      title: "Case Studies",
      content: "Case studies provide detailed examples of how organizations and individuals have successfully applied the platform. They showcase measurable outcomes, real workflows, challenges addressed, and improvements achieved. These stories demonstrate the platform's effectiveness across different industries, including education, mental health, corporate training, and product design."
    }
  };

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "How It Works", id: "how-it-works" },
        { name: "Try Demo", id: "demo" },
        { name: "About", id: "about" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", id: "privacy-policy" },
        { name: "Terms of Service", id: "terms-of-service" },
        { name: "Contact Us", id: "contact-us" },
        { name: "FAQ", id: "faq" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Psychology Research", id: "psychology-research" },
        { name: "API Documentation", id: "api-documentation" },
        { name: "Blog", id: "blog" },
        { name: "Case Studies", id: "case-studies" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const handleLinkClick = (id: string) => {
    // Check if it's a section to scroll to
    if (id === "how-it-works" || id === "demo" || id === "about") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Open modal for other links
      setOpenDialog(id);
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
              <img 
                src="/brain-logo.png" 
                alt="ReLiveAI Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-2xl hero-text">ReLiveAI</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Empowering better decision-making through AI-powered regret analysis 
              and counterfactual thinking. Learn from your past to build a better future.
            </p>
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
                      onClick={() => handleLinkClick(link.id)}
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

        {/* Ornamental Divider */}
        <div className="ornament-divider mx-auto max-w-lg mb-8"></div>
        
        <div className="border-t border-border/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 ReLiveAI. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button onClick={() => setOpenDialog("privacy-policy")} className="hover:text-primary transition-colors">
                  Privacy Policy
                </button>
                <span>|</span>
                <button onClick={() => setOpenDialog("contact-us")} className="hover:text-primary transition-colors">
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

      {/* Dialog for footer links */}
      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {openDialog && dialogContent[openDialog]?.title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base leading-relaxed pt-4">
            {openDialog && dialogContent[openDialog]?.content}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;