"use client";
import dynamic from "next/dynamic";
const RiskMap = dynamic(() => import("./RiskMap"), { ssr: false, loading: () => <div className="grid h-[420px] place-items-center rounded-card bg-river-light">Loading map…</div> });
export default RiskMap;
