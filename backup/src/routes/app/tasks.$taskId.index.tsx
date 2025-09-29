import { use } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getTask } from "../../serverFn/tasks";

export const Route = createFileRoute("/app/tasks/$taskId/")({
  loader: async ({ params, context }) => {
    const { taskId } = params;

    if (taskId == "22") {
      throw new Error("I don't want to");
    }
    const now = +new Date();
    console.log(`/tasks/${taskId} path loader. Loading at + ${now - context.timestarted}ms since start`);
    const task = getTask({ data: taskId });

    return { task };
  },
  component: TaskView,
  staleTime: 1000 * 60 * 2,
  gcTime: 1000 * 60 * 5,
  errorComponent: ({}) => <div className="m-4 p-4 text-xl text-red-500">Error loading task :(</div>,
  pendingComponent: () => <div className="m-4 p-4 text-xl">Loading task ...</div>,
  pendingMs: 150,
  pendingMinMs: 200
});

function TaskView() {
  const { task: taskPromise } = Route.useLoaderData();
  const { isFetching } = Route.useMatch();

  const task = use(taskPromise);

  return (
    <div className="flex flex-col gap-4 p-3">
      <Link to="/app/tasks">Back to tasks list</Link>
      <div className="flex flex-col gap-2">
        <div>
          Task {task.id} {isFetching ? "Loading ..." : null}
        </div>
        <h1 className="text-lg">{task.title}</h1>
        <Link className="text-blue-500 underline" to="/app/tasks/$taskId/edit" params={{ taskId: task.id }}>
          Edit
        </Link>
        <div />
      </div>
    </div>
  );
}
