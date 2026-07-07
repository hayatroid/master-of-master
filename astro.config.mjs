// @ts-check
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

import { SITE } from "./src/site.config";

import tailwindcss from "@tailwindcss/vite";

import { unified } from "@astrojs/markdown-remark";

import remarkAlert from "remark-github-blockquote-alert";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [solidJs()],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkAlert],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
        rehypeKatex,
      ],
    }),
    shikiConfig: { theme: "github-light" },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
