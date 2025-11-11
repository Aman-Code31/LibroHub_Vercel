const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// For Vercel: Check if we're in production and use /tmp
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
let dbPath;

if (isProduction) {
  // Use /tmp for Vercel (ephemeral but works)
  const tmpDir = '/tmp';
  dbPath = path.join(tmpDir, 'library.db');
  
  // Copy database from source if it doesn't exist
  const sourcePath = path.join(__dirname, "library.db");
  if (fs.existsSync(sourcePath) && !fs.existsSync(dbPath)) {
    try {
      fs.copyFileSync(sourcePath, dbPath);
      console.log("Database copied to /tmp for Vercel");
    } catch (err) {
      console.log("Could not copy database, will initialize new one");
    }
  }
} else {
  // Local development - use local path
  dbPath = path.join(__dirname, "library.db");
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    initializeDatabase();
  }
});

function initializeDatabase() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='books'",
    (err, row) => {
      if (err) {
        console.error("Error checking database:", err.message);
        return;
      }

      if (row) {
        console.log("Database already initialized.");
      } else {
        db.exec(schema, (err) => {
          if (err) {
            console.error("Error initializing database:", err.message);
          } else {
            console.log("Database initialized successfully.");
          }
        });
      }
    }
  );
}

module.exports = db;
