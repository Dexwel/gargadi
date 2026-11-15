import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined;
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. See .env.example");
  if (!global.__sql) {
    global.__sql = postgres(url, { max: 3, idle_timeout: 20, ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require", prepare: false });
  }
  return global.__sql;
}

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);
