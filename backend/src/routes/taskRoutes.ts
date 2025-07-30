// src/routes/taskRoutes.ts
import express from 'express';
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const router = express.Router();

// GET endpoint to show available task endpoints
router.get('/info', (_req, res) => {
  res.json({
    message: 'TaskTidy Tasks API',
    endpoints: {
      'GET /api/tasks': 'Get all tasks',
      'POST /api/tasks': 'Create a new task',
      'PUT /api/tasks/:id': 'Update a task',
      'DELETE /api/tasks/:id': 'Delete a task'
    },
    status: 'Available'
  });
});

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
