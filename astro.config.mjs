// @ts-check
import { readdirSync } from "node:fs";

import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

import { SITE } from "./src/site.config";

import tailwindcss from "@tailwindcss/vite";

import { unified } from "@astrojs/markdown-remark";

import wikiLinkPlugin from "@flowershow/remark-wiki-link";
import remarkAlert from "remark-github-blockquote-alert";
import remarkDirective from "remark-directive";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const scrapSlugs = readdirSync(new URL("./src/content/scraps", import.meta.url))
  .filter((name) => name.endsWith(".md"))
  .map((name) => name.replace(/\.md$/, ""));

const remarkYouTube = () => (/** @type {import("mdast").Root} */ tree) => {
  visit(tree, "leafDirective", (node) => {
    if (node.name !== "youtube") {
      return;
    }
    const id = /** @type {import("mdast").Text} */ (node.children[0]).value;
    node.data = {
      hName: "iframe",
      hProperties: {
        src: `https://www.youtube.com/embed/${id}`,
        title: "YouTube video player",
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowfullscreen: true,
        loading: "lazy",
      },
    };
    node.children = [];
  });
};

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [solidJs()],

  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,
        remarkAlert,
        remarkDirective,
        remarkYouTube,
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
