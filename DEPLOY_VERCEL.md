# Deploying to Vercel - Complete Guide

This guide will help you deploy your Library Management System to Vercel with both frontend and backend.

---

## 🚀 Overview

**Strategy:** Deploy both frontend and backend to Vercel as separate projects

- **Frontend:** Static site on Vercel
- **Backend:** Serverless API on Vercel

---

## 📋 Prerequisites

1. ✅ [Vercel Account](https://vercel.com/signup) (free tier works!)
2. ✅ [Vercel CLI](https://vercel.com/download) installed
3. ✅ Git repository (GitHub, GitLab, or Bitbucket)
4. ✅ Your project code ready

---

## 🎯 Deployment Steps

### **Part 1: Prepare Your Project**

#### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

#### Step 2: Login to Vercel

```powershell
vercel login
```

This will open your browser to authenticate.

---

### **Part 2: Deploy Backend**

#### Step 1: Create Backend Configuration

Create `backend/vercel.json`:

```json
{
  "version": 2,
  "name": "library-backend",
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### Step 2: Update Backend for Vercel

Vercel uses serverless functions, so we need to slightly modify the backend. Create `backend/api/index.js`:

```javascript
// This file makes the backend work with Vercel serverless
const app = require('../server');

module.exports = app;
```

#### Step 3: Modify server.js for Vercel

Update `backend/server.js` - change the last lines:

```javascript
// Comment out or wrap the listen in a check
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Backend API server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
  });
}

