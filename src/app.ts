import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/module/student.route';

const app: Application = express();

// Parsers
app.use(cors());
app.use(express.json());

// Application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(`Hello duniya!`);
});

export default app;
