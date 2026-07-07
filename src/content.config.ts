import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    posted: z.coerce.date(),
  }),
});

const scraps = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/scraps" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { articles, scraps };
