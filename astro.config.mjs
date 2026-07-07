// @ts-check
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

import { SITE } from "./src/site.config";

import tailwindcss from "@tailwindcss/vite";

import { unified } from "@astrojs/markdown-remark";

import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [solidJs()],

  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    }),
    shikiConfig: { theme: "github-light" },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
