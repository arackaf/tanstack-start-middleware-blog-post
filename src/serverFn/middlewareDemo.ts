import { createMiddleware } from "@tanstack/react-start";
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

function getExistingTraceId() {
  const store = asyncLocalStorage.getStore() as any;
  return store?.yoyoyo;
}

export const middlewareDemo = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      //console.log("client before", name, context);

      const result = await next({
        sendContext: {
          hello: "world"
        }
      });

      //console.log("client after", name, result.context);

      return result;
    })
    .server(async ({ next, context }) => {
      const existingTraceId = getExistingTraceId();
      console.log("server before", name, { existingTraceId }, context);

      const result = await asyncLocalStorage.run({ yoyoyo: "asyncLocalStorage value" }, async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = await next({
          sendContext: {
            value: 12
          }
        });

        console.log("server after", name, context);

        return result;
      });

      return result;
    });
