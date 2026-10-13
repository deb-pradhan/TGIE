import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Great Indian Engineers",
    short_name: "TGIE",
    description: "Theory, embodied. Hardware, company, and market for research and startup ideas.",
    start_url: "/",
    display: "standalone",
    background_color: "#e7e8e5",
    theme_color: "#e7e8e5",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
