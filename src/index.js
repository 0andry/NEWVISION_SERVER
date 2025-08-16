require('dotenv').config();
const express = require('express');
const cors = require('cors');
const webhookRoutes = require('./api/webhooks');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: [
    'https://uhmegle.com',
    'http://localhost:3000'  // For local development
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-uhmegle-signature']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/webhooks', webhookRoutes);

// Health check endpoint with more detailed information
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'uhmegle-video-integration',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Aggiungi questa rotta prima di app.listen()
app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Server in Esecuzione</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            margin-top: 50px; 
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .status { 
            color: #4CAF50; 
            font-weight: bold; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Server in Esecuzione</h1>
          <p>Stato: <span class="status">Online</span></p>
          <p>Ambiente: ${process.env.NODE_ENV}</p>
          <p>Porta: ${process.env.PORT}</p>
          <p>Endpoints disponibili:</p>
          <ul style="list-style: none; padding: 0;">
            <li><a href="/health">/health</a> - Verifica lo stato del server</li>
            <li><code>POST /api/webhooks/github</code> - Endpoint per i webhook di GitHub</li>
          </ul>
        </div>
      </body>
      </html>
    `);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Consider whether to exit the process in production
  // process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Consider whether to exit the process in production
  // process.exit(1);
});