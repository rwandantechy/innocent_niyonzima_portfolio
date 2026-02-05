const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const { connectToDb } = require('./db/mongoClient');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the client public folder (for certificates, images, etc.)
app.use(express.static(path.join(__dirname, '../../client/public')));

// In production, also serve the built frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

app.use('/api', routes);

// health check
app.get('/api/health', (req, res) => res.json({ ok: true, version: 'backend-scaffold' }));

// SPA fallback - serve index.html for all non-API routes to enable client-side routing
app.get('*', (req, res) => {
  const filePath = process.env.NODE_ENV === 'production' 
    ? path.join(__dirname, '../../client/dist/index.html')
    : path.join(__dirname, '../../client/index.html');
  
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send('Unable to load application');
    }
  });
});

// error handler
app.use(errorHandler);

// start server after DB connection
(async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    // In development allow the server to start even if DB is unreachable so frontend
    // work and non-DB endpoints can be developed. In production we fail fast.
    logger.error('Failed to connect to DB:', err);
    if (process.env.NODE_ENV === 'production') {
      logger.error('Exiting because NODE_ENV=production and DB connection failed.');
      process.exit(1);
    }

    logger.warn('Starting server without DB (development mode). Some endpoints may fail until DB is available.');
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT} (no DB)`);
    });
  }
})();
