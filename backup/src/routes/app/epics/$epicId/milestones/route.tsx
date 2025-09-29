import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/epics/$epicId/milestones")({
  component: MilestonesRoute
});

function MilestonesRoute() {
  return (
    <div className="p-3">
      Milestones layout <Outlet />
    </div>
  );
}
