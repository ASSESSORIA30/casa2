import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getHouses } from "@/lib/houses";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/modelos", "/todo-incluido", "/como-funciona", "/tecnologia", "/equipamiento", "/empresa", "/contacto"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...getHouses().map((h) => ({ url: `${site.url}/modelos/${h.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
