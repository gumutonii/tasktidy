import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
