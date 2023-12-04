import { NextFunction, Request, RequestHandler, Response } from 'express';

//It's used for handle asynchronus code and handle promise. It also handle DRY principle
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
export default catchAsync;
