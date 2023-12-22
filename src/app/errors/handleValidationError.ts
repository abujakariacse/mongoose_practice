import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        message: val?.message,
        path: val?.path,
      };
    },
  );
  return {
    statusCode: 500,
    message: 'Validatio Error',
    errorSources,
  };
};
