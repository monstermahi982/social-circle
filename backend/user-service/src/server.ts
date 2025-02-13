import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample API route with proper types for `req` and `res`
app.get('/', (request: any, response: Response) => {
  response.send('Hello, World!');
});

// // Another API route with proper types for `req` and `res`
// app.get('/api/greet', (req: Request, res: Response) => {
//   res.json({ message: 'Hello , from the API!' });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
