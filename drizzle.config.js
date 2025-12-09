
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.jsx",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
