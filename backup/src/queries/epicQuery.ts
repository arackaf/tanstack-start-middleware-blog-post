import { queryOptions } from "@tanstack/react-query";
import { getEpic } from "@/serverFn/epics";

export const epicQueryOptions = (id: string | number) => {
  id = Number(id);

  return queryOptions({
    queryKey: ["epic", id],
    queryFn: async () => {
      const epic = await getEpic({ data: id });
      return epic;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5
  });
};
