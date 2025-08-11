import { createMiddleware } from "@tanstack/react-start";

import { addLog } from "@/queries/logging";

export const loggingMiddlewarePre = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log(name, "client", context);

      const xxx = await next({
        sendContext: {
          traceId: crypto.randomUUID(),
          clientStart: new Date().toISOString()
        }
      });

      console.log("after next", xxx);

      return xxx;
    })
    .server(async ({ next, context }) => {
      console.log("Server A");
      await new Promise(resolve => setTimeout(resolve, 1000 * 1));
      const start = +new Date();
      const result = await next({ sendContext: { message: "Success" } });
      const end = +new Date();

      //addLog(name, context.clientStart, context.traceId, end - start);

      return result;
    });

export const loggingMiddleware = (name: string) =>
  createMiddleware({ type: "function" })
    .middleware([loggingMiddlewarePre(name)])
    .client(async ({ next, context }) => {
      const result = await next({});
      console.log("post hopefully", result);

      return result;
    });
