import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { fetchJson, postToApi } from "../../../backend/fetchUtils";
import { Task } from "../../../types";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/app/tasks_/$taskId/edit")({
  loader: async ({ params, context }) => {
    const { taskId } = params;

    const now = +new Date();
    console.log(`/tasks/${taskId}/edit path loader. Loading at + ${now - context.timestarted}ms since start`);
    const task = await fetchJson<Task>(`api/tasks/${taskId}`);

    return { task };
  },
  component: TaskEdit,
  staleTime: 1000 * 60 * 2,
  gcTime: 1000 * 60 * 5,
  pendingComponent: () => <div className="m-4 p-4 text-xl">Loading task ...</div>,
  pendingMs: 150,
  pendingMinMs: 200,
});

function TaskEdit() {
  const { taskId } = Route.useParams();
  const { task } = Route.useLoaderData();
  const router = useRouter();
  const newTitleEl = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const save = async () => {
    await postToApi("api/task/update", {
      id: task.id,
      title: newTitleEl.current!.value,
    });

    router.invalidate({
      filter: route => {
        return (
          route.routeId == "/app/tasks/" ||
          (route.routeId === "/app/tasks/$taskId/" && route.params.taskId === taskId) ||
          (route.routeId === "/app/tasks_/$taskId/edit" && route.params.taskId === taskId)
        );
      },
    });

    navigate({ to: "/app/tasks" });
  };

  useEffect(() => {
    newTitleEl.current!.value = task.title;
  }, [task.title]);

  return (
    <div className="flex flex-col gap-5 p-3">
      <Link to="/app/tasks">Back to tasks list</Link>

      <div>
        <div className="flex flex-col gap-2">
          <span>Edit task {taskId}</span>
          <input className="self-start border p-2 w-64" ref={newTitleEl} defaultValue={task.title} />
          <button className="self-start p-2 border" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
