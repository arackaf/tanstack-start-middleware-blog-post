import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  async beforeLoad({ context }) {
    if (!context.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  pendingMs: 200,
  pendingMinMs: 0,
  pendingComponent: () => <div className="m-4 p-4 text-blue-600 text-3xl">Loading App ...</div>,
  gcTime: 1000 * 60 * 10,
  staleTime: 1000 * 60 * 10,
  component: () => {
    const context = Route.useRouteContext();

    return (
      <div>
        <div className="p-2 flex gap-4">
          <span className="mr-7">Welcome: {context.user!.name}</span>
          <Link to="/app" activeOptions={{ exact: true }} className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/app/tasks" className="[&.active]:font-bold">
            Tasks
          </Link>
          <Link to="/app/epics" search={{ page: 1 }} className="[&.active]:font-bold">
            Epics
          </Link>
        </div>
        <hr />
        <div className="m-3">
          <Outlet />
        </div>
      </div>
    );
  },
});
