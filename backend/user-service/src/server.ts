import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./Routes/User";

const app = express();
const port = 3000;

app.use(express.json());

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error: Error) => console.log("Error connecting to the database", error));

// Mount routes
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});