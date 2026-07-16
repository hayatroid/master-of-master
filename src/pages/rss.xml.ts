import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@/site.config";

export const GET = async (context: APIContext) => {
  const articles = await getCollection("articles");
  return rss({
    title: SITE.title,
    description: SITE.bio,
    site: context.site!,
    items: articles
      .toSorted((a, b) => b.data.posted.valueOf() - a.data.posted.valueOf())
      .map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.posted,
        link: `/articles/${entry.id}/`,
      })),
  });
};
