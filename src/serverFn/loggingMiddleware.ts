import { createMiddleware } from "@tanstack/react-start";
import { addLog, setClientEnd } from "./logging";

export const loggingMiddleware = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log("middleware for", name, "client", context);

      const clientStart = new Date().toISOString();

      const result = await next({
        sendContext: {
          clientStart
        }
      });

      const clientEnd = new Date().toISOString();
      // ERROR: 'result.context' is possibly 'undefined'
      const loggingId = result.context.loggingId;

      console.log("MANUEL -> loggingId", loggingId);

      await setClientEnd({ data: { id: loggingId, clientEnd } });

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
