import { createMiddleware } from "@tanstack/react-start";

export const Bad = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      const result = await next({
        sendContext: {
          C: 12
        }
      });

      const S = result.context?.S; // property S does not exist on type never

      return result;
    })
    .server(async ({ next, context }) => {
      const result = await next({
        sendContext: {
          S: "" as string
        }
      });

      const C = result.context.C;

      return result;
    });
