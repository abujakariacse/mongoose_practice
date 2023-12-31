import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

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

  const accessToken = createToken(
    userPayload,
    config.secret_access_token as string,
    config.secret_access_expires_in as string,
  );

  const refreshToken = createToken(
    userPayload,
    config.secret_refresh_token as string,
    config.secret_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
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

const refreshToken = async (token: string) => {
  // verify token to check is it right or wrong
  const decoded = verifyToken(token, config.secret_refresh_token as string);

  const { userId, iat } = decoded;

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

  const userPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = createToken(
    userPayload,
    config.secret_access_token as string,
    config.secret_access_expires_in as string,
  );
  return {
    accessToken,
  };
};

const forgotPassword = async (id: string) => {
  const isUserExist = await User.isUserExistByCustomId(id);
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

  const userPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };

  const resetToken = createToken(
    userPayload,
    config.secret_access_token as string,
    '10m',
  );
  const resetPasswordLink = `${config.reset_pass_url}?id=${isUserExist.id}&token=${resetToken}`;

  sendEmail(isUserExist.email, resetPasswordLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, "You're not authorized");
  }
  const isUserExist = await User.isUserExistByCustomId(payload?.id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "You're not authorized");
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

  // verify token to check is it right or wrong
  const decoded = verifyToken(token, config.secret_access_token as string);

  const { userId } = decoded;

  if (userId !== payload?.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You're not authorized");
  }
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.salt_round),
  );
  await User.findOneAndUpdate(
    { id: decoded?.userId, role: decoded?.role },
    {
      password: newHashedPassword,
      passwordUpdateAt: new Date(),
    },
  );
  return null;
};

export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
