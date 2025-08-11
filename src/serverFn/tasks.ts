import { createServerFn } from "@tanstack/react-start";
import { db } from "@/drizzle/db";
import { tasks as tasksTable, users as usersTable } from "@/drizzle/schema";
import { asc, count, eq } from "drizzle-orm";

export const getTasksList = createServerFn({ method: "GET" }).handler(async () => {
  const tasks = await db.select().from(tasksTable).where(eq(tasksTable.userId, 1));
  return tasks;
});

export const getTask = createServerFn({ method: "GET" })
  .validator((id: string) => Number(id))
  .handler(async ({ data }) => {
    const task = await db.select().from(tasksTable).where(eq(tasksTable.id, data));
    return task[0];
  });

export const getTasksOverview = createServerFn({ method: "GET" }).handler(async () => {
  const results = await db
    .select({ user: usersTable.name, count: count() })
    .from(tasksTable)
    .innerJoin(usersTable, eq(tasksTable.userId, usersTable.id))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.name));

  return results;
});

export const updateTask = createServerFn({ method: "POST" })
  .validator((obj: { id: number; name: string }) => obj)
  .handler(async ({ data }) => {
    await db.update(tasksTable).set({ title: data.name }).where(eq(tasksTable.id, data.id));
  });
