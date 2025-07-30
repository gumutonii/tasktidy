import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// GET endpoint to show available auth endpoints
router.get('/', (_req, res) => {
  res.json({
    message: 'TaskTidy Authentication API',
    endpoints: {
      'POST /api/auth/register': 'Register a new user',
      'POST /api/auth/login': 'Login with existing credentials'
    },
    status: 'Available'
  });
});

// GET endpoint for register (shows registration info)
router.get('/register', (_req, res) => {
  res.json({
    message: 'User Registration',
    method: 'POST',
    endpoint: '/api/auth/register',
    requiredFields: {
      username: 'string',
      email: 'string',
      password: 'string'
    },
    example: {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securepassword123'
    }
  });
});

// GET endpoint for login (shows login info)
router.get('/login', (_req, res) => {
  res.json({
    message: 'User Login',
    method: 'POST',
    endpoint: '/api/auth/login',
    requiredFields: {
      email: 'string',
      password: 'string'
    },
    example: {
      email: 'john@example.com',
      password: 'securepassword123'
    }
  });
});

router.post('/register', register);
router.post('/login', login);

export default router;
