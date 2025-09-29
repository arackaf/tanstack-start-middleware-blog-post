import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { epicsSummaryQueryOptions } from "../../../queries/epicsSummaryQuery";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/app/epics")({
  component: EpicLayout,
  loader({ context }) {
    const queryClient = context.queryClient;
    queryClient.prefetchQuery(epicsSummaryQueryOptions());
  },
  pendingComponent: () => <div className="p-3 text-xl">Loading epics route ...</div>
});

function EpicLayout() {
  const { data } = useSuspenseQuery(epicsSummaryQueryOptions());

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Epics overview</h2>
      <div className="self-start inline-grid grid-cols-[auto_auto] gap-x-12 items-center p-3">
        {data.epicsOverview.map(epic => (
          <Fragment key={epic.name}>
            <div className="font-bold">{epic.name}</div>
            <div className="justify-self-end">{epic.count}</div>
          </Fragment>
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
