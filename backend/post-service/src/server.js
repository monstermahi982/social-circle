"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const User_1 = require("./entities/User");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Initialize database connection
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
})
    .catch((error) => console.log("Error connecting to the database", error));
// Create User API
app.post("/api/user", async (req, res) => {
    const { name, email, password, phoneNumber, type } = req.body;
    const user = new User_1.User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.phoneNumber = phoneNumber;
    user.type = type;
    user.isVerified = type === "admin"; // Admin is verified by default
    try {
        const savedUser = await data_source_1.AppDataSource.manager.save(user);
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
// Get All Users
app.get("/api/users", async (req, res) => {
    try {
        const users = await data_source_1.AppDataSource.manager.find(User_1.User);
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
app.put("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password, phoneNumber } = req.body;
    try {
        const user = await data_source_1.AppDataSource.manager.findOneBy(User_1.User, { id: parseInt(id) });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        const updatedUser = await data_source_1.AppDataSource.manager.save(user);
        return res.json(updatedUser);
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to update user" });
    }
});
// Delete User
app.delete("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await data_source_1.AppDataSource.manager.delete(User_1.User, id);
        res.json({ message: "User deleted", result });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});
// Search User by Name or Email
app.get("/api/users/search", async (req, res) => {
    const { query } = req.query;
    try {
        const users = await data_source_1.AppDataSource.manager.find(User_1.User, {
            where: [{ name: query }, { email: query }],
        });
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to search users" });
    }
});
// Block User
app.post("/api/user/:id/block", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await data_source_1.AppDataSource.manager.findOneBy(User_1.User, {
            id: parseInt(id),
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.isBlocked = true;
        await data_source_1.AppDataSource.manager.save(user);
        res.json({ message: "User blocked" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to block user" });
    }
});
// Unblock User
app.post("/api/user/:id/unblock", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await data_source_1.AppDataSource.manager.findOneBy(User_1.User, {
            id: parseInt(id),
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.isBlocked = false;
        await data_source_1.AppDataSource.manager.save(user);
        res.json({ message: "User unblocked" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to unblock user" });
    }
});
// Verify User
app.post("/api/user/:id/verify", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await data_source_1.AppDataSource.manager.findOneBy(User_1.User, {
            id: parseInt(id),
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.isVerified = true;
        await data_source_1.AppDataSource.manager.save(user);
        res.json({ message: "User verified" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to verify user" });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
