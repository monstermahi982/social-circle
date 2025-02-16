import express, { Request, Response } from "express";
import PostRoutes from "./Routes/Post";
// import CommentRoutes from "./routes/comments";
// import ActionRoutes from "./routes/actions";
import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import cors from "cors";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  console.log(".env file loaded successfully");
}

const app = express();
const port = process.env.PORT || 4000;

// mongodb connection
const DB_URL: string =
  process.env.DATABASE_URL || "mongodb://localhost:27017/social_circle";
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use("/api/posts", PostRoutes);
// app.use("/api/comments", cors(), CommentRoutes);
// app.use("/api/action", cors(), ActionRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});