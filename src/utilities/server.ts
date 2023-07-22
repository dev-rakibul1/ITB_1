import dotenv from 'dotenv';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from '../index';
dotenv.config();

import config from '../config/config';
import { errorLogger, logger } from '../shared/logger';

let server: Server;
const databaseConnect = async () => {
  try {
    await mongoose.connect(config.database_local_url as string);
    logger.info('Database is connected!');

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Fail to DB connected!');
  }
};

process.on('unhandledRejection', error => {
  // errorLogger.log(error);
  if (server) {
    server.close(() => {
      errorLogger.error(error);
      process.exit(1);
    });
  } else {
    process.exit(2);
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received!');
  if (server) {
    server.close();
  }
});

export default databaseConnect;
