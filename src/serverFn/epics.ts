import { createServerFn } from "@tanstack/react-start";
import { db } from "@/drizzle/db";
import { epics as epicsTable, tasks as tasksTable, milestones as milestonesTable } from "@/drizzle/schema";
import { asc, count, eq } from "drizzle-orm";
import { loggingMiddleware } from "./loggingMiddleware";
import { loggingMiddleware as loggingMiddlewareV2 } from "./loggingMiddlewareV2";
import { loggingMiddleware as loggingMiddlewareV3 } from "./loggingMiddlewareV3";

export const getEpicsList = createServerFn({ method: "GET" })
  .inputValidator((page: number) => page)
  //.middleware([loggingMiddleware("get epics list")])
  //.middleware([loggingMiddlewareV2("get epics list")])
  .handler(async ({ data, context }) => {
    console.log("getEpicsList serverFn", context);
    const epics = await db
      .select()
      .from(epicsTable)
      .offset((data - 1) * 4)
      .limit(4);

    return epics;
  });

export const getEpic = createServerFn({ method: "GET" })
  .middleware([loggingMiddlewareV3("get epic")])
  .inputValidator((id: string | number) => Number(id))
  .handler(async ({ data }) => {
    const epic = await db.select().from(epicsTable).where(eq(epicsTable.id, data));
    return epic[0];
  });

export const getEpicsCount = createServerFn({ method: "GET" })
  // .middleware([loggingMiddleware("get epics count")])
  .handler(async () => {
    const count = await db.$count(epicsTable);
    return { count };
  });

export const getEpicsOverview = createServerFn({ method: "GET" })
  // .middleware([loggingMiddleware("get epics overview")])
  .handler(async ({}) => {
    const subQuery = db
      .select({ epicId: epicsTable.id, count: count().as("count") })
      .from(epicsTable)
      .innerJoin(tasksTable, eq(epicsTable.id, tasksTable.epicId))
      .groupBy(epicsTable.id)
      .as("epic_counts");

    const query = db
      .with(subQuery)
      .select({ id: epicsTable.id, name: epicsTable.name, count: subQuery.count })
      .from(epicsTable)
      .innerJoin(subQuery, eq(epicsTable.id, subQuery.epicId))
      .orderBy(asc(subQuery.count));

    const results = await query;
    return results;
  });

export const getEpicMilestones = createServerFn({ method: "GET" })
  // .middleware([loggingMiddleware("get epic milestones")])
  .inputValidator((id: string | number) => Number(id))
  .handler(async ({ data }) => {
    const milestones = await db
      .select()
      .from(milestonesTable)
      .where(eq(milestonesTable.epicId, data))
      .orderBy(milestonesTable.id);
    return milestones;
  });

export const updateEpic = createServerFn({ method: "POST" })
  .middleware([loggingMiddleware("update epic")])
  .inputValidator((obj: { id: number; name: string }) => obj)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.random()));
    await db.update(epicsTable).set({ name: data.name }).where(eq(epicsTable.id, data.id));

    const updatedEpic = await getEpic({ data: data.id });
    return updatedEpic;
  });
