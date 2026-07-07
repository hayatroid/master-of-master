import { getCollection } from "astro:content";

const WIKILINK_RE = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;

export function wikilinkTargets(body: string): string[] {
  return [...body.matchAll(WIKILINK_RE)].map((match) => match[1]!.trim());
}

export interface Graph {
  nodes: { id: string; title: string; href: string }[];
  links: { source: string; target: string }[];
}

export async function buildGraph(): Promise<Graph> {
  const scraps = await getCollection("scraps");
  const ids = new Set(scraps.map((entry) => entry.id));

  const nodes = scraps.map((entry) => ({
    id: entry.id,
    title: entry.data.title,
    href: `/scraps/${entry.id}/`,
  }));

  const links: { source: string; target: string }[] = [];
  const seen = new Set<string>();
  for (const entry of scraps) {
    for (const target of wikilinkTargets(entry.body ?? "")) {
      if (target === entry.id) {
        continue;
      }
      if (!ids.has(target)) {
        continue;
      }
      const key = [entry.id, target].toSorted().join("|");
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      links.push({ source: entry.id, target });
    }
  }

  return { nodes, links };
}

export function subgraph(graph: Graph, centerId: string): Graph {
  if (!graph.nodes.some((node) => node.id === centerId)) {
    throw new Error(`unknown scrap: ${centerId}`);
  }

  const ids = new Set([centerId]);
  for (const link of graph.links) {
    if (link.source === centerId) {
      ids.add(link.target);
    }
    if (link.target === centerId) {
      ids.add(link.source);
    }
  }

  return {
    nodes: graph.nodes.filter((node) => ids.has(node.id)),
    links: graph.links.filter(
      (link) => ids.has(link.source) && ids.has(link.target),
    ),
  };
}
