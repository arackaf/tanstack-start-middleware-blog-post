import { queryOptions } from "@tanstack/react-query";
import { getEpicsOverview } from "@/serverFn/epics";

export type EpicOverview = {
  name: string;
  count: number;
};

export const epicsSummaryQueryOptions = () => {
  return queryOptions({
    queryKey: ["epics", "summary"],
    queryFn: async () => {
      const epicsOverview = await getEpicsOverview();
      return { epicsOverview };
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5
  });
};
