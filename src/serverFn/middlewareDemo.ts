import { createMiddleware } from "@tanstack/react-start";

export const middlewareDemo = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log("client before", name, context);

      const result = await next({
        sendContext: {
          hello: "world"
        }
      });

      console.log("client after", name, result.context);

      return result;
    })
    .server(async ({ next, context }) => {
      console.log("server before", name, context);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const result = await next({
        sendContext: {
          value: 12
        }
      });

      console.log("server after", name, context);

      return result;
    });
