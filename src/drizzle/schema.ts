import { sqliteTable, AnySQLiteColumn, integer, text, numeric } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer().primaryKey(),
  name: text().notNull()
});

export const epics = sqliteTable("epics", {
  id: integer().primaryKey(),
  name: text().notNull()
});

export const tasks = sqliteTable("tasks", {
  id: integer().primaryKey(),
  title: text().notNull(),
  epicId: integer(),
  userId: integer()
});

export const milestones = sqliteTable("milestones", {
  id: integer().primaryKey(),
  epicId: integer(),
  name: text().notNull()
});

export const actionLog = sqliteTable("action_log", {
  id: text().primaryKey(),
  traceId: text("trace_id"),
  clientStart: text("client_start"),
  clientEnd: text("client_end"),
  actionName: text("action_name").notNull(),
  actionDuration: numeric("action_duration", { mode: "number" })
});
