# 🚀 Deployment Guide - Whispers from the Void

## Deploy to Render (Free & Easy)

### Step 1: Prepare Repository
Your code is already on GitHub: https://github.com/sbsmita/Whispers-from-the-Void

### Step 2: Sign Up for Render
1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Search for: `Whispers-from-the-Void`
   - Click **"Connect"**

### Step 4: Configure Service
Fill in these settings:

- **Name**: `whispers-from-the-void` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free**

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. Your app will be live at: `https://whispers-from-the-void.onrender.com`

---

## 🌐 Alternative: Railway

### Quick Deploy
1. Go to https://railway.app
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose `Whispers-from-the-Void`
6. Railway auto-deploys!

**Live at**: `https://whispers-from-the-void.up.railway.app`

---

## ⚙️ Environment Variables (Optional)

If you need to set environment variables:

**On Render:**
1. Go to your service dashboard
2. Click **"Environment"** tab
3. Add variables:
   - `PORT` = `3000` (usually auto-set)
   - `NODE_ENV` = `production`

**On Railway:**
1. Go to your project
2. Click **"Variables"** tab
3. Add same variables

---

## 🔧 Troubleshooting

### Port Issues
Make sure `server/server.js` uses:
```javascript
const PORT = process.env.PORT || 3000;
```
✅ Already configured correctly!

### Build Fails
- Check that `package.json` has correct start script
- Verify all dependencies are in `package.json`
- Check build logs for errors

### App Not Loading
- Wait 2-3 minutes after deployment
- Check if service is "Live" (green status)
- View logs for errors

---

## 📊 Free Tier Limits

### Render Free Tier:
- ✅ 750 hours/month
- ✅ Auto-sleep after 15 min inactivity
- ✅ Wakes up on request (takes ~30 seconds)
- ✅ Perfect for hackathon demos!

### Railway Free Tier:
- ✅ $5 credit/month
- ✅ No auto-sleep
- ✅ Faster cold starts

---

## 🎯 After Deployment

### Test Your Live App:
1. Visit your deployment URL
2. Test Ouija board interaction
3. Submit a confession
4. Verify real-time updates work
5. Test on mobile device

### Share Your Link:
- Add to GitHub README
- Include in hackathon submission
- Share on social media

---

## 🎃 Production Checklist

- [x] Code pushed to GitHub
- [x] Repository is public
- [x] .kiro directory included
- [x] LICENSE file present
- [ ] Deployed to Render/Railway
- [ ] Live URL tested
- [ ] Mobile responsive verified
- [ ] All features working

---

## 👻 Your Live URLs

After deployment, update these:

- **GitHub**: https://github.com/sbsmita/Whispers-from-the-Void
- **Live Demo**: `https://whispers-from-the-void.onrender.com` (or your URL)
- **Hackathon Submission**: Include both URLs

---

**🎃 The void is now accessible to all! 👻**
