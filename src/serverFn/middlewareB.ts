import { createMiddleware } from "@tanstack/react-start";

export const GoodA = createMiddleware({ type: "function" })
  .client(async ({ next, context }) => {
    return await next({
      sendContext: {
        C: 12
      }
    });
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

export const GoodB = createMiddleware({ type: "function" })
  .middleware([GoodA])
  .client(async ({ next, context }) => {
    const result = await next();

    const S = result.context.S;

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
