import { drizzle } from "drizzle-orm/libsql";
import path from "path";

const __dirname = import.meta.dirname;

export const db = drizzle({
  connection: {
    url: `file:${path.join(__dirname, "../../backend/db.txt")}`
  }
});
