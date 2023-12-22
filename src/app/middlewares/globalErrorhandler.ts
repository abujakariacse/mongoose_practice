/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { MongooseError } from 'mongoose';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  // Common boilerplate for errorSource
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handleZodError = (err: ZodError) => {
    statusCode = 400;
    errorSources = err?.issues?.map((issue: ZodIssue) => ({
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }));

    return {
      statusCode,
      message: 'Validation error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/* 
Pattern:
* Success
* message
* ErrorSources [
  path: "",
  message:""
]
* stack

*/
