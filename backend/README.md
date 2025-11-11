# Library Management System - Backend

Backend API server for the Library Management System.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **CORS** - Cross-Origin Resource Sharing

## Installation

```bash
npm install
```

## Running

### Production Mode
```bash
npm start
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Environment Variables

You can create a `.env` file in the backend directory (optional):

```env
PORT=3000
SESSION_SECRET=your-secret-key
```

## Database

The application uses SQLite databases:
- `database/library.db` - Main library data
- `database/submissions.db` - Submissions and notifications

### Database Schema

See:
- `database/schema.sql` - Main database schema
- `database/submissions_schema.sql` - Submissions database schema

## API Endpoints

All endpoints are prefixed with `/api`

### Health Check
- `GET /api/health` - Server health status
- `GET /api/welcome` - Welcome message

### Authentication (`/api/auth`)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Books (`/api/books`)
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book (admin)
- `PUT /api/books/:id` - Update a book (admin)
- `DELETE /api/books/:id` - Delete a book (admin)
- `GET /api/books/borrowed` - Get borrowed books
- `POST /api/books/import` - Import books from JSON

### Users (`/api/users`)
- `GET /api/users` - Get all users (admin)
- `POST /api/users` - Add a new user (admin)
- `PUT /api/users/:id` - Update a user (admin)
- `DELETE /api/users/:id` - Delete a user (admin)

### Activities (`/api/activities`)
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Log a new activity

### Submissions (`/api/submissions`)
- `GET /api/submissions` - Get submissions
- `POST /api/submissions` - Create submission
- `GET /api/submissions/notifications` - Get user notifications
- `GET /api/submissions/rating` - Get submission ratings
- `PUT /api/submissions/:id` - Update submission

### Settings (`/api/settings`)
- `GET /api/settings` - Get system settings
- `PUT /api/settings` - Update system settings

## Testing

```bash
npm test
```

This runs:
- `test_import.js` - Test book import functionality
- `test_validation.js` - Test data validation

## Project Structure

```
backend/
├── routes/              # Route handlers
│   ├── auth.js          # Authentication routes
│   ├── books.js         # Book management routes
│   ├── users.js         # User management routes
│   ├── activities.js    # Activity logging routes
│   ├── submissions.js   # Submission routes
│   └── settings.js      # Settings routes
├── database/            # Database files and schemas
│   ├── db.js            # Database connection
│   ├── submissions_db.js
│   ├── schema.sql
│   ├── submissions_schema.sql
│   ├── library.db
│   └── submissions.db
├── server.js            # Main server file
├── test_import.js       # Import tests
├── test_validation.js   # Validation tests
├── test_books.json      # Test data
├── update_db.js         # Database update script
└── package.json         # Dependencies and scripts
```

## CORS Configuration

The backend allows requests from:
- `http://localhost:8080` (frontend dev server)
- `http://127.0.0.1:8080`

To modify CORS settings, edit `server.js`:

```javascript
app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
  credentials: true
}));
```

## Session Configuration

Sessions are configured with:
- Secret: `your-secret-key` (change in production!)
- Duration: 24 hours
- Secure: false (set to true in production with HTTPS)

## Development Notes

- Use `nodemon` for automatic server restart during development
- Database connections are automatically closed on server shutdown
- All API routes are prefixed with `/api`
- Frontend static files are NOT served by this backend (separate frontend server)
