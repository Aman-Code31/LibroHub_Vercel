# Library Management System - Frontend

Frontend client application for the Library Management System.

## Tech Stack

- **HTML5** - Markup
- **CSS3** - Styling with custom responsive design
- **Vanilla JavaScript** - Client-side logic (no frameworks)
- **HTTP-server** - Development server

## Installation

```bash
npm install
```

## Running

### Start the development server
```bash
npm start
```

Or to automatically open in browser:
```bash
npm run dev
```

The frontend will be available at `http://localhost:8080`

## Configuration

### API Base URL

The frontend communicates with the backend API. The configuration is in:

```javascript
// scripts/config.js
const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',  // Backend API URL
  // ...
};
```

To change the backend URL (e.g., for production), edit `scripts/config.js`.

### Automatic API URL Resolution

The `config.js` file includes a fetch wrapper that automatically prepends the BASE_URL to all `/api/*` requests:

```javascript
// All these calls automatically use http://localhost:3000
fetch('/api/books')         // → http://localhost:3000/api/books
fetch('/api/auth/login')    // → http://localhost:3000/api/auth/login
```

## Project Structure

```
frontend/
├── scripts/                  # JavaScript files
│   ├── config.js             # API configuration and fetch wrapper
│   ├── app.js                # Main landing page logic
│   ├── dashboard.js          # Admin dashboard logic
│   └── user-dashboard.js     # User dashboard logic
├── styles/                   # CSS stylesheets
│   ├── main.css              # Main styles
│   ├── dashboard.css         # Dashboard-specific styles
│   └── responsive.css        # Responsive/mobile styles
├── index.html                # Landing page
├── dashboard.html            # Admin dashboard page
├── user-dashboard.html       # User dashboard page
└── package.json              # Dependencies and scripts
```

## Pages

### Landing Page (`index.html`)
- Home page with hero section
- Features showcase
- Login/Register modals
- About and Contact sections

### Admin Dashboard (`dashboard.html`)
- Book management (CRUD)
- User management
- Activity logs
- Statistics and reports
- Book import functionality
- Notification system
- Settings management

### User Dashboard (`user-dashboard.html`)
- Browse available books
- View borrowed books
- Search and filter books
- Activity history
- Notifications
- Profile management

## Features

### Authentication
- User login/registration
- Session management
- Role-based access (Admin/User)
- Logout functionality

### Book Management (Admin)
- Add/Edit/Delete books
- Import books from JSON
- View book availability
- Track borrowed books

### User Features
- Browse book catalog
- Filter and search books
- View borrowed books
- See activity history
- Receive notifications

### Responsive Design
- Mobile-friendly layout
- Tablet and desktop optimization
- Touch-friendly controls
- Adaptive navigation

## Development

### Running with Backend

Make sure the backend server is running on `http://localhost:3000` before starting the frontend.

From the project root:
```bash
# Terminal 1 - Backend
npm run start:backend

# Terminal 2 - Frontend
npm run start:frontend
```

Or start both together:
```bash
npm start
```

### Modifying Styles

Edit the CSS files in the `styles/` directory:
- `main.css` - Global styles, landing page
- `dashboard.css` - Dashboard-specific styles
- `responsive.css` - Media queries and responsive adjustments

### Adding New Pages

1. Create HTML file in `frontend/` directory
2. Include required scripts:
   ```html
   <script src="scripts/config.js"></script>
   <script src="scripts/your-script.js"></script>
   ```
3. Link stylesheets as needed

### API Integration

All API calls automatically use the configured BASE_URL. Example:

```javascript
// Login user
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
  .then(response => response.json())
  .then(data => {
    // Handle response
  });
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Can't Connect to Backend

1. Verify backend is running on `http://localhost:3000`
2. Check `scripts/config.js` for correct BASE_URL
3. Check browser console for CORS errors
4. Ensure backend CORS settings allow `http://localhost:8080`

### Changes Not Appearing

1. Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check if http-server is using cache: `npm start` uses `-c-1` flag (no cache)

### Port Already in Use

If port 8080 is busy, stop the process:

**Windows:**
```bash
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:8080 | xargs kill -9
```

Or change the port in `package.json`:
```json
{
  "scripts": {
    "start": "http-server -p 8081 -c-1"
  }
}
```

## Production Build

For production deployment:

1. Update `scripts/config.js` with production API URL
2. Deploy files to a web server (Apache, Nginx, etc.)
3. Ensure backend CORS settings include production domain
4. Consider using a CDN for static assets

### Static File Deployment

The frontend is pure HTML/CSS/JS and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

Just ensure the `BASE_URL` in `config.js` points to your production backend API.

## Contributing

When adding new features:
1. Follow existing code style
2. Test on multiple browsers
3. Ensure responsive design works
4. Update this README if needed
