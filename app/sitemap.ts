import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
  ) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/start", 0.9),
    entry("/company", 0.7),
    entry("/work", 0.7),
    entry("/insights", 0.6),
    ...practices.flatMap((p) => [
      entry(`/services/${p.slug}`, 0.9),
      ...(practiceDetail[p.slug]?.subs ?? []).map((s) => entry(`/services/${p.slug}/${s.slug}`, 0.7)),
    ]),
  ];
}
