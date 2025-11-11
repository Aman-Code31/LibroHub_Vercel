# 🚀 Deploy to a New Vercel Account

This guide will help you deploy the Library Management System to a different Vercel account or help someone else deploy it to their account.

---

## 📋 Prerequisites

1. ✅ Git installed on your system
2. ✅ Node.js installed (v14 or higher)
3. ✅ A Vercel account (free tier is fine)
4. ✅ Vercel CLI installed globally

---

## 🛠️ Step 1: Install Vercel CLI

If the new account user doesn't have Vercel CLI:

```bash
npm install -g vercel
```

---

## 🔐 Step 2: Login to Vercel Account

```bash
# Logout from current account (if needed)
vercel logout

# Login to the new account
vercel login
```

Choose your preferred login method:
- Email
- GitHub
- GitLab
- Bitbucket

---

## 📦 Step 3: Get the Project Files

### Option A: Clone from GitHub

If you've pushed this project to GitHub:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Option B: Download/Copy Files

If sharing via ZIP or manual copy:

1. Copy the entire project folder
2. Make sure these folders/files are included:
   ```
   library-system/
   ├── backend/
   │   ├── api/
   │   │   └── index.js
   │   ├── database/
   │   ├── routes/
   │   ├── server.js
   │   ├── package.json
   │   └── vercel.json
   ├── frontend/
   │   ├── scripts/
   │   │   ├── config.js
   │   │   ├── app.js
   │   │   ├── dashboard.js
   │   │   └── user-dashboard.js
   │   ├── styles/
   │   ├── *.html files
   │   ├── package.json
   │   └── vercel.json
   └── package.json (root)
   ```

---

## 🔧 Step 4: Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install:all

# Or install separately:
cd backend
npm install

cd ../frontend
npm install
```

---

## ⚙️ Step 5: Deploy Backend First

### 5.1: Navigate to Backend Folder

```bash
cd backend
```

### 5.2: Deploy to Vercel

```bash
vercel --prod
```

### 5.3: Follow the Prompts

```
? Set up and deploy "~/library-system/backend"? [Y/n] Y
? Which scope do you want to deploy to? [Your Account Name]
? Link to existing project? [Y/n] N
? What's your project's name? library-backend
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

### 5.4: Copy the Backend URL

After deployment completes, you'll see:

```
✅ Production: https://library-backend-xxxxx-your-account.vercel.app
```

**📝 IMPORTANT: Copy this URL! You'll need it in the next step.**

---

## 📝 Step 6: Update Frontend Configuration

### 6.1: Open `frontend/scripts/config.js`

```bash
cd ../frontend
code scripts/config.js  # Or use any text editor
```

### 6.2: Update the BASE_URL

Replace the existing BASE_URL with your new backend URL:

```javascript
// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://library-backend-xxxxx-your-account.vercel.app',  // ← PASTE YOUR BACKEND URL HERE
  ENDPOINTS: {
    BOOKS: '/api/books',
    USERS: '/api/users',
    ACTIVITIES: '/api/activities',
    SETTINGS: '/api/settings',
    AUTH: '/api/auth',
    SUBMISSIONS: '/api/submissions'
  }
};
```

**Save the file!**

---

## 🚀 Step 7: Deploy Frontend

### 7.1: Make Sure You're in Frontend Folder

```bash
cd frontend  # If not already there
```

### 7.2: Deploy to Vercel

```bash
vercel --prod
```

### 7.3: Follow the Prompts

