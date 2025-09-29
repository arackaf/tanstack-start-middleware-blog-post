import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => {
    function login() {
      const age = 60 * 60 * 24 * 30;
      document.cookie = `user=1;path=/;max-age=${age}`;

      redirect({ to: "/app" });
    }

    const navigate = useNavigate();

    function executeLogin() {
      login();
      navigate({ to: "/app" });
    }

    return (
      <div>
        <div>Log back in</div>
        <button className="border p-1" onClick={executeLogin}>
          Login
        </button>
      </div>
    );
  }
});
