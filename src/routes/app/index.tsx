import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div>
      Hello "/app/"!
      <br />
      <Link to="/app/epics" search={{ page: 1 }}>
        Epics
      </Link>
    </div>
  );
}
