import { createMiddleware } from "@tanstack/react-start";
import { addLog, setClientEnd } from "./logging";
import { getTasksList } from "./tasks";

export const loggingMiddleware = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log(name, "client", context);

      console.log("client A");
      const result = await next({
        sendContext: {
          traceId: crypto.randomUUID(),
          clientStart: new Date().toISOString(),
          callIt: getTasksList
        }
      });
      console.log("client B");

      //const clientEnd = new Date().toISOString();
      //const loggingId = result.context.loggingId;

      //await setClientEnd({ data: { id: loggingId, clientEnd } });

      return result;
    })
    .server(async ({ next, context }) => {
      console.log("server A");
      const serverFn = context.callIt;

      console.log("serverFn", serverFn);

      const results = await serverFn();
      console.log("serverFn results", results);

      const start = +new Date();
      const result = await next({
        sendContext: {
          loggingId: "" as string
        }
      });
      const end = +new Date();

      //const id = await addLog(name, context.clientStart, context.traceId, end - start);
      //result.sendContext.loggingId = id;

      return result;
    });