```
? Set up and deploy "~/library-system/frontend"? [Y/n] Y
? Which scope do you want to deploy to? [Your Account Name]
? Link to existing project? [Y/n] N
? What's your project's name? library-frontend
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

### 7.4: Copy the Frontend URL

After deployment completes:

```
✅ Production: https://library-frontend-xxxxx-your-account.vercel.app
```

**📝 Copy this URL!**

---

## 🔄 Step 8: Update Backend CORS (Important!)

### 8.1: Navigate to Backend Folder

```bash
cd ../backend
```

### 8.2: Open `server.js`

```bash
code server.js  # Or use any text editor
```

### 8.3: Update CORS Configuration

Find the CORS configuration (around line 11-23) and update it:

```javascript
// CORS configuration to allow frontend access
app.use(cors({
  origin: [
    "http://localhost:8080", 
    "http://127.0.0.1:8080", 
    "http://localhost:8081", 
    "http://127.0.0.1:8081",
    "https://library-frontend-xxxxx-your-account.vercel.app",  // ← ADD YOUR FRONTEND URL HERE
    /^https:\/\/library-frontend-.*\.vercel\.app$/  // Wildcard for all deployments
  ],
  credentials: true
}));
```

**Note:** The wildcard pattern (`/^https:\/\/library-frontend-.*\.vercel\.app$/`) should work for most cases, but it's good practice to explicitly add your frontend URL too.

**Save the file!**

### 8.4: Redeploy Backend

```bash
vercel --prod
```

### 8.5: Get New Backend URL

```
✅ Production: https://library-backend-yyyyy-your-account.vercel.app
```

**📝 Copy this NEW backend URL!**

---

## 🔄 Step 9: Update Frontend Again (Final Step)

### 9.1: Update `config.js` with New Backend URL

```bash
cd ../frontend
code scripts/config.js
```

Update to the NEW backend URL from Step 8.5:

```javascript
const API_CONFIG = {
  BASE_URL: 'https://library-backend-yyyyy-your-account.vercel.app',  // ← NEW URL from redeployment
  // ... rest of the config
};
```

**Save the file!**

### 9.2: Final Frontend Deployment

```bash
vercel --prod
```

---

## ✅ Step 10: Verify Deployment

### 10.1: Get Final URLs

```bash
# Check backend deployments
cd ../backend
vercel ls

# Check frontend deployments
cd ../frontend
vercel ls
```

### 10.2: Test the Application

1. Open your final frontend URL in a browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Check for errors (should be none)
5. Try registering/logging in
6. Check **Network** tab to see API calls going to your backend

### 10.3: Verify Configuration

```bash
# Frontend should point to latest backend
cat frontend/scripts/config.js | grep BASE_URL

# Backend CORS should include frontend URL
cat backend/server.js | grep -A 10 "CORS configuration"
```

---

## 📊 Quick Deployment Summary

```
┌─────────────────────────────────────────────────────┐
│ 1. Install Vercel CLI & Login                       │
│    $ vercel login                                    │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ 2. Deploy Backend                                    │
│    $ cd backend                                      │
│    $ vercel --prod                                   │
│    📝 Copy backend URL                               │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ 3. Update Frontend Config                           │
│    Edit: frontend/scripts/config.js                 │
│    Update: BASE_URL with backend URL                │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ 4. Deploy Frontend                                   │
│    $ cd frontend                                     │
│    $ vercel --prod                                   │
│    📝 Copy frontend URL                              │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ 5. Update Backend CORS                              │
│    Edit: backend/server.js                          │
│    Add frontend URL to CORS origin array            │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ 6. Redeploy Backend                                  │
│    $ cd backend                                      │
│    $ vercel --prod                                   │
│    📝 Copy NEW backend URL                           │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ 7. Update Frontend Config Again                     │
│    Edit: frontend/scripts/config.js                 │
│    Update: BASE_URL with NEW backend URL            │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ 8. Final Frontend Deployment                        │
│    $ cd frontend                                     │
│    $ vercel --prod                                   │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│ ✅ DONE! Test your application                      │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 One-Command Script (Advanced)

Create a deployment script `deploy-new-account.sh`:

