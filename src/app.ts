/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Parsers
app.use(cors());
app.use(express.json());

// Application routes
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`The server is running!`);
});

app.use(globalErrorHandler);

app.use(notFound);
export default app;
