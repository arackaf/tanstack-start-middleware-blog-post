import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { epicQueryOptions } from "@/queries/epicQuery";
import { updateEpic } from "@/serverFn/epics";

export const Route = createFileRoute("/app/epics/$epicId/edit")({
  component: EditEpic,
  context({ params }) {
    return {
      currentEpicOptions: epicQueryOptions(params.epicId)
    };
  },
  loader({ context }) {
    context.queryClient.prefetchQuery(context.currentEpicOptions);
  }
});

function EditEpic() {
  const { currentEpicOptions } = Route.useRouteContext();
  //const { epicId } = Route.useParams();

  const { data: epic } = useSuspenseQuery(currentEpicOptions);
  const newName = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);

  //const queryClient = useQueryClient();

  const runSave = useServerFn(updateEpic);

  const save = async () => {
    console.log("HELLO");
    setSaving(true);

    const result: any = await runSave({
      data: {
        id: epic.id,
        name: newName.current!.value
      }
    });

    console.log({ result });

    //const listOptions = epicsQueryOptions(1);

    //queryClient.invalidateQueries({ queryKey: ["epics"], refetchType: "none" });
    // queryClient.invalidateQueries({ queryKey: ["epic"], refetchType: "none" });
    // queryClient.removeQueries({ queryKey: ["epic"], refetchType: "none" });

    //queryClient.setQueryData(["epics", "list", 1], result.query.listData, { updatedAt: Date.now() });
    //queryClient.setQueryData(["epic", "1"], result.query.epicData, { updatedAt: Date.now() });

    //queryClient.refetchQueries({ queryKey: ["epics"], type: "active", stale: true });
    //queryClient.refetchQueries({ queryKey: ["epic"], type: "active", stale: true });

    setSaving(false);
  };

  useEffect(() => {
    newName.current!.value = epic.name;
  }, [epic.name]);

  return (
    <div className="flex flex-col gap-5 p-3">
      <div>
        <Link to="/app/epics" search={{ page: 1 }}>
          Back
        </Link>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <span>Edit epic {epic.id}</span>
          <span>{epic.name}</span>
          <input className="self-start border p-2 w-64" ref={newName} defaultValue={epic.name ?? ""} />
          <div className="flex gap-2"></div>
          <button className="self-start p-2 border" onClick={save}>
            Save
          </button>
          {saving && <span>Saving...</span>}
        </div>
      </div>
    </div>
  );
}
