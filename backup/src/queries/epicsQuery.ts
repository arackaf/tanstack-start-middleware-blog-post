import { getEpicsCount, getEpicsList } from "@/serverFn/epics";
import { queryOptions } from "../lib/queryOptions";

export const epicsQueryOptions = (page: number) => {
  return queryOptions({
    queryKey: ["epics", "list", page],
    queryFn: async () => {
      const epics = await getEpicsList({ data: page });
      return epics;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5
  });
};

export const epicsCountQueryOptions = () => {
  return queryOptions({
    queryKey: ["epics", "count"],
    queryFn: async () => {
      const result = await getEpicsCount();
      return result;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5
  });
};
