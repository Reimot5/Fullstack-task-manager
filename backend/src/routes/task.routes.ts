import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { taskSchema } from "../validators/task.validator";

export const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.get("/", getTasks);
taskRouter.post("/", validate(taskSchema), createTask);
taskRouter.put("/:id", validate(taskSchema), updateTask);
taskRouter.delete("/:id", deleteTask);
