"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Sample API route with proper types for `req` and `res`
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Another API route with proper types for `req` and `res`
app.get('/api/greet', (req, res) => {
    res.json({ message: 'Hello , from the API!' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
