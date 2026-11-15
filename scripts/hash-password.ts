import { scryptSync, randomBytes } from "crypto";
const pw = process.argv[2];
if (!pw || pw.length < 10) { console.error('Usage: npm run hash-password -- "a-long-password" (10+ chars)'); process.exit(1); }
const salt = randomBytes(16).toString("hex");
const hash = scryptSync(pw, salt, 32).toString("hex");
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
console.log(`SESSION_SECRET=${randomBytes(32).toString("hex")}`);
