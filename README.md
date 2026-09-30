# Library Management System

A modern, comprehensive library management system built with Node.js, Express, and SQLite. Features a beautiful web interface for both administrators and users, complete with book cataloging, user management, activity tracking, and real-time notifications.

## 🏗️ Architecture

This project has been restructured with a clear separation of concerns:

```
library-system/
├── frontend/           # Client-side application (HTML, CSS, JavaScript)
│   ├── scripts/        # Frontend JavaScript files
│   │   ├── config.js   # API configuration
│   │   ├── app.js      # Main application logic
│   │   ├── dashboard.js
│   │   └── user-dashboard.js
│   ├── styles/         # CSS stylesheets
│   ├── index.html      # Landing page
│   ├── dashboard.html  # Admin dashboard
│   ├── user-dashboard.html
│   └── package.json    # Frontend dependencies
│
├── backend/            # Server-side application (Node.js/Express)
│   ├── routes/         # API route handlers
│   ├── database/       # Database files and schemas
│   ├── server.js       # Express server
│   ├── test_*.js       # Test files
│   └── package.json    # Backend dependencies
│
├── Mockups/            # UI design mockups
├── package.json        # Root package.json with convenience scripts
└── README.md           # This file
```

### 🏢 Admin Dashboard
- **Book Management**: Add, edit, delete, and search books with advanced filtering
- **User Management**: Manage user accounts, roles, and permissions
- **Activity Monitoring**: Track all system activities with real-time updates
- **Reports & Analytics**: Generate comprehensive reports on library usage
- **Settings Management**: Configure system-wide settings and policies
- **Bulk Operations**: Import/export books in multiple formats (JSON, CSV)
- **Notification System**: Real-time notifications for all activities

### 👤 User Dashboard
- **Book Browsing**: Search and browse the complete library catalog
- **Personal Profile**: Manage account settings and preferences
- **Reading History**: Track borrowed books and reading progress
- **Ratings & Reviews**: Rate and review books in the collection

### 🌐 Public Website (Hero Section)
- **Modern Landing Page**: Attractive homepage with feature highlights
- **Contact & Support**: Integrated contact forms and rating system
- **Authentication**: Secure login/registration with role-based access
- **Responsive Design**: Mobile-friendly interface across all devices

## Website : https://librohub-eta.vercel.app/

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-system
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install:all
   ```

   Or install them separately:
   ```bash
   npm run install:backend
   npm run install:frontend
   ```

### Running the Application

#### Option 1: Run Both Servers Together (Recommended)

Start both frontend and backend servers with a single command:

```bash
npm start
```

Or for development mode with auto-reload:

```bash
npm run dev
```

#### Option 2: Run Servers Separately

**Terminal 1 - Backend Server:**
```bash
npm run start:backend
# Or for development mode:
npm run dev:backend
```

The backend API will run on: `http://localhost:3000`

**Terminal 2 - Frontend Server:**
```bash
npm run start:frontend
# Or for development mode:
npm run dev:frontend
```

The frontend will run on: `http://localhost:8080`

### 🌐 Access the Application

Once both servers are running:

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000/api
- **API Health Check**: http://localhost:3000/api/health

## 📡 API Configuration

The frontend is configured to communicate with the backend API at `http://localhost:3000`. 

If you need to change the backend URL (e.g., for production), edit:
```javascript
// frontend/scripts/config.js
const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',  // Change this as needed
  // ...
};
```

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- HTTP-server for local development
- Responsive design with custom CSS

### Backend
- Node.js
- Express.js
- SQLite3
- bcryptjs for password hashing
- express-session for session management
- CORS enabled for cross-origin requests

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `GET /api/books/borrowed` - Get borrowed books
- `POST /api/books/import` - Import books

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Add a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Add an activity

### Submissions
- `GET /api/submissions` - Get all submissions
- `POST /api/submissions` - Create a submission
- `GET /api/submissions/notifications` - Get notifications
- `GET /api/submissions/rating` - Get submission ratings

### Settings
- `GET /api/settings` - Get system settings
- `PUT /api/settings` - Update system settings

## 🔒 CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:8080`
- `http://127.0.0.1:8080`

To add more origins, edit `backend/server.js`:

```javascript
app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080", "your-new-origin"],
  credentials: true
}));
```

## 📦 Database

The application uses SQLite databases located in `backend/database/`:
- `library.db` - Main library data
- `submissions.db` - Submission and notification data

Database schemas are defined in:
- `backend/database/schema.sql`
- `backend/database/submissions_schema.sql`

## 🧪 Testing

Run backend tests:
```bash
cd backend
npm test
```

## 📚 Features

- User authentication and authorization
- Book management (CRUD operations)
- User management
- Book borrowing system
- Activity tracking
- Submission system with notifications
- Admin and User dashboards
- Responsive design for mobile and desktop

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

**For backend (port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**For frontend (port 8080):**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

### Frontend Can't Connect to Backend

1. Make sure both servers are running
2. Check that the backend is running on `http://localhost:3000`
3. Verify CORS settings in `backend/server.js`
4. Check the browser console for detailed error messages

### Database Issues

If you encounter database errors, ensure:
1. The database files exist in `backend/database/`
2. You have read/write permissions to the database files
3. SQLite3 is properly installed (`npm install` in backend folder)

## 📧 Support

For issues, questions, or contributions, please open an issue in the repository.

---

