import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Task } from "./entities/Task";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "tasks_db",
  synchronize: true,
  entities: [User, Task],
});
