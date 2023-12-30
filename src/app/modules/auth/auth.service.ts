import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

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

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const isUserExist = await User.isUserExistByCustomId(userData.userId);
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
    !(await User.isPasswordMatched(payload?.oldPassword, isUserExist.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordUpdateAt: new Date(),
    },
  );
  return null;
};

export const authServices = {
  loginUser,
  changePassword,
};
