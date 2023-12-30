import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // Check is token is available or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized");
    }
    // verify token to check is it right or wrong
    jwt.verify(
      token,
      config.secret_access_token as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized");
        }

        if (
          requiredRoles &&
          !requiredRoles.includes((decoded as JwtPayload).role)
        ) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized");
        }

        req.user = decoded as JwtPayload;
      },
    );

    next();
  });
};
