import { IntersectAllValidatorInputs, RequiredFetcher } from "@tanstack/react-start";
import { QueryKey, queryOptions, AnyUseQueryOptions } from "@tanstack/react-query";
import { Expand } from "@tanstack/react-router";

type OtherQueryOptions = Omit<AnyUseQueryOptions, "queryKey" | "queryFn" | "meta">;

export const revalidatedQueryOptions = <T, U>(
  prefixKey: QueryKey,
  serverFn: RequiredFetcher<any, T, U, any>,
  args: Expand<IntersectAllValidatorInputs<any, T>>,
  otherQueryOptions: OtherQueryOptions
) => {
  const prefixKeyArr = Array.isArray(prefixKey) ? prefixKey : [prefixKey];

  return queryOptions<U>({
    ...otherQueryOptions,
    queryKey: [...prefixKeyArr, args] as any,
    queryFn: async () => {
      const result = (await serverFn({ data: args })) as U;
      return result;
    },
    meta: {
      THIS_IS_THE_PROBLEM: () => {}
    }
  });
};
