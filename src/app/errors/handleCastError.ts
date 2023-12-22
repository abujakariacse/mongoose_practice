import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  return {
    statusCode: 500,
    message: 'Validation Error',
    errorSources: errorSources,
  };
};
