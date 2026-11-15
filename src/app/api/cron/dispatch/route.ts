import { NextResponse } from "next/server";
import { dispatchDueAlerts } from "@/lib/dispatch";

export const dynamic = "force-dynamic";

/** Called by Vercel Cron (see vercel.json). Vercel sends: Authorization: Bearer $CRON_SECRET */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await dispatchDueAlerts());
}
