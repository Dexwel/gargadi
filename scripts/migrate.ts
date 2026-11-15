import "./loadenv";
import postgres from "postgres";
import fs from "fs";
import path from "path";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Set DATABASE_URL first (see .env.example)");
  const sql = postgres(url, { ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require", max: 1 });
  const dir = path.join(process.cwd(), "db", "migrations");
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
    console.log("Applying", f);
    await sql.unsafe(fs.readFileSync(path.join(dir, f), "utf8"));
  }
  await sql.end();
  console.log("Migrations done.");
}
main().catch((e) => { console.error(e); process.exit(1); });
