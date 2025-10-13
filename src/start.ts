import { createMiddleware, createStart } from "@tanstack/react-start";

export const globalMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next, context }) => {
    //console.log("Global Middleware", "client", context);

    const result = await next({
      context: {
        yooooooClient: 12
      },
      sendContext: {
        heyooooooo: 12
      }
    });

    return result;
  })
  .server(async ({ next, context }) => {
    //console.log("Global Middleware", "server", context);

    return await next({
      context: {
        thisIsTheValueImLookingFor: 69420
      },
      sendContext: {
        fooooooooo: "abc"
      }
    });
  });

export const startInstance = createStart(() => {
  return {
    functionMiddleware: [globalMiddleware]
  };
});
