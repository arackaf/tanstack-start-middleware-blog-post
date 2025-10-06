import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: "./backend/db.txt"
  },
  out: "./src/drizzle"
});
