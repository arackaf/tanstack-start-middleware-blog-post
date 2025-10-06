import { DefaultError, UseBaseQueryOptions } from "@tanstack/react-query";

export const queryOptions = <
  Opts extends UseBaseQueryOptions<TQueryFnData, TError>,
  TQueryFnData = unknown,
  TError = DefaultError
>(
  options: Opts
) => {
  return options;
};
