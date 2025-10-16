import { createMiddleware } from "@tanstack/react-start";
import { addLog, setClientEnd } from "./logging";

const loggingMiddlewarePre = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log("middleware for", name, "client", context);

      const clientStart = new Date().toISOString();

      const result = await next({
        sendContext: {
          clientStart
        }
      });

      return result;
    })
    .server(async ({ next, context }) => {
      const traceId = crypto.randomUUID();

      const start = +new Date();

      const result = await next({
        sendContext: {
          loggingId: "" as string
        }
      });

      const end = +new Date();

      const id = await addLog({
        data: { actionName: name, clientStart: context.clientStart, traceId: traceId, duration: end - start }
      });
      result.sendContext.loggingId = id;

      return result;
    });

export const loggingMiddleware = (name: string) =>
  createMiddleware({ type: "function" })
    .middleware([loggingMiddlewarePre(name)])
    .client(async ({ next }) => {
      const result = await next();

      const clientEnd = new Date().toISOString();
      const loggingId = result.context.loggingId;

      await setClientEnd({ data: { id: loggingId, clientEnd } });

      return result;
    });
