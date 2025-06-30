import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/express";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  if (!header)
    return res.status(401).json({ error: "Missing Authorization header" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const payload = verifyAccessToken(token);
    if (typeof payload === "string" || !payload) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
