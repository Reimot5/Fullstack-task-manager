import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { hashPassword, comparePasswords } from "../utils/hash";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existing = await userRepo.findOneBy({ email });
  if (existing) return res.status(400).json({ error: "Email already in use" });

  const passwordHash = await hashPassword(password);
  const user = userRepo.create({ email, passwordHash });
  await userRepo.save(user);

  res.status(201).json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userRepo.findOneBy({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await comparePasswords(password, user.passwordHash);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const accessToken = signAccessToken({ id: user.id });
  const refreshToken = signRefreshToken({ id: user.id });

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ accessToken });
};

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "Missing refresh token" });

  try {
    const payload = verifyRefreshToken(token);
    const accessToken = signAccessToken({ id: (payload as any).id });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: "Invalid refresh token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({ message: "Logged out" });
};
