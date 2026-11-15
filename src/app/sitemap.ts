import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/problem", "/how-it-works", "/demo", "/impact", "/voices", "/about", "/contact", "/brand", "/privacy"].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
