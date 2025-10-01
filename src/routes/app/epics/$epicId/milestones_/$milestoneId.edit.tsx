import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/epics/$epicId/milestones_/$milestoneId/edit")({
  component: MilestoneEdit
});

function MilestoneEdit() {
  const { epicId, milestoneId } = Route.useParams();
  return (
    <div className="p-3">
      Editing milestone {milestoneId} in Epic {epicId}
    </div>
  );
}
