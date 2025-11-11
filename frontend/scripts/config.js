// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://library-backend-kyak2kyor-kushagra-bhardwaj-s-projects.vercel.app',
  ENDPOINTS: {
    BOOKS: '/api/books',
    USERS: '/api/users',
    ACTIVITIES: '/api/activities',
    SETTINGS: '/api/settings',
    AUTH: '/api/auth',
    SUBMISSIONS: '/api/submissions'
  }
};

// Helper function to build full API URL
function getApiUrl(endpoint) {
  return API_CONFIG.BASE_URL + endpoint;
}

// Override fetch to automatically prepend BASE_URL to /api requests
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // If URL starts with /api, prepend the BASE_URL
  if (typeof url === 'string' && url.startsWith('/api')) {
    url = API_CONFIG.BASE_URL + url;
  }
  return originalFetch(url, options);
};
