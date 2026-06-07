import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Panda Cafe",
    short_name: "Panda Cafe",
    description: "Premium mobile-first animated café website.",
    start_url: "/",
    display: "standalone",
    background_color: "#120d0a",
    theme_color: "#120d0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
