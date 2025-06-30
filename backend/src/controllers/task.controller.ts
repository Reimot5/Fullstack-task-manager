import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

const taskRepo = AppDataSource.getRepository(Task);
const userRepo = AppDataSource.getRepository(User);

export const getTasks = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: user not found" });
  }
  const userId = req.user.id;
  const tasks = await taskRepo.find({ where: { user: { id: userId } } });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: user not found" });
  }
  const userId = req.user.id;
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) return res.status(401).json({ error: "User not found" });
  if (req.body.dueDate == "") req.body.dueDate = null; // Handle empty dueDate

  const task = taskRepo.create({ ...req.body, user });
  await taskRepo.save(task);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: user not found" });
  }
  const userId = req.user.id;
  const taskId = req.params.id;
  const task = await taskRepo.findOne({
    where: { id: taskId },
    relations: ["user"],
  });
  if (!task || task.user.id !== userId)
    return res.status(404).json({ error: "Task not found" });

  taskRepo.merge(task, req.body);
  await taskRepo.save(task);
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: user not found" });
  }
  const userId = req.user.id;
  const taskId = req.params.id;
  const task = await taskRepo.findOne({
    where: { id: taskId },
    relations: ["user"],
  });
  if (!task || task.user.id !== userId)
    return res.status(404).json({ error: "Task not found" });

  await taskRepo.remove(task);
  res.json({ message: "Task deleted" });
};
