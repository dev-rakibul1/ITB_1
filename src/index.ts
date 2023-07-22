import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes/all.routes';
import databaseConnect from './utilities/server';
const app: Application = express();

// middle were calling
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Application router or Application middleware

app.use('/api/v1', router);
/**
 * GLOBAL ERROR HANDLING AND PRODUCTION LABEL
 */

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhand promise rejection'))
//   console.log(x)
// })
app.use(globalErrorHandler);

// global error handling
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found.',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found!',
      },
    ],
  });
  next();
});

// database calling
databaseConnect();

export default app;
