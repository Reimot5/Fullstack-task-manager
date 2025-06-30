import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e: any) {
      console.error("Validation error:", e.errors);
      res.status(400).json({ error: e.errors });
    }
  };
