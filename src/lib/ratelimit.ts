import { createHash } from "crypto";
import { getSql } from "./db";

/** DB-backed fixed-window limiter (works on serverless). IPs are hashed, never stored raw. */
export async function rateLimit(bucket: string, ip: string, max: number, windowSeconds: number) {
  const sql = getSql();
  const key = `${bucket}:${createHash("sha256").update(ip + (process.env.SESSION_SECRET ?? "")).digest("hex").slice(0, 32)}`;
  const [row] = await sql`
    INSERT INTO rate_limits (key, window_start, count) VALUES (${key}, now(), 1)
    ON CONFLICT (key) DO UPDATE SET
      count = CASE WHEN rate_limits.window_start < now() - (${windowSeconds} || ' seconds')::interval THEN 1 ELSE rate_limits.count + 1 END,
      window_start = CASE WHEN rate_limits.window_start < now() - (${windowSeconds} || ' seconds')::interval THEN now() ELSE rate_limits.window_start END
    RETURNING count`;
  return { ok: row.count <= max, count: row.count as number };
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
