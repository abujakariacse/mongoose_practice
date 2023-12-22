import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';

export const handleZodError = (err: ZodError) => {
  const errorSources: TErrorSources = err?.issues?.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue?.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation error',
    errorSources,
  };
};
