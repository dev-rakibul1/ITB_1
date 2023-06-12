import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { userRoutes } from './app/modules/user/user.route';
import databaseConnect from './utilities/server';
const app: Application = express();

// middle were calling
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Application router or Application middleware
app.use('/api/v1/user/', userRoutes);

/**
 * GLOBAL ERROR HANDLING AND PRODUCTION LABEL
 */

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhand promise rejection'))
//   console.log(x)
// })
app.use(globalErrorHandler);

// global error handling
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'Your route not found',
  });
});

// database calling
databaseConnect();

export default app;
