import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // Check is token is available or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized");
    }

    // verify token to check is it right or wrong
    const decoded = jwt.verify(
      token,
      config.secret_access_token as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    const isUserExist = await User.isUserExistByCustomId(userId);
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exist ');
    }

    // Check is user deleted or not
    const isUserDeleted = isUserExist.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted ');
    }

    // Check user is blocked
    const isUserBlocked = isUserExist.status;
    if (isUserBlocked === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked ');
    }

    if (
      isUserExist.passwordUpdateAt &&
      User.isJWTIssuedBeforePasswordChange(
        isUserExist.passwordUpdateAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized");
    }

    req.user = decoded;

    next();
  });
};
