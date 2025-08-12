import { getEpicsCount, getEpicsList } from "@/serverFn/epics";
import { queryOptions } from "../lib/queryOptions";
import { revalidatedQueryOptions } from "./util";

export const epicsQueryOptions = (page: number) => {
  return revalidatedQueryOptions(["epics", "list"], getEpicsList, page, {
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
