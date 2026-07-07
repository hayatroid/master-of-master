import { onCleanup, onMount } from "solid-js";
import Icon from "./Icon";
import type { Graph as GraphData } from "@/lib/graph";

interface Props {
  graph: GraphData;
}

interface GraphNode {
  id: string;
  title: string;
  href: string;
  x?: number;
  y?: number;
  neighbors: GraphNode[];
  links: GraphLink[];
}

interface GraphLink {
  source: string;
  target: string;
}

const NODE_RADIUS = 5;
const DIM_OPACITY = 0.2;
const WARMUP_TICKS = 300;

const cssVar = (name: string) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

const resolveColor = (value: string) => {
  const probe = document.createElement("span");
  probe.style.color = value;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
};

const Graph = ({ graph }: Props) => {
  let canvas!: HTMLDivElement;
  let resetButton!: HTMLButtonElement;

  onMount(() => {
    let observer: ResizeObserver | undefined;
    let reset: (() => void) | undefined;

    void (async () => {
      const { default: ForceGraph } = await import("force-graph");

      const PRIMARY_COLOR = cssVar("--color-primary");
      const TEXT_COLOR = cssVar("--color-text");
      const BACKGROUND_COLOR = cssVar("--color-background");
      const FONT_FAMILY = cssVar("--font-sans");
      const LINK_COLOR = resolveColor(
        "color-mix(in srgb, var(--color-text) 20%, transparent)",
      );

      const nodes: GraphNode[] = graph.nodes.map((node) => ({
        ...node,
        neighbors: [],
        links: [],
      }));
      const links: GraphLink[] = graph.links.map((link) => ({ ...link }));
      const nodeById = new Map(nodes.map((node) => [node.id, node]));
      for (const link of links) {
        const source = nodeById.get(link.source)!;
        const target = nodeById.get(link.target)!;
        source.neighbors.push(target);
        target.neighbors.push(source);
        source.links.push(link);
        target.links.push(link);
      }

      let hoverNode: GraphNode | null = null;
      let highlightNodes = new Set<GraphNode>();
      let highlightLinks = new Set<GraphLink>();
      let hasFitInitialLayout = false;

      const fg = new ForceGraph<GraphNode, GraphLink>(canvas)
        .graphData({ nodes, links })
        .backgroundColor(BACKGROUND_COLOR)
        .autoPauseRedraw(false)
        .warmupTicks(WARMUP_TICKS)
        .cooldownTicks(0)
        .linkColor((link) =>
          highlightLinks.has(link) ? PRIMARY_COLOR : LINK_COLOR,
        )
        .linkWidth((link) => (highlightLinks.has(link) ? 1.5 : 1))
        .nodeCanvasObjectMode(() => "replace")
        .nodeCanvasObject((node, ctx, globalScale) => {
          const dimmed = highlightNodes.size > 0 && !highlightNodes.has(node);
          const r = NODE_RADIUS * (node === hoverNode ? 1.2 : 1);
          ctx.globalAlpha = dimmed ? DIM_OPACITY : 1;
          ctx.beginPath();
          ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
          ctx.fillStyle = PRIMARY_COLOR;
          ctx.fill();
          if (!dimmed && (globalScale > 0.6 || highlightNodes.has(node))) {
            ctx.font = `${12 / globalScale}px ${FONT_FAMILY}`;
            ctx.fillStyle = TEXT_COLOR;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(node.title, node.x ?? 0, (node.y ?? 0) + r + 3);
          }
          ctx.globalAlpha = 1;
        })
        .nodePointerAreaPaint((node, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x ?? 0, node.y ?? 0, NODE_RADIUS + 2, 0, 2 * Math.PI);
          ctx.fill();
        })
        .onNodeHover((node) => {
          hoverNode = node;
          highlightNodes = new Set();
          highlightLinks = new Set();
          if (node) {
            highlightNodes.add(node);
            for (const neighbor of node.neighbors) {
              highlightNodes.add(neighbor);
            }
            for (const link of node.links) {
              highlightLinks.add(link);
            }
          }
          canvas.style.cursor = node ? "pointer" : "default";
        })
        .onNodeClick((node) => {
          window.location.href = node.href;
        })
        .onEngineStop(() => {
          if (hasFitInitialLayout) {
            return;
          }
          hasFitInitialLayout = true;
          fg.cooldownTicks(Infinity);
          fg.zoomToFit(0, 30);
        });

      fg.d3Force("charge")?.strength(-250).distanceMax(180);
      fg.d3Force("link")?.distance(50);
      fg.d3Force("center")?.strength(0.3);

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        fg.width(rect.width).height(rect.height);
      };
      observer = new ResizeObserver(resize);
      observer.observe(canvas);
      resize();

      reset = () => fg.zoomToFit(400, 30);
      resetButton.addEventListener("click", reset);
    })();

    onCleanup(() => {
      observer?.disconnect();
      if (reset) {
        resetButton.removeEventListener("click", reset);
      }
    });
  });

  return (
    <div class="border-border relative h-75 w-full overflow-hidden rounded-2xl border">
      <button
        ref={resetButton}
        type="button"
        aria-label="Reset zoom"
        class="border-border bg-background text-text-muted hover:bg-hover absolute top-2 right-2 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border opacity-70 hover:opacity-100"
      >
        <Icon name="rotate-ccw" size={16} />
      </button>
      <div ref={canvas} class="h-full w-full" />
    </div>
  );
};

export default Graph;
