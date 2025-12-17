# 🧠 ReLiveAI - Intelligent Regret Analysis Platform

> Transform your past decisions into future wisdom with AI-powered psychological insights.

![ReLiveAI](https://img.shields.io/badge/ReLiveAI-Live-success)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)

## 📖 About

**ReLiveAI** is an innovative web application that uses Google's Gemini AI to provide deep psychological analysis of life decisions and regrets. It helps users gain perspective, understand emotional impacts, and receive actionable insights for personal growth.

### ✨ Key Features

- 🤖 **AI-Powered Analysis** - Advanced Gemini AI integration for comprehensive regret analysis
- 📊 **Visual Dashboard** - Interactive charts and visualizations for threat analysis
- 💭 **Emotional Intelligence** - Deep emotional tone analysis with primary and secondary emotions
- 🎯 **Actionable Insights** - Personalized suggestions and perspectives for moving forward
- 📈 **Regret Metrics** - Quantified intensity, confidence, and impact measurements
- 📄 **PDF Export** - Generate detailed analysis reports for personal records
- 🔒 **Secure & Private** - Client-side processing with secure API integration
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations

## 🚀 Project Info

**Live URL**: https://relive.ai/projects/8511b000-2779-4e2a-8711-f4f4e6eb2c5d

## 🔑 Google Gemini AI Setup

This project uses **Google Gemini AI** for intelligent regret analysis with advanced natural language processing.

### Quick Setup

1. **Get your API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

2. **Create/Edit `.env` file** in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
   ```

3. **Restart the dev server**:
   ```bash
   npm run dev
   ```

### Supported Models

The application automatically uses the best available Gemini model with fallback support:
- `gemini-flash-latest` (Primary - fastest and most reliable)
- `gemini-pro-latest` (Fallback)
- `gemini-2.5-flash-lite` (Fallback)
- `gemini-2.0-flash-001` (Fallback)

### API Features Used
- ✅ JSON mode for structured responses
- ✅ Automatic retry with exponential backoff
- ✅ Multi-model fallback system
- ✅ Temperature-controlled creativity (0.7)
- ✅ Extended context (2048 tokens)

**Note:** The `.env` file is gitignored for security.

## 🛠️ Tech Stack

This project is built with modern, production-ready technologies:

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Framework | 18+ |
| **TypeScript** | Type Safety | 5+ |
| **Vite** | Build Tool | Latest |
| **Tailwind CSS** | Styling | 3+ |
| **shadcn/ui** | UI Components | Latest |
| **Google Gemini AI** | AI Analysis | 0.24+ |
| **Supabase** | Authentication | 2.57+ |
| **Recharts** | Data Visualization | 2+ |
| **React Router** | Navigation | 7+ |
| **jsPDF** | PDF Generation | Latest |

## 📁 Project Structure

```
relived-my-choices/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn UI components
│   │   ├── DemoAnalyzer.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Landing page
│   │   ├── Dashboard.tsx   # Analysis dashboard
│   │   └── Auth.tsx        # Authentication
│   ├── lib/                # Utilities
│   │   ├── gemini.ts       # Gemini AI integration
│   │   └── utils.ts        # Helper functions
│   ├── hooks/              # Custom React hooks
│   └── assets/             # Static assets
├── public/                 # Public files
├── .env                    # Environment variables
└── package.json            # Dependencies
```

## 💻 Development

### Prerequisites

- **Node.js** 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** or **bun** package manager
- **Git** for version control
- **Google Gemini API Key**

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kartikeyam28/relived-my-choices.git
   cd relived-my-choices
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development server**:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open in browser**: http://localhost:5173

### Available Scripts

```bash
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Development Options

### Option 1: Use Relive AI (Recommended)

Simply visit the [Relive AI Project](https://relive.ai/projects/8511b000-2779-4e2a-8711-f4f4e6eb2c5d) and start prompting. Changes made via Relive AI will be committed automatically.

### Option 2: Local IDE

Work locally using your preferred IDE (VS Code, WebStorm, etc.). Push changes to sync with Relive AI.

### Option 3: GitHub Web Editor

- Navigate to files on GitHub
- Click the "Edit" button (pencil icon)
- Make changes and commit directly

### Option 4: GitHub Codespaces

- Click "Code" → "Codespaces" → "New codespace"
- Edit in a full VS Code environment in the browser
- Commit and push when done

## 🎯 Core Features Explained

### 1. AI Analysis Engine
- **Regret Classification**: Categorizes into "Regret by Action", "Regret by Inaction", or "No Regret"
- **Confidence Scoring**: 0-100% confidence in the analysis
- **Intensity Measurement**: 0-10 scale for regret intensity
- **Domain Detection**: Career, Relationships, Health, Education, or Financial

### 2. Emotional Intelligence
- **Primary Emotion**: Main emotional response identification
- **Secondary Emotions**: 2-3 supporting emotional states
- **Emotional Tone Analysis**: Deep understanding of emotional context

### 3. Threat Assessment
Four-dimensional psychological threat analysis:
- **Stress Levels**: Low/Medium/High with 1-5 scoring
- **Anxiety Impact**: Quantified anxiety assessment
- **Motivation Loss**: Impact on future motivation
- **Health Risks**: Potential health implications

### 4. Actionable Insights
- **Reflection**: Personal analysis of the situation
- **Alternative Perspective**: New ways to view the decision
- **3 Key Insights**: Deep psychological observations
- **2 Suggestions**: Concrete steps forward

### 5. Visualization Dashboard
- **Regret Meter**: Visual intensity gauge
- **Threat Charts**: Bar charts for psychological threats
- **Timeline Analysis**: Past, present, and future impacts
- **Emotional Spectrum**: Visual emotional tone display

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Via Relive AI** (Easiest):
   - Open [Relive AI Project](https://relive.ai/projects/8511b000-2779-4e2a-8711-f4f4e6eb2c5d)
   - Click **Share → Publish**
   - Your app is live!

2. **Manual Vercel Deployment**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   
   # Add environment variables in Vercel dashboard
   ```

3. **Environment Variables for Production**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add:
     - `VITE_GEMINI_API_KEY`
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`

### Deploy to Other Platforms

<details>
<summary><b>Netlify</b></summary>

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Build command: npm run build
# Publish directory: dist
```
</details>

<details>
<summary><b>GitHub Pages</b></summary>

```bash
# Build for production
npm run build

# Deploy dist folder to gh-pages branch
```
</details>

## 🌐 Custom Domain

Yes! You can connect a custom domain:

1. Navigate to **Project → Settings → Domains**
2. Click **Connect Domain**
3. Follow DNS configuration steps

📚 Read more: [Setting up a custom domain](https://docs.relive.ai/tips-tricks/custom-domain#step-by-step-guide)

## 🐛 Troubleshooting

### Common Issues

**Issue: "Analysis Failed" Error**
```bash
# Solution 1: Check API key
# Verify .env has correct VITE_GEMINI_API_KEY

# Solution 2: Restart dev server
npm run dev

# Solution 3: Clear cache
rm -rf node_modules/.vite
npm run dev
```

**Issue: "Model Overloaded" Error**
- This is temporary - the Gemini API is experiencing high traffic
- The app automatically retries with fallback models
- Wait a few seconds and try again

**Issue: Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

**Issue: Environment Variables Not Working**
- Ensure variable names start with `VITE_`
- Restart dev server after changing `.env`
- For production, set in Vercel/Netlify dashboard

## 📊 API Usage & Limits

### Gemini API
- **Free Tier**: 60 requests per minute
- **Rate Limiting**: Automatic retry with exponential backoff
- **Fallback System**: Multiple models for reliability

### Supabase
- **Free Tier**: 50,000 monthly active users
- **Database**: 500MB included
- **Authentication**: Unlimited

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ `.env` files gitignored
- ✅ Client-side API key protection
- ✅ Secure authentication with Supabase
- ✅ HTTPS enforced in production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of the Relive AI ecosystem.

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful AI analysis capabilities
- **shadcn/ui** - For beautiful, accessible UI components
- **Relive AI** - For the development platform
- **Supabase** - For authentication and database

## 📧 Support

- **Documentation**: [Relive AI Docs](https://docs.relive.ai)
- **Issues**: [GitHub Issues](https://github.com/kartikeyam28/relived-my-choices/issues)
- **Project**: [Relive AI Dashboard](https://relive.ai/projects/8511b000-2779-4e2a-8711-f4f4e6eb2c5d)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Gemini AI**

[Live Demo](https://relive.ai/projects/8511b000-2779-4e2a-8711-f4f4e6eb2c5d) • [Report Bug](https://github.com/kartikeyam28/relived-my-choices/issues) • [Request Feature](https://github.com/kartikeyam28/relived-my-choices/issues)

</div>
