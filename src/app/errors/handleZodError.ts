import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorHandler } from '../interface/error';

export const handleZodError = (err: ZodError): TGenericErrorHandler => {
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
