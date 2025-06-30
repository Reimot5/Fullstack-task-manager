import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes";
import { taskRouter } from "./routes/task.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.use(errorHandler);

export default app;
