# Full-Stack Portfolio

A professional full-stack portfolio application built with React, Node.js, and Express.

## Quick Start

### Installation
```bash
# Backend
cd Backend && npm install

# Frontend
cd client && npm install
```

### Configuration
Before running the application, configure your environment variables:

```bash
# Frontend - Create .env.local in client/ directory
cp client/.env.example client/.env.local
# Edit client/.env.local with your actual information
```

### Development
```bash
# Terminal 1: Start backend
cd Backend && npm start

# Terminal 2: Start frontend
cd client && npm run dev
```

## Features

- Project showcase and portfolio display
- Blog management system
- Admin dashboard
- User authentication
- Responsive and modern UI
- Dark/light theme support

## Tech Stack

- **Frontend:** React, Vite, Context API
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Project Structure

```
├── Backend/          # API server
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       └── middlewares/
└── client/           # React frontend
    └── src/
        ├── components/
        ├── pages/
        └── context/
```
