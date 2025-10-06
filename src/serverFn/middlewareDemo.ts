import { createMiddleware } from "@tanstack/react-start";

export const middlewareDemo = createMiddleware({ type: "function" })
  .client(async ({ next, context }) => {
    console.log("client before");

    const result = await next({
      sendContext: {
        hello: "world"
      }
    });

    console.log("client after", result.context);

    return result;
  })
  .server(async ({ next, context }) => {
    console.log("server before", context);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await next({
      sendContext: {
        value: 12
      }
    });

    console.log("server after", context);

    return result;
  });
