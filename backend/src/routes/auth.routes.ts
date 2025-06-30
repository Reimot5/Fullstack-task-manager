import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validator";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(registerSchema), login);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/logout", logout);
