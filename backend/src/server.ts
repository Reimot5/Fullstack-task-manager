import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./data-source";

dotenv.config();

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error DB connection", err));
