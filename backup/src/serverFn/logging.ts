import { db } from "@/drizzle/db";
import { actionLog } from "@/drizzle/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

type AddLogPayload = { actionName: string; clientStart: string; traceId: string; duration: number };

export const addLog = createServerFn({ method: "POST" })
  .inputValidator((payload: AddLogPayload) => payload)
  .handler(async ({ data }) => {
    const { actionName, clientStart, traceId, duration } = data;

    const id = crypto.randomUUID();
    await db.insert(actionLog).values({
      id,
      traceId,
      clientStart,
      clientEnd: "",
      actionName,
      actionDuration: duration
    });

    return id as string;
  });

export const setClientEnd = createServerFn({ method: "POST" })
  .inputValidator((payload: { id: string; clientEnd: string }) => payload)
  .handler(async ({ data }) => {
    await db.update(actionLog).set({ clientEnd: data.clientEnd }).where(eq(actionLog.id, data.id));
  });
