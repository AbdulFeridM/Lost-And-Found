const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database'); 
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const statsRoutes = require('./routes/stats');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet()); 

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
  credentials: true
}));

// Rate Limiting (e.g. 100 requests per 15 min per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// JSON and URL Encoded Data Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================
// API Routes
// =============================
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/stats',statsRoutes);
app.use('/api/users',userRoutes)

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// =============================
// Error Handling
// =============================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// =============================
// Start Server
// =============================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
});