```bash
#!/bin/bash

echo "🚀 Deploying Library System to Vercel"
echo "======================================"

# Deploy Backend
echo ""
echo "📦 Step 1: Deploying Backend..."
cd backend
BACKEND_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*' | head -1)
echo "✅ Backend deployed: $BACKEND_URL"

# Update Frontend Config
echo ""
echo "📝 Step 2: Updating Frontend Config..."
cd ../frontend
sed -i "s|BASE_URL: '.*'|BASE_URL: '$BACKEND_URL'|g" scripts/config.js
echo "✅ Config updated"

# Deploy Frontend
echo ""
echo "📦 Step 3: Deploying Frontend..."
FRONTEND_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*' | head -1)
echo "✅ Frontend deployed: $FRONTEND_URL"

# Update Backend CORS
echo ""
echo "📝 Step 4: Updating Backend CORS..."
cd ../backend
# Add frontend URL to CORS (manual step required)
echo "⚠️  Please manually add this URL to backend CORS:"
echo "    $FRONTEND_URL"

echo ""
echo "✅ Deployment Complete!"
echo "======================================"
echo "Backend:  $BACKEND_URL"
echo "Frontend: $FRONTEND_URL"
echo ""
echo "⚠️  Don't forget to:"
echo "1. Add frontend URL to backend/server.js CORS"
echo "2. Redeploy backend after CORS update"
echo "3. Update frontend config with new backend URL"
echo "4. Redeploy frontend one final time"
```

---

## ⚠️ Important Notes

### 1. Database Limitation
- SQLite database is **ephemeral** on Vercel
- Data resets every 15-60 minutes
- For persistent data, consider:
  - Vercel Postgres
  - PlanetScale
  - Railway
  - Supabase

### 2. Environment Variables
If you want to use environment variables instead of hardcoding URLs:

**Backend (.env.local):**
```env
FRONTEND_URL=https://library-frontend-xxxxx.vercel.app
```

**Frontend (.env.local):**
```env
VITE_API_URL=https://library-backend-xxxxx.vercel.app
```

Then update Vercel project settings to add these environment variables.

### 3. Custom Domains
After deployment, you can add custom domains in Vercel Dashboard:
- Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

## 🆘 Troubleshooting

### Error: "Cannot find module 'xyz'"
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Error: "CORS blocked"
- Check frontend URL is in backend CORS array
- Verify wildcard pattern is correct
- Redeploy backend after CORS changes

### Error: "Failed to fetch"
- Check frontend config.js has correct backend URL
- Verify backend is deployed and running
- Check Network tab in browser DevTools

### Error: "Vercel CLI not found"
```bash
npm install -g vercel
```

### Need to Switch Vercel Accounts?
```bash
vercel logout
vercel login
```

---

## 📞 Support

If you encounter issues:

1. Check browser console (F12) for errors
2. Check Vercel deployment logs
3. Verify all URLs match between frontend/backend
4. Ensure CORS is properly configured
5. Test API endpoints directly with curl/Postman

---

## ✅ Checklist

Use this checklist when deploying to a new account:

- [ ] Vercel CLI installed
- [ ] Logged into correct Vercel account
- [ ] Project files copied/cloned
- [ ] Dependencies installed (`npm run install:all`)
- [ ] Backend deployed (`cd backend && vercel --prod`)
- [ ] Backend URL copied
- [ ] Frontend config.js updated with backend URL
- [ ] Frontend deployed (`cd frontend && vercel --prod`)
- [ ] Frontend URL copied
- [ ] Backend CORS updated with frontend URL
- [ ] Backend redeployed with CORS changes
- [ ] New backend URL copied
- [ ] Frontend config.js updated with new backend URL
- [ ] Frontend redeployed (final)
- [ ] Application tested in browser
- [ ] No console errors
- [ ] API calls working (Network tab check)

---

## 🎉 Success!

Your Library Management System should now be deployed to the new Vercel account!

**Final URLs:**
- Frontend: `https://library-frontend-xxxxx-new-account.vercel.app`
- Backend: `https://library-backend-xxxxx-new-account.vercel.app`

**Test it:** Open the frontend URL and try registering/logging in!

---

**Created:** November 11, 2025  
**Last Updated:** November 11, 2025
