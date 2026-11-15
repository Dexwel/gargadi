import { scryptSync, timingSafeEqual } from "crypto";

/** Node runtime only (never import from middleware). Stored format: "salt:hash" (see scripts/hash-password.ts). */
export function verifyPassword(password: string, stored: string | undefined) {
  if (!stored) return false;
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const given = scryptSync(password, salt, 32);
  const expected = Buffer.from(hash, "hex");
  return expected.length === given.length && timingSafeEqual(given, expected);
}
