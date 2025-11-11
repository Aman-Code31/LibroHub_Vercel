# Vercel Deployment Guide (Without Railway)

## ✅ **All Changes Made - Ready to Deploy!**

I've configured everything to work with Vercel using SQLite. Here's what was updated:

### 🔧 Changes Made

1. ✅ **backend/database/db.js** - Updated to use /tmp on Vercel
2. ✅ **backend/database/submissions_db.js** - Updated to use /tmp on Vercel  
3. ✅ **backend/vercel.json** - Configured for Vercel deployment
4. ✅ **backend/server.js** - Already serverless-compatible
5. ✅ **frontend/vercel.json** - Ready for deployment
6. ✅ **deploy-vercel.ps1** - Automated deployment script created
7. ✅ **No syntax errors** - All files validated

---

## ⚠️ Important Note About Database

**Vercel Limitation:**  
Vercel's serverless functions use `/tmp` storage which is **ephemeral** (temporary). This means:
- ✅ Database works perfectly
- ⚠️ Data is reset when function restarts (every ~15-60 minutes)
- ⚠️ Each deployment starts with a fresh database

**Best for:** Demo/testing purposes  
**For production:** Consider adding a cloud database later

---

## 🚀 Deployment Methods

### **Method 1: Automated Script (Easiest!)**

```powershell
# Run the automated deployment script
.\deploy-vercel.ps1
```

This will:
1. Deploy your backend
2. Update frontend config automatically
3. Deploy your frontend
4. Update CORS settings
5. Redeploy backend

**Just follow the prompts and paste URLs when asked!**

---

### **Method 2: Manual Step-by-Step**

#### **Step 1: Install Vercel CLI**

```powershell
npm install -g vercel
```

#### **Step 2: Login to Vercel**

```powershell
vercel login
```

Your browser will open - sign in with GitHub, GitLab, or email.

#### **Step 3: Deploy Backend**

```powershell
cd backend
vercel --prod
```

**Questions you'll see:**
- Set up and deploy? → **Y**
- Which scope? → Choose your account
- Link to existing project? → **N**
- Project name? → **library-backend** (or any name)
- Directory? → **./** (press Enter)
- Override settings? → **N**

**📝 Save the URL!** Example: `https://library-backend-abc123.vercel.app`

#### **Step 4: Update Frontend Config**

Edit `frontend/scripts/config.js`:

```javascript
const API_CONFIG = {
  BASE_URL: 'https://library-backend-abc123.vercel.app',  // Your backend URL
  // ... rest stays same
};
```

#### **Step 5: Deploy Frontend**

```powershell
cd ../frontend
vercel --prod
```

**Questions you'll see:**
- Set up and deploy? → **Y**
- Which scope? → Choose your account
- Link to existing project? → **N**
- Project name? → **library-frontend** (or any name)
- Directory? → **./** (press Enter)
- Override settings? → **N**

**📝 Save the URL!** Example: `https://library-frontend-xyz789.vercel.app`

#### **Step 6: Update Backend CORS**

Edit `backend/server.js` - find the CORS section and add your frontend URL:

```javascript
app.use(cors({
  origin: [
    "http://localhost:8080", 
    "http://127.0.0.1:8080", 
    "http://localhost:8081", 
    "http://127.0.0.1:8081",
    "https://library-frontend-xyz789.vercel.app"  // Add this line
  ],
  credentials: true
}));
```

#### **Step 7: Redeploy Backend**

```powershell
cd ../backend
vercel --prod
```

---

## 🎉 Done!

Your app is now live at:
- **Frontend:** `https://library-frontend-xyz789.vercel.app`
- **Backend:** `https://library-backend-abc123.vercel.app`

---

## 📋 Quick Commands Reference

```powershell
# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd frontend
vercel --prod

# Check deployment status
vercel list

# View logs
vercel logs <deployment-url>
```

---

## 🔄 Updating Your Deployment

After making changes:

```powershell
# For backend changes
cd backend
vercel --prod

# For frontend changes
cd frontend
vercel --prod
```

Vercel automatically redeploys!

---

## 🐛 Troubleshooting

### "Vercel command not found"
```powershell
npm install -g vercel
```

### CORS Errors
- Make sure you added frontend URL to backend CORS
- Redeploy backend after changing CORS

### Frontend can't reach backend
- Check `frontend/scripts/config.js` has correct backend URL
- Redeploy frontend after changing config

### Database empty after deploy
- This is normal - Vercel's /tmp is ephemeral
- Data resets on each cold start
- For persistent data, you'd need a cloud database

---

## 💡 Testing Before Deploy

Test locally first:

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

Make sure everything works at http://localhost:8081

---

## 📝 Deployment Checklist

- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged into Vercel (`vercel login`)
- [ ] Backend deployed (`cd backend && vercel --prod`)
- [ ] Backend URL saved
- [ ] Frontend config.js updated with backend URL
- [ ] Frontend deployed (`cd frontend && vercel --prod`)
- [ ] Frontend URL saved
- [ ] Backend CORS updated with frontend URL
- [ ] Backend redeployed
- [ ] Tested live site

---

## 🎯 Next Steps After Deployment

1. **Test your live site** - Try logging in, adding books, etc.
2. **Bookmark your URLs** - Save them somewhere safe
3. **Share your app** - It's live on the internet!

---

## ⚡ Pro Tips

- **Free domains:** Both Vercel URLs are free
- **Custom domain:** You can add your own domain in Vercel dashboard
- **Auto-deploy:** Connect GitHub for automatic deployments on push
- **Preview URLs:** Every git push gets a preview URL

---

**Ready to deploy? Use the automated script:**

```powershell
.\deploy-vercel.ps1
```

**Or follow the manual steps above!**

---

📚 **More Info:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Commands](https://vercel.com/docs/cli)
