import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { epicQueryOptions } from "../../../../queries/epicQuery";

export const Route = createFileRoute("/app/epics/$epicId/")({
  component: EpicIndex,
  loader: ({ context, params }) => {
    const { queryClient } = context;
    queryClient.ensureQueryData(epicQueryOptions(params.epicId));
  },
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
  pendingComponent: () => <div className="m-4 p-4 text-xl">Loading epic ...</div>
});

function EpicIndex() {
  const { epicId } = Route.useParams();

  const { data: epic } = useSuspenseQuery(epicQueryOptions(epicId));

  return (
    <div className="flex flex-col gap-3 p-3">
      <Link to="/app/epics" search={{ page: 1 }}>
        Back to epics list
      </Link>
      <h2 className="text-xl">{epic.name}</h2>
      <Link to="/app/epics/$epicId/milestones" params={{ epicId }} search={{ search: "" }}>
        View milestones
      </Link>
    </div>
  );
}
