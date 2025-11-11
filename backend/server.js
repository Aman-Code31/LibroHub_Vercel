const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration to allow frontend access
app.use(cors({
  origin: [
    "http://localhost:8080", 
    "http://127.0.0.1:8080", 
    "http://localhost:8081", 
    "http://127.0.0.1:8081",
    "https://library-frontend-hck9l4z5s-kushagra-bhardwaj-s-projects.vercel.app",
    "https://library-frontend-ha9srzsss-kushagra-bhardwaj-s-projects.vercel.app",
    "https://library-frontend-bavfworq3-kushagra-bhardwaj-s-projects.vercel.app",
    /^https:\/\/library-frontend-.*\.vercel\.app$/  // Allow all preview deployments
  ],
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const db = require("./database/db");
const submissionsDb = require("./database/submissions_db");

app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/settings", require("./routes/settings"));
app.use("/api/auth", require("./routes/auth").router);
app.use("/api/submissions", require("./routes/submissions"));

app.get("/api/welcome", (req, res) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  res.json({ message: "Welcome to the Library Management System!" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Library Management System API is running",
  });
});

// Only start server if not in production (Vercel handles this)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend API server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
  });

  process.on("SIGINT", () => {
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
      process.exit(0);
    });
  });
}

// Export for Vercel and other serverless platforms
module.exports = app;
