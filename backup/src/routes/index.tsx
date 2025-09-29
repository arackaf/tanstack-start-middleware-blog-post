import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index
});

function Index() {
  return (
    <div className="m-3">
      <h2 className="text-2xl">Public Homepage</h2>
    </div>
  );
}
