export const SESSION_COOKIE = "gargadi_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

const enc = new TextEncoder();
const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Edge-safe (works in middleware and routes). */
export async function createSessionValue(secret: string, now = Date.now()) {
  const exp = Math.floor(now / 1000) + MAX_AGE_SECONDS;
  return `${exp}.${await hmac(secret, String(exp))}`;
}

export async function verifySessionValue(value: string | undefined, secret: string | undefined, now = Date.now()) {
  if (!value || !secret) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Math.floor(now / 1000)) return false;
  const expected = await hmac(secret, exp);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

export const sessionMaxAge = MAX_AGE_SECONDS;
