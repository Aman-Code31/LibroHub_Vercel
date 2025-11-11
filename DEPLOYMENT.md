# Deployment Guide

Guide for deploying the Library Management System to production.

## 🌐 Architecture Overview

- **Frontend**: Static HTML/CSS/JS (can be hosted anywhere)
- **Backend**: Node.js Express API (requires Node.js hosting)
- **Database**: SQLite (file-based, included with backend)

---

## 📦 Deployment Options

### Option 1: Same Server Deployment

Deploy both frontend and backend on the same server.

#### Backend Setup

1. **Upload backend files to server**
2. **Install dependencies**:
   ```bash
   cd backend
   npm install --production
   ```
3. **Set environment variables**:
   ```bash
   export PORT=3000
   export SESSION_SECRET=your-secure-secret-here
   export NODE_ENV=production
   ```
4. **Start with PM2** (process manager):
   ```bash
   npm install -g pm2
   pm2 start server.js --name library-backend
   pm2 save
   pm2 startup
   ```

#### Frontend Setup

1. **Update API configuration** in `frontend/scripts/config.js`:
   ```javascript
   const API_CONFIG = {
     BASE_URL: 'https://yourdomain.com',  // Your production URL
     // ...
   };
   ```
2. **Upload frontend files** to web server
3. **Configure web server** (Nginx example):
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     
     root /var/www/library-frontend;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
     
     # Proxy API requests to backend
     location /api {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

---

### Option 2: Separate Hosting

Deploy frontend and backend on different platforms.

#### Backend Deployment (Heroku, Railway, Render, etc.)

**Example: Heroku**

1. **Create `Procfile` in backend directory**:
   ```
   web: node server.js
   ```

2. **Update `backend/server.js` CORS settings**:
   ```javascript
   app.use(cors({
     origin: ["https://your-frontend-domain.com"],
     credentials: true
   }));
   ```

3. **Deploy**:
   ```bash
   cd backend
   heroku create your-app-name
   git init
   git add .
   git commit -m "Deploy backend"
   heroku git:remote -a your-app-name
   git push heroku main
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set SESSION_SECRET=your-secure-secret
   heroku config:set NODE_ENV=production
   ```

#### Frontend Deployment (Netlify, Vercel, GitHub Pages, etc.)

**Example: Netlify**

1. **Update `frontend/scripts/config.js`**:
   ```javascript
   const API_CONFIG = {
     BASE_URL: 'https://your-backend.herokuapp.com',
     // ...
   };
   ```

2. **Create `netlify.toml` in frontend directory**:
   ```toml
   [build]
     publish = "."
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy**:
   - Connect GitHub repository to Netlify
   - Set base directory to `frontend`
   - Deploy!

**Example: Vercel**

1. **Create `vercel.json` in frontend directory**:
   ```json
   {
     "routes": [
       { "handle": "filesystem" },
       { "src": "/(.*)", "dest": "/index.html" }
     ]
   }
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

---

## 🔒 Production Security Checklist

### Backend

- [ ] Set strong `SESSION_SECRET` environment variable
- [ ] Enable HTTPS (set `cookie.secure: true` in session config)
- [ ] Update CORS origins to production domains only
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for sensitive data
- [ ] Implement rate limiting
- [ ] Add API authentication middleware
- [ ] Regular security updates (`npm audit fix`)
- [ ] Database backups (backup SQLite files regularly)
- [ ] Add logging (Winston, Morgan, etc.)
- [ ] Use helmet.js for security headers:
  ```bash
  npm install helmet
  ```
  ```javascript
  const helmet = require('helmet');
  app.use(helmet());
  ```

### Frontend

- [ ] Update API_CONFIG.BASE_URL to production backend
- [ ] Remove console.log statements
- [ ] Minify CSS/JS (optional)
- [ ] Enable HTTPS on hosting platform
- [ ] Configure CSP (Content Security Policy) headers
- [ ] Test on multiple browsers
- [ ] Optimize images and assets
- [ ] Set proper cache headers

---

## 🗄️ Database Management

### Backup

```bash
# Backup database files
cp backend/database/library.db backend/database/library.db.backup
cp backend/database/submissions.db backend/database/submissions.db.backup
```

### Automated Backups (Linux/Mac)

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /path/to/backend/database/library.db /path/to/backups/library_$DATE.db
cp /path/to/backend/database/submissions.db /path/to/backups/submissions_$DATE.db

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /path/to/backup-script.sh
```

### Restore

```bash
# Restore from backup
cp backend/database/library.db.backup backend/database/library.db
cp backend/database/submissions.db.backup backend/database/submissions.db
```

---

## 📊 Monitoring

### PM2 Monitoring (Backend)

```bash
# View logs
pm2 logs library-backend

# Monitor resources
pm2 monit

# Restart on failure (auto-configured)
```

### Application Monitoring

Consider adding:
- **New Relic** - APM and monitoring
- **Sentry** - Error tracking
- **LogRocket** - Frontend monitoring

---

## 🚀 Performance Optimization

### Backend

1. **Enable compression**:
   ```bash
   npm install compression
   ```
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add caching headers**:
   ```javascript
   app.use('/api', (req, res, next) => {
     res.set('Cache-Control', 'no-store');
     next();
   });
   ```

### Frontend

1. **Enable caching** for static assets
2. **Use CDN** for libraries (if any)
3. **Compress images**
4. **Lazy load images**
5. **Minify assets**

---

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-backend-app"
          heroku_email: "your-email@example.com"
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './frontend'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📝 Environment Variables

### Backend (.env file)

```env
PORT=3000
SESSION_SECRET=your-very-secure-secret-key-here
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (config.js)

```javascript
const API_CONFIG = {
  BASE_URL: process.env.API_URL || 'https://your-backend-domain.com',
  // ...
};
```

---

## 🧪 Pre-Deployment Testing

```bash
# Test backend
cd backend
npm test

# Test production build
NODE_ENV=production npm start

# Test with production URL
# Update config.js temporarily to point to production
cd frontend
npm start
```

---

## 📞 Support & Troubleshooting

### Common Issues

1. **CORS Errors**: Update backend CORS settings with frontend domain
2. **Database Lock**: Ensure only one process accesses SQLite
3. **Session Issues**: Check SESSION_SECRET is set and consistent
4. **API Timeout**: Increase timeout limits on hosting platform

### Logs

- Backend: Check PM2 logs or hosting platform logs
- Frontend: Browser console (F12)
- Server: Check web server logs (Nginx/Apache)

---

## ✅ Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify login/logout works
- [ ] Check database operations
- [ ] Test book management (CRUD)
- [ ] Verify user management
- [ ] Test mobile responsiveness
- [ ] Check error handling
- [ ] Verify HTTPS is working
- [ ] Test on multiple devices/browsers
- [ ] Set up monitoring and alerts
- [ ] Document production URLs
- [ ] Create database backup schedule

---

**Ready to deploy? Follow this guide step-by-step and you'll be live in no time! 🚀**
