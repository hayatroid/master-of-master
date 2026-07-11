import puppeteer, { type BrowserWorker } from "@cloudflare/puppeteer";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  BROWSER: BrowserWorker;
}

declare global {
  interface CacheStorage {
    readonly default: Cache;
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: { waitUntil(promise: Promise<unknown>): void },
  ): Promise<Response> {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/og\/(.+)\.png$/);
    if (!match) {
      return env.ASSETS.fetch(request);
    }
    const cached = await caches.default.match(request);
    if (cached) {
      return cached;
    }
    const browser = await puppeteer.launch(env.BROWSER);
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(new URL(`/og/${match[1]}`, url.origin).href, {
      waitUntil: "networkidle0",
    });
    await page.evaluateHandle("document.fonts.ready");
    const png = await page.screenshot();
    await browser.close();
    const response = new Response(new Uint8Array(png), {
      headers: {
        "content-type": "image/png",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
    ctx.waitUntil(caches.default.put(request, response.clone()));
    return response;
  },
};
