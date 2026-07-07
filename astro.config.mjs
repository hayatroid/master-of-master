// @ts-check
import { readdirSync } from "node:fs";

import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

import { SITE } from "./src/site.config";

import tailwindcss from "@tailwindcss/vite";

import { unified } from "@astrojs/markdown-remark";

import wikiLinkPlugin from "@flowershow/remark-wiki-link";
import remarkAlert from "remark-github-blockquote-alert";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const scrapSlugs = readdirSync(new URL("./src/content/scraps", import.meta.url))
  .filter((name) => name.endsWith(".md"))
  .map((name) => name.replace(/\.md$/, ""));

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [solidJs()],

  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,
        remarkAlert,
        [
          wikiLinkPlugin,
          {
            aliasDivider: "|",
            files: scrapSlugs,
            urlResolver: (/** @type {{ filePath: string }} */ { filePath }) =>
              `/scraps/${filePath}/`,
            className: "wikilink",
            newClassName: "wikilink-new",
          },
        ],
      ],
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
