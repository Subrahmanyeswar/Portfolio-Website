# Deployment Guide — Portfolio Website

This portfolio is built with Next.js 14+ (App Router), Framer Motion, and Mistral AI. Follow these steps to deploy it to Vercel.

## 1. Local Verification
Before pushing, ensure the build passes locally.
```bash
npm run build
```

## 2. GitHub Push
Push your code to a new GitHub repository.
```bash
git init
git add .
git commit -m "feat: initial portfolio release"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

## 3. Vercel Deployment
1. Go to [Vercel](https://vercel.com) and click **"Add New"** > **"Project"**.
2. Import your GitHub repository.
3. **Crucial**: Configure the following **Environment Variables** in the Vercel project settings:

| Variable | Description |
| :--- | :--- |
| `MISTRAL_API_KEY` | Your Mistral API key (from [Mistral Console](https://console.mistral.ai/)) |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID (from [Formspree Dashboard](https://formspree.io/)) |

4. Click **Deploy**.

## 4. Post-Deployment Checks
- Verify the **"Ask Subbu"** chatbot (Mistral AI) responds.
- Test the **Contact Form** submission.
- Ensure the **Terminal** works and responds to `aeternum`, `help`, etc.
- Check mobile responsiveness.

---
**Build Statistics (Expected):**
- Performance: Optimized with Next.js App Router
- SEO: Metadata and OpenGraph pre-configured
- Visuals: Animated Neural Network & Typewriter effects included
