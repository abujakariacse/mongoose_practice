export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorHandler = {
  message: string;
  statusCode: number;
  errorSources: TErrorSources;
};
