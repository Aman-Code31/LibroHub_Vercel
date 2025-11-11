# Quick Vercel Deployment Guide

⚠️ **IMPORTANT:** Vercel's serverless environment **doesn't support SQLite** well. 

**Recommended approach:** Use Railway for backend (supports SQLite) + Vercel for frontend.

---

## 🚀 Option 1: Railway (Backend) + Vercel (Frontend) [RECOMMENDED]

This is the **BEST** option because Railway supports SQLite!

### Step 1: Deploy Backend to Railway

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Get your backend URL
railway domain
```

Your backend will be at: `https://your-app.up.railway.app`

### Step 2: Update Frontend Config

Edit `frontend/scripts/config.js`:
```javascript
const API_CONFIG = {
  BASE_URL: 'https://your-app.up.railway.app',  // Your Railway URL
  // ...
};
```

### Step 3: Deploy Frontend to Vercel

```powershell
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy frontend
cd ../frontend
vercel --prod
```

### Step 4: Update Backend CORS

Edit `backend/server.js` to add your Vercel frontend URL:
```javascript
app.use(cors({
  origin: [
    // ... existing origins ...
    "https://your-frontend.vercel.app"  // Add your Vercel URL
  ],
  credentials: true
}));
```

Redeploy backend:
```powershell
cd backend
railway up
```

✅ **Done!** Your app is live!

---

## 🔄 Option 2: Both on Vercel (Requires Database Change)

⚠️ **Note:** You'll need to replace SQLite with a cloud database.

### Quick Steps:

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   vercel login
   ```

2. **Deploy Backend:**
   ```powershell
   cd backend
   vercel --prod
   ```
   Save the URL: `https://library-backend.vercel.app`

3. **Update Frontend Config:**
   ```javascript
   // frontend/scripts/config.js
   const API_CONFIG = {
     BASE_URL: 'https://library-backend.vercel.app',
     // ...
   };
   ```

4. **Deploy Frontend:**
   ```powershell
   cd ../frontend
   vercel --prod
   ```

5. **Update Backend CORS:**
   Add your frontend URL to CORS in `backend/server.js`, then:
   ```powershell
   cd backend
   vercel --prod
   ```

---

## 📝 Configuration Files Already Created

✅ `backend/vercel.json` - Backend config  
✅ `frontend/vercel.json` - Frontend config  
✅ `backend/.vercelignore` - Files to ignore  
✅ `frontend/.vercelignore` - Files to ignore  
✅ `backend/server.js` - Updated to work with Vercel  

---

## 🎯 Recommended Approach Summary

**Best for your app (with SQLite):**

```
Frontend → Vercel (Free, Fast CDN)
    ↓
Backend → Railway (Free, Supports SQLite)
    ↓
Database → SQLite on Railway (Persistent)
```

**Costs:** FREE on both platforms' free tiers!

---

## 📚 Full Details

See [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md) for complete step-by-step instructions with screenshots and troubleshooting!

---

## 💡 Quick Commands

```powershell
# Deploy Backend to Railway
cd backend
railway init
railway up
railway domain  # Get URL

# Deploy Frontend to Vercel  
cd ../frontend
vercel --prod

# That's it! 🎉
```

---

## 🆘 Need Help?

Check these files:
- `DEPLOY_VERCEL.md` - Complete Vercel guide
- `DEPLOYMENT.md` - All deployment options
- `README.md` - General documentation
