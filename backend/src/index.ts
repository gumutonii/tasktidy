import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // ✅ this exposes /api/tasks properly

app.get('/', (_req, res) => {
  res.send('TaskTidy API is running...');
});

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
