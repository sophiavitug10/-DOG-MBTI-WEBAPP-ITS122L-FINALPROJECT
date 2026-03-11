# Deploy To Vercel

## 1) Push repository to GitHub
Ensure your latest changes are pushed.

## 2) Import project in Vercel
- Open Vercel Dashboard
- Click Add New... > Project
- Import this repository
- Root Directory: dog-mbti-web-app

## 3) Configure environment variables
Add these in Project Settings > Environment Variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Use the exact values from your Supabase project.

## 4) Build settings
This project already includes vercel.json with:
- buildCommand: npm run build
- outputDirectory: dist
- SPA rewrite to index.html for React Router routes

## 5) Deploy
Click Deploy.

## 6) Supabase auth URL settings
In Supabase Dashboard > Authentication > URL Configuration:
- Site URL: your Vercel production URL (https://your-app.vercel.app)
- Add the same URL (and preview URL pattern if needed) to Redirect URLs

This prevents auth email and session redirect issues in production.

## 7) Verify production
- Login/signup
- Email code verification
- Profile update
- Quiz submit and results
- Admin panel access (admin accounts only)
