import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Workhorse",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f5efe4",
    theme_color: "#1e2328",
    icons: [
      { src: "/brand/mark-orange-on-dark-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/mark-orange-on-dark-1080.png", sizes: "1080x1080", type: "image/png" },
    ],
  };
}