// Export for Vercel
module.exports = app;
```

#### Step 4: Add .vercelignore to Backend

Create `backend/.vercelignore`:

```
node_modules
.env.local
.env
*.log
.DS_Store
database/*.db
test_*.js
Mockups
```

#### Step 5: Deploy Backend to Vercel

```powershell
cd backend
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **library-backend** (or your choice)
- Directory? **./** (current directory)
- Override settings? **N**

**Save the deployment URL!** You'll need it for the frontend.
Example: `https://library-backend.vercel.app`

---

### **Part 3: Deploy Frontend**

#### Step 1: Update Frontend API Configuration

Edit `frontend/scripts/config.js`:

```javascript
// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://library-backend.vercel.app',  // Your backend URL from Step 5
  ENDPOINTS: {
    BOOKS: '/api/books',
    USERS: '/api/users',
    ACTIVITIES: '/api/activities',
    SETTINGS: '/api/settings',
    AUTH: '/api/auth',
    SUBMISSIONS: '/api/submissions'
  }
};

// Helper function to build full API URL
function getApiUrl(endpoint) {
  return API_CONFIG.BASE_URL + endpoint;
}

// Override fetch to automatically prepend BASE_URL to /api requests
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // If URL starts with /api, prepend the BASE_URL
  if (typeof url === 'string' && url.startsWith('/api')) {
    url = API_CONFIG.BASE_URL + url;
  }
  return originalFetch(url, options);
};
```

#### Step 2: Create Frontend Configuration

Create `frontend/vercel.json`:

```json
{
  "version": 2,
  "name": "library-frontend",
  "builds": [
    {
      "src": "**/*.html",
      "use": "@vercel/static"
    },
    {
      "src": "scripts/**/*.js",
      "use": "@vercel/static"
    },
    {
      "src": "styles/**/*.css",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "cleanUrls": true
}
```

#### Step 3: Add .vercelignore to Frontend

Create `frontend/.vercelignore`:

```
node_modules
.env.local
.env
*.log
.DS_Store
```

#### Step 4: Deploy Frontend to Vercel

```powershell
cd ../frontend
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **library-frontend** (or your choice)
- Directory? **./** (current directory)
- Override settings? **N**

**Save the deployment URL!**
Example: `https://library-frontend.vercel.app`

---

### **Part 4: Update CORS Settings**

#### Step 1: Update Backend CORS

Go back to `backend/server.js` and update CORS to allow your frontend domain:

```javascript
// CORS configuration to allow frontend access
app.use(cors({
  origin: [
    "http://localhost:8080", 
    "http://127.0.0.1:8080", 
    "http://localhost:8081", 
    "http://127.0.0.1:8081",
    "https://library-frontend.vercel.app",  // Add your Vercel frontend URL
    "https://*.vercel.app"  // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

#### Step 2: Redeploy Backend

```powershell
cd backend
vercel --prod
```

---

## 🎉 Your App is Live!

**Frontend:** https://library-frontend.vercel.app  
**Backend:** https://library-backend.vercel.app

---

## 🔄 Alternative: Deploy Using Vercel Dashboard

### Option A: Deploy via GitHub (Recommended)

#### 1. Push to GitHub

```powershell
# From project root
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### 2. Import on Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository

#### 3. Deploy Backend First

- **Project Name:** library-backend
- **Root Directory:** `backend`
- **Framework Preset:** Other
- Click **Deploy**

#### 4. Deploy Frontend Second

- **Project Name:** library-frontend  
- **Root Directory:** `frontend`
- **Framework Preset:** Other
- **Environment Variables:** None needed
- Click **Deploy**

#### 5. Update Frontend Config

After backend deploys, copy its URL and update `frontend/scripts/config.js` with the backend URL, then commit and push again. Vercel will auto-deploy the update.

---

## ⚙️ Environment Variables (Optional)

### For Backend on Vercel

Go to your backend project settings on Vercel Dashboard:

1. Navigate to **Settings** → **Environment Variables**
2. Add these variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Production |
| `SESSION_SECRET` | `your-secure-random-string` | Production |

---

## 🗄️ Database Considerations

**Important:** SQLite doesn't work well on Vercel's serverless environment because the filesystem is read-only and ephemeral.

### Solution Options:

#### Option 1: Use Vercel Postgres (Recommended)

```powershell
# Install Vercel Postgres
npm install @vercel/postgres
```

Update your database to use Vercel Postgres instead of SQLite.

#### Option 2: Use External Database

- **Supabase** (PostgreSQL) - Free tier available
- **PlanetScale** (MySQL) - Free tier available
- **MongoDB Atlas** - Free tier available
- **Railway** - PostgreSQL/MySQL hosting

#### Option 3: Deploy Backend Elsewhere

Deploy backend to a platform that supports SQLite:
- **Railway** (recommended for SQLite)
- **Render**
- **Fly.io**

Keep frontend on Vercel, backend on Railway.

---

## 🚂 Alternative: Backend on Railway, Frontend on Vercel

This is actually the **BEST option** for your SQLite database!

### Deploy Backend to Railway

#### 1. Install Railway CLI

```powershell
npm install -g @railway/cli
```

#### 2. Login to Railway

```powershell
railway login
```

#### 3. Deploy Backend

```powershell
cd backend
railway init
railway up
```

#### 4. Get Backend URL

```powershell
railway domain
```

Save this URL: `https://your-app.up.railway.app`

### Deploy Frontend to Vercel

Follow the frontend deployment steps above, but use your Railway backend URL in `config.js`:

```javascript
const API_CONFIG = {
  BASE_URL: 'https://your-app.up.railway.app',  // Railway backend URL
  // ...
};
```

---

## 📝 Complete Deployment Checklist

### Before Deploying

- [ ] Update `frontend/scripts/config.js` with production backend URL
- [ ] Update `backend/server.js` CORS with production frontend URL
- [ ] Change SESSION_SECRET to a secure random string
- [ ] Test locally one more time
- [ ] Commit all changes to Git

### Backend Deployment

- [ ] Create `backend/vercel.json` OR deploy to Railway
- [ ] Deploy backend
- [ ] Test backend API endpoints
- [ ] Save backend URL

### Frontend Deployment

- [ ] Update `config.js` with backend URL
- [ ] Create `frontend/vercel.json`
- [ ] Deploy frontend
- [ ] Test frontend site
- [ ] Save frontend URL

### Final Steps

- [ ] Update backend CORS with frontend URL
- [ ] Redeploy backend
- [ ] Test full application
- [ ] Check login/logout works
- [ ] Verify all features work

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend

**Check:**
1. Backend URL in `config.js` is correct
2. CORS is configured in backend
3. Backend is actually deployed and running
4. Check browser console for errors

### Backend Not Working on Vercel

**Solution:** Use Railway instead for SQLite support

### CORS Errors

**Fix:** Update backend CORS to include your frontend domain:
```javascript
origin: ["https://your-frontend.vercel.app"]
```

### Database Errors

**Solution:** SQLite doesn't work on Vercel serverless. Use Railway or switch to Vercel Postgres.

---

## 💡 Recommended Setup

**Best Practice for Your App:**

```
Frontend (Vercel)
    ↓ API calls
Backend (Railway)
    ↓ SQLite queries
Database (Railway persistent storage)
```

**Why?**
- ✅ Frontend on Vercel: Fast CDN, automatic HTTPS
- ✅ Backend on Railway: Supports SQLite, persistent storage
- ✅ Free tiers for both services
- ✅ Easy continuous deployment

---

## 🚀 Quick Deploy Script

Save this as `deploy.ps1` in your project root:

```powershell
# Deploy script for Vercel

Write-Host "🚀 Deploying Library Management System to Vercel..." -ForegroundColor Green

# Deploy Backend
Write-Host "`n📦 Deploying Backend..." -ForegroundColor Cyan
cd backend
vercel --prod
$backendUrl = Read-Host "Enter your backend URL (e.g., https://library-backend.vercel.app)"

# Update Frontend Config
Write-Host "`n⚙️  Updating Frontend Configuration..." -ForegroundColor Cyan
cd ../frontend
$configContent = Get-Content scripts/config.js -Raw
$configContent = $configContent -replace "BASE_URL: '.*'", "BASE_URL: '$backendUrl'"
Set-Content scripts/config.js $configContent

# Deploy Frontend
Write-Host "`n🌐 Deploying Frontend..." -ForegroundColor Cyan
vercel --prod

Write-Host "`n✅ Deployment Complete!" -ForegroundColor Green
Write-Host "Remember to update CORS in backend/server.js and redeploy!" -ForegroundColor Yellow
```

Run with:
```powershell
.\deploy.ps1
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

## 🎯 Summary

**Easiest Path:**
1. Deploy backend to **Railway** (supports SQLite)
2. Deploy frontend to **Vercel** (fast and free)
3. Update config.js with Railway backend URL
4. Update CORS in backend with Vercel frontend URL
5. Done! 🎉

**Your app will be live at:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.up.railway.app`

---

**Need help?** Check the main [DEPLOYMENT.md](DEPLOYMENT.md) for more options!
