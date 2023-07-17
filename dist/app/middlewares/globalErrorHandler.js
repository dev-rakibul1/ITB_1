'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const zod_1 = require('zod');
const config_1 = __importDefault(require('../../config/config'));
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const handleCastError_1 = __importDefault(
  require('../../errors/handleCastError')
);
const handleValidationError_1 = require('../../errors/handleValidationError');
const handleZodError_1 = __importDefault(
  require('../../errors/handleZodError')
);
const logger_1 = require('../../shared/logger');
const globalErrorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config_1.default.env === 'development'
    ? console.log('Global error ~~', err)
    : logger_1.errorLogger.error('Global error ~~', err);
  let statusCode = 500;
  let message = 'Something is wrong!';
  let errorMessage = [];
  if (
    (err === null || err === void 0 ? void 0 : err.name) === 'ValidationError'
  ) {
    const simplifiedError = (0, handleValidationError_1.handleValidationError)(
      err
    );
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err instanceof zod_1.ZodError) {
    const simplifiedError = (0, handleZodError_1.default)(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (
    (err === null || err === void 0 ? void 0 : err.name) === 'CastError'
  ) {
    const simplifiedError = (0, handleCastError_1.default)(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err instanceof ApiError_1.default) {
    statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
    message = err === null || err === void 0 ? void 0 : err.message;
    errorMessage = (err === null || err === void 0 ? void 0 : err.message)
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err === null || err === void 0 ? void 0 : err.message;
    errorMessage = (err === null || err === void 0 ? void 0 : err.message)
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack:
      config_1.default.env !== 'production'
        ? err === null || err === void 0
          ? void 0
          : err.stack
        : undefined,
  });
  next();
};
exports.default = globalErrorHandler;
