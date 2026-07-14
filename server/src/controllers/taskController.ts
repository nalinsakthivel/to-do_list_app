import { Response } from 'express';
import { Task } from '../models/Task';
import { AuthRequest } from '../types';
import { emitToUser } from '../socket/socketHandler';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  const tasks = await Task.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

export const addTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const task = await Task.create({ title, userId: req.user!.userId });
  emitToUser(req.user!.userId, 'task:created', task);
  res.status(201).json(task);
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user!.userId },
    { ...(title !== undefined && { title }), ...(completed !== undefined && { completed }) },
    { new: true }
  );

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  emitToUser(req.user!.userId, 'task:updated', task);
  res.status(200).json(task);
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id, userId: req.user!.userId });

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  emitToUser(req.user!.userId, 'task:deleted', { id });
  res.status(200).json({ success: true });
};
