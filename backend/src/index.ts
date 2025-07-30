import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow frontend requests
const corsOptions = {
  origin: [
    'http://localhost:5713',
    'http://localhost:3000',
    'https://tasktidy-frontend-gumutoni.azurewebsites.net',
    'https://tasktidy-frontend-gumutoni.azurewebsites.net/',
    process.env.FRONTEND_URL
  ].filter((url): url is string => Boolean(url)),
  credentials: true,
  optionsSuccessStatus: 200
};

console.log('🌐 CORS origins:', corsOptions.origin);

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // ✅ this exposes /api/tasks properly

app.get('/', (_req, res) => {
  res.send('TaskTidy API is running...');
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

console.log('🚀 Starting TaskTidy backend server...');
console.log('📊 Environment:', process.env.NODE_ENV || 'development');
console.log('🔗 MongoDB URI:', process.env.MONGO_URI ? 'Configured' : 'Not configured');

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Server URL: http://localhost:${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});
