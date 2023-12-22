import { TErrorSources, TGenericErrorHandler } from '../interface/error';

export const handleDuplicacyError = (err: any): TGenericErrorHandler => {
  // Use the regex pattern to extract the department name
  const match = err?.message?.match(/"([^"]+)"/);

  // Check if there is a match and extract the department name
  const extractedErrorMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedErrorMessage} is already exist`,
    },
  ];

  return {
    statusCode: 500,
    message: 'Duplicacy Error',
    errorSources,
  };
};
