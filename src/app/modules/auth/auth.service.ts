import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';
const loginUser = async (payload: TLoginUser) => {
  // Check if user exist or not using statics

  const isUserExist = await User.isUserExistByCustomId(payload?.id);
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
    !(await User.isPasswordMatched(payload?.password, isUserExist.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }

  const userPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(
    userPayload,
    config.secret_access_token as string,
    { expiresIn: '10d' },
  );

  return {
    accessToken: accessToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
  };
};

export const authServices = {
  loginUser,
};
