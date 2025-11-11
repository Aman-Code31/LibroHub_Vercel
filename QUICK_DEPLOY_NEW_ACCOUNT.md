# 🚀 Quick Deploy Guide - New Vercel Account

**Ultra-fast deployment guide for experienced users**

---

## ⚡ Quick Steps

```bash
# 1. Login to new Vercel account
vercel logout
vercel login

# 2. Deploy Backend
cd backend
vercel --prod
# 📝 Copy backend URL: https://library-backend-xxxxx.vercel.app

# 3. Update Frontend Config
cd ../frontend
# Edit scripts/config.js → Update BASE_URL with backend URL from step 2

# 4. Deploy Frontend
vercel --prod
# 📝 Copy frontend URL: https://library-frontend-xxxxx.vercel.app

# 5. Update Backend CORS
cd ../backend
# Edit server.js → Add frontend URL to CORS origin array

# 6. Redeploy Backend
vercel --prod
# 📝 Copy NEW backend URL: https://library-backend-yyyyy.vercel.app

# 7. Update Frontend Config Again
cd ../frontend
# Edit scripts/config.js → Update BASE_URL with new backend URL from step 6

# 8. Final Frontend Deploy
vercel --prod

# ✅ Done!
```

---

## 📝 Files to Edit

### 1. `frontend/scripts/config.js`
```javascript
const API_CONFIG = {
  BASE_URL: 'YOUR_BACKEND_URL_HERE',  // ← Update this
  // ...
};
```

### 2. `backend/server.js`
```javascript
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "YOUR_FRONTEND_URL_HERE",  // ← Add this
    /^https:\/\/library-frontend-.*\.vercel\.app$/
  ],
  credentials: true
}));
```

---

## ✅ Verify

```bash
# Check deployments
vercel ls

# Test in browser
# Open frontend URL → F12 → Check for errors
```

---

## ⚠️ Remember

- Update config → Redeploy
- Backend CORS must include frontend URL
- Wildcard pattern catches all deployments
- Database is ephemeral (resets every 15-60 min)

---

**See full guide:** `DEPLOY_TO_NEW_ACCOUNT.md`
