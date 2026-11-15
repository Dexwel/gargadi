import "./loadenv";
import postgres from "postgres";
import { site } from "../src/config/site";
import { createHash } from "crypto";

// ALL data below is SIMULATED for the prototype demo.
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Set DATABASE_URL first (see .env.example)");
  const sql = postgres(url, { ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require", max: 1 });

  // Safety: never wipe a database that already holds real registrations.
  const [{ n }] = await sql`SELECT COUNT(*)::int AS n FROM households WHERE is_simulated = FALSE`;
  if (n > 0 && !process.argv.includes("--force")) {
    console.error(`Refusing to seed: ${n} real household record(s) exist. Re-run with --force to replace ONLY the simulated demo data.`);
    process.exit(1);
  }
  // Remove only rows flagged as simulated. Communities are reused (never deleted) so real data stays attached.
  await sql`DELETE FROM alerts WHERE is_simulated = TRUE`;
  await sql`DELETE FROM volunteers WHERE is_simulated = TRUE`;
  await sql`DELETE FROM households WHERE is_simulated = TRUE`;
  await sql`DELETE FROM risk_zones WHERE community_id IN (SELECT id FROM communities WHERE is_simulated = TRUE)`;

  const { lat, lng } = site.pilot;
  async function community(name: string, lga: string, la: number, ln: number) {
    const [ex] = await sql`SELECT id FROM communities WHERE name = ${name} AND lga = ${lga}`;
    if (ex) { await sql`UPDATE communities SET lat = ${la}, lng = ${ln} WHERE id = ${ex.id}`; return ex; }
    const [row] = await sql`INSERT INTO communities (name, lga, lat, lng) VALUES (${name}, ${lga}, ${la}, ${ln}) RETURNING id`;
    return row;
  }
  const pilot = await community(site.pilot.name, site.pilot.lga, lat, lng);
  const b = await community("[SAMPLE COMMUNITY B]", "[LGA]", lat + 0.05, lng + 0.04);
  const c = await community("[SAMPLE COMMUNITY C]", "[LGA]", lat - 0.045, lng - 0.05);

  const zones: [number, string, string, string, number, number, number][] = [
    [pilot.id, "flood", "high", "Low-lying area near seasonal stream (simulated)", lat - 0.004, lng + 0.006, 450],
    [pilot.id, "flood", "medium", "Market road drainage (simulated)", lat + 0.005, lng - 0.004, 380],
    [pilot.id, "flood", "low", "Higher ground, north (simulated)", lat + 0.012, lng + 0.008, 500],
    [pilot.id, "disease", "high", "Standing-water pocket (simulated)", lat - 0.008, lng - 0.006, 350],
    [pilot.id, "disease", "medium", "Dense housing cluster (simulated)", lat + 0.002, lng + 0.002, 420],
    [pilot.id, "disease", "low", "Clinic catchment edge (simulated)", lat + 0.011, lng - 0.009, 450],
    [b.id, "flood", "medium", "River bend (simulated)", lat + 0.05, lng + 0.04, 500],
    [c.id, "disease", "medium", "Pond area (simulated)", lat - 0.045, lng - 0.05, 400],
  ];
  for (const z of zones) {
    await sql`INSERT INTO risk_zones (community_id, kind, level, name, lat, lng, radius_m) VALUES (${z[0]}, ${z[1]}, ${z[2]}, ${z[3]}, ${z[4]}, ${z[5]}, ${z[6]})`;
  }

  const langs = ["ha", "kr", "en"], chans = ["whatsapp", "sms"], comms = [pilot.id, pilot.id, pilot.id, b.id, c.id];
  for (let i = 1; i <= 48; i++) {
    const phone = `+23470000${String(i).padStart(5, "0")}`; // obviously fake
    await sql`INSERT INTO households (phone, community_id, language, format, channel, consent_at, consent_version, delete_token_hash, is_simulated)
      VALUES (${phone}, ${comms[i % comms.length]}, ${langs[i % 3]}, ${i % 5 === 0 ? "audio" : "text"}, ${chans[i % 2]}, now() - (${i} || ' days')::interval, 'v1-simulated', ${createHash("sha256").update("sim" + i).digest("hex")}, TRUE)`;
  }

  const vols: [string, string, number][] = [
    ["[VOLUNTEER 1]", "Community volunteer", pilot.id],
    ["[VOLUNTEER 2]", "Community volunteer", pilot.id],
    ["[PUBLIC HEALTH PRACTITIONER]", "Public health", pilot.id],
    ["[MODELER]", "Risk modeler", pilot.id],
    ["[VOLUNTEER 3]", "Community volunteer", b.id],
  ];
  for (const v of vols) await sql`INSERT INTO volunteers (name, role, community_id) VALUES (${v[0]}, ${v[1]}, ${v[2]})`;

  await sql`INSERT INTO alerts (risk_type, level, community_id, status, sent_at, recipients, sender_mode, is_simulated, created_at)
    VALUES ('flood','high',${pilot.id},'sent', now() - interval '12 days', 29, 'mock', TRUE, now() - interval '12 days'),
           ('malaria','medium',${pilot.id},'sent', now() - interval '5 days', 29, 'mock', TRUE, now() - interval '5 days')`;

  await sql.end();
  console.log("Seed done (all seeded rows are SIMULATED).");
}
main().catch((e) => { console.error(e); process.exit(1); });
