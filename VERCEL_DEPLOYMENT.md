# Vercel Deployment Guide for Relive AI

## ✅ Project Status Check

**Your project is ready for deployment!**

- ✅ No TypeScript errors
- ✅ Production build successful (798KB main bundle)
- ✅ Dev server running without errors on http://localhost:8080/
- ✅ All dependencies installed correctly
- ✅ Gemini API integration configured

## 📋 Prerequisites

1. **GitHub Account** (to push your code)
2. **Vercel Account** (free at https://vercel.com)
3. **Your Gemini API Key**: `AIzaSyCl2EEjEp9ekbG81CRxFdU1F7jvn3ZdEtI`

---

## 🚀 Deployment Steps

### Step 1: Push Your Code to GitHub

```powershell
# Add vercel.json to git
git add vercel.json

# Commit the vercel configuration
git commit -m "chore: add vercel.json for deployment"

# Push to GitHub (if you haven't already)
git push origin main
```

If you haven't connected to GitHub yet:

```powershell
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/kartikeyam28/relived-my-choices.git
git branch -M main
git push -u origin main
```

---

### Step 2: Import Project to Vercel

1. **Go to Vercel**: https://vercel.com/new
2. **Sign in** with your GitHub account
3. **Import your repository**:
   - Search for `relived-my-choices`
   - Click **Import**

---

### Step 3: Configure Build Settings

Vercel should auto-detect these settings (already configured in `vercel.json`):

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

✅ **Leave these as default** - they're already configured!

---

### Step 4: Add Environment Variables (CRITICAL)

⚠️ **This is the most important step!**

In the Vercel project settings:

1. Click **Environment Variables** tab
2. Add the following variable:

| Name | Value |
|------|-------|
| `VITE_GEMINI_API_KEY` | `AIzaSyCl2EEjEp9ekbG81CRxFdU1F7jvn3ZdEtI` |

**Steps:**
1. Type `VITE_GEMINI_API_KEY` in the **Name** field
2. Paste your API key in the **Value** field
3. Select **All Environments** (Production, Preview, Development)
4. Click **Add**

⚠️ **IMPORTANT**: Never commit `.env.local` to Git. The API key should only be in Vercel's environment variables.

---

### Step 5: Deploy

1. Click **Deploy** button
2. Wait 2-3 minutes for the build to complete
3. You'll see: ✅ **"Deployment Ready"**
4. Your app will be live at: `https://relived-my-choices.vercel.app` (or similar)

---

## 🔄 Continuous Deployment

After the initial setup:

- **Every push to `main`** will automatically trigger a new deployment
- **Pull requests** will get preview deployments
- **No manual work needed** - just push your code!

---

## 🎯 Post-Deployment Checklist

After deployment, test these features:

1. ✅ Visit your Vercel URL
2. ✅ Check the hero section loads
3. ✅ Try the analyzer with example text
4. ✅ Verify analysis completes (may take 5-10 seconds)
5. ✅ Check the dashboard shows results
6. ✅ Verify logo appears (after you add `logo.png` to `public/`)

---

## 🐛 Troubleshooting

### Issue: "Analysis Failed" on deployed site

**Solution**: Verify environment variable is set correctly
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Confirm `VITE_GEMINI_API_KEY` exists and has the correct value
- Redeploy: Settings → Deployments → Click "..." → Redeploy

### Issue: 404 on page refresh

**Solution**: Already fixed with `vercel.json` rewrites configuration

### Issue: Blank page

**Solution**: Check browser console for errors
- Most likely cause: Missing environment variable
- Fix: Add the API key as shown in Step 4

---

## 📝 Custom Domain (Optional)

To use your own domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `reliveai.com`)
3. Update your domain's DNS records as instructed by Vercel
4. Wait 10-60 minutes for DNS propagation

---

## 🔐 Security Notes

- ✅ API key is stored securely in Vercel environment variables
- ✅ `.env.local` is in `.gitignore` (never committed)
- ⚠️ API key is exposed to client-side code (normal for this architecture)
- 💡 Consider adding rate limiting or backend proxy for production

---

## 📊 Performance

Your current bundle size:
- Main JS: **798 KB** (229 KB gzipped)
- CSS: **71 KB** (12 KB gzipped)

Consider optimizing:
- Use dynamic imports for Dashboard/Auth pages
- Lazy load UI components that aren't immediately visible
- Code-split the Recharts library

---

## 🎉 Success!

Once deployed, share your app at:
`https://[your-project-name].vercel.app`

Your AI-powered regret analyzer is now live! 🚀

