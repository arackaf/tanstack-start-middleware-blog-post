import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { getTasksOverview } from "@/serverFn/tasks";

export const Route = createFileRoute("/app/tasks")({
  component: TasksLayout,
  loader: async () => {
    const tasksOverview = await getTasksOverview();
    return { tasksOverview };
  },
  errorComponent: () => <h1>Yooo</h1>,
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 2
});

function TasksLayout() {
  const { tasksOverview } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Tasks overview</h2>
      <div className="self-start inline-grid grid-cols-[auto_auto] gap-x-12 items-center p-3">
        {tasksOverview.map(item => (
          <Fragment key={item.user}>
            <div className="font-bold">{item.user}</div>
            <div className="justify-self-end">{item.count}</div>
          </Fragment>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
