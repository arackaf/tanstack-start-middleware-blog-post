import { createMiddleware } from "@tanstack/react-start";
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

function getExistingTraceId() {
  const store = asyncLocalStorage.getStore() as any;
  return store?.yoyoyo;
}

export const middlewareDemo = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    console.log("client before");

    const result = await next({
      sendContext: {
        hello: "world"
      }
    });

    console.log("client after");

    return result;
  })
  .server(async ({ next }) => {
    console.log("server before");

    const result = await asyncLocalStorage.run({ yoyoyo: "asyncLocalStorage value" }, async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const result = await next({
        sendContext: {
          value: 12
        }
      });

      console.log("server after");

      return result;
    });

    return result;
  });
