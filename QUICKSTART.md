# Quick Start Guide

Get the Library Management System up and running in 3 simple steps!

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
npm run install:all
```

This installs all required packages for both frontend and backend.

### Step 2: Start the Servers

```bash
npm start
```

This starts both the backend API server and frontend web server.

### Step 3: Open Your Browser

Navigate to: **http://localhost:8080**

That's it! 🎉

---

## 📍 Server URLs

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

---

## 🛠️ Development Mode

For development with auto-reload:

```bash
npm run dev
```

---

## 🔧 Running Servers Separately

If you prefer to run servers in separate terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm start
```

---

## 📚 Next Steps

- Check out the full [README.md](README.md) for detailed documentation
- See [backend/README.md](backend/README.md) for API documentation
- See [frontend/README.md](frontend/README.md) for frontend details

---

## ❗ Troubleshooting

### "Port already in use" error?

**Kill the process using the port:**

**Windows:**
```bash
# For port 3000 (backend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# For port 8080 (frontend)
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# For port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# For port 8080 (frontend)
lsof -ti:8080 | xargs kill -9
```

### Can't connect to backend?

1. Make sure both servers are running
2. Check that backend shows: "Backend API server is running on http://localhost:3000"
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)

---

## 💡 Tips

- Use **npm run dev** for development (with auto-reload)
- Use **npm start** for production mode
- Both servers must be running for the app to work
- Default admin credentials are typically set in the database

---

**Need help?** Check the main [README.md](README.md) for more details!
