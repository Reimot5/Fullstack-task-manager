import { z } from "zod";
import { Status } from "../entities/Task";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().nullable().optional(),
  status: z.nativeEnum(Status),
});
