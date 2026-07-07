// @ts-check
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

import { SITE } from "./src/site.config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [solidJs()],

  vite: {
    plugins: [tailwindcss()],
  },
});
