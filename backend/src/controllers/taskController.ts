import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    console.log('🔍 Fetching tasks...');
    const tasks = await Task.find();
    console.log(`✅ Found ${tasks.length} tasks`);
    res.json(tasks);
  } catch (error: any) {
    console.error('❌ Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to get tasks', error: error.message });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    console.log('📝 Creating task:', { title, description, dueDate });

    const task = await Task.create({
      title,
      description,
      dueDate
    });

    console.log('✅ Task created:', task._id);
    res.status(201).json(task);
  } catch (error: any) {
    console.error('❌ Error creating task:', error);
    res.status(400).json({ message: "Failed to create task", error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('🔄 Updating task:', id);
    
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!task) {
      console.log('❌ Task not found:', id);
      return res.status(404).json({ message: 'Task not found' });
    }
    
    console.log('✅ Task updated:', id);
    res.json(task);
  } catch (error: any) {
    console.error('❌ Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Deleting task:', id);
    
    const task = await Task.findByIdAndDelete(id);
    
    if (!task) {
      console.log('❌ Task not found for deletion:', id);
      return res.status(404).json({ message: 'Task not found' });
    }
    
    console.log('✅ Task deleted:', id);
    res.json({ message: 'Task deleted' });
  } catch (error: any) {
    console.error('❌ Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};
