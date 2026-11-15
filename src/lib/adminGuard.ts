import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionValue } from "./auth";

export async function isAdmin() {
  const c = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionValue(c, process.env.SESSION_SECRET);
}
