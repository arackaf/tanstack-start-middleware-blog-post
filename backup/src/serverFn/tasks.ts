import { createServerFn } from "@tanstack/react-start";
import { db } from "@/drizzle/db";
import { tasks as tasksTable, users as usersTable } from "@/drizzle/schema";
import { asc, count, eq } from "drizzle-orm";
import { loggingMiddleware } from "./middleware";

export const getTasksList = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware("get tasks list")])
  .handler(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.random()));
    const tasks = await db.select().from(tasksTable).where(eq(tasksTable.userId, 1));
    return tasks;
  });

export const getTask = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware("get task")])
  .validator((id: string) => Number(id))
  .handler(async ({ data }) => {
    const task = await db.select().from(tasksTable).where(eq(tasksTable.id, data));
    return task[0];
  });

export const getTasksOverview = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware("get tasks overview")])
  .handler(async () => {
    const results = await db
      .select({ user: usersTable.name, count: count() })
      .from(tasksTable)
      .innerJoin(usersTable, eq(tasksTable.userId, usersTable.id))
      .groupBy(usersTable.id)
      .orderBy(asc(usersTable.name));

    return results;
  });

export const updateTask = createServerFn({ method: "POST" })
  .middleware([loggingMiddleware("update task")])
  .validator((obj: { id: number; name: string }) => obj)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.random()));
    await db.update(tasksTable).set({ title: data.name }).where(eq(tasksTable.id, data.id));
  });
