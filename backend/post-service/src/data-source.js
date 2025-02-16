"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User"); // You will create this entity later
// Load environment variables from .env file
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mahi", // or use process.env.DATABASE_URL
    password: "mahi123",
    database: "social_circle",
    synchronize: true, // set to false for production
    logging: true,
    entities: [User_1.User], // Add your entities here
    migrations: [],
    subscribers: [],
});
