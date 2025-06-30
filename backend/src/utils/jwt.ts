import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
