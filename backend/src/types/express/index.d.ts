import express from "express";
import { User } from "../../entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
export interface AuthenticatedRequest extends express.Request {
  user?: any;
}
