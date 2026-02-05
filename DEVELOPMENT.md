# Development Setup & Running the Portfolio

## Running in Development Mode

To ensure all pages are refreshable and work correctly, you need to run both the backend and frontend servers.

### Step 1: Start the Backend Server

```bash
cd Backend
npm start
# or if npm start is not configured:
# node src/index.js
```

The backend will run on `http://localhost:5000`

### Step 2: Start the Frontend Development Server (in a new terminal)

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 3: Access the Application

Open your browser and navigate to:
- **Development**: `http://localhost:5173`
- **With Backend**: `http://localhost:5000` (after building for production)

## Key Features

### Page Refreshability
- ✅ All pages are now refreshable
- ✅ Home page works in all modes
- ✅ About, Projects, Blogs, Contact pages refresh correctly
- ✅ Admin pages accessible

### Certificate Links
- ✅ All certificate file paths are corrected
- ✅ Certificates served from `/public/certificates/` directory
- ✅ PDF certificates open in new tab
- ✅ Image certificates display in modal viewer

### API Proxy
- The Vite dev server proxies API calls to the backend
- `/api/*` routes are forwarded to `http://localhost:5000/api`
- `/certificates/*` routes are proxied to serve static files from backend

## Production Build

```bash
# Build the frontend
cd client
npm run build

# Set NODE_ENV and run backend
export NODE_ENV=production
cd ../Backend
npm start
```

The application will be available at `http://localhost:5000` with both API and frontend served.

## Troubleshooting

### Pages not refreshing
- Ensure both backend and frontend servers are running
- Check that Vite proxy configuration in `vite.config.js` is correct

### Certificate links broken
- Verify certificate files exist in `client/public/certificates/`
- Check file names match exactly (case-sensitive)
- Browser console will show 404 errors if files are missing

### API calls failing
- Ensure backend is running on port 5000
- Check CORS is enabled (it is by default)
- Verify `.env` files are properly configured in both Backend and client folders
