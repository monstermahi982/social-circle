import { DataSource } from "typeorm";
import { User } from "./entities/User"; // You will create this entity later

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "mahi", // or use process.env.DATABASE_URL
  password: "mahi123",
  database: "social_circle",
  synchronize: true, // set to false for production
  logging: true,
  entities: [User], // Add your entities here
  migrations: [],
  subscribers: [],
});
