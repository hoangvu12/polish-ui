// Measures where each SVG icon's visual weight sits, compared with the centre
// of its box, and prints the nudge that centres it optically.
//
//   PW_DIR=<dir with playwright> node icon-centre.mjs <file.svg|dir>... [--size 20] [--json]
//
// The weight is the centroid of the icon's ink: it renders each icon in
// headless Chromium and averages the position of every painted pixel, weighted
// by its opacity. Strokes, fills and caps all count, as they do for the eye.
// The nudge is in CSS px at --size (the icon's rendered size, default 24),
// rounded to 0.25 px, and moves the weight onto the box centre. Apply it once
// per icon (icon component, or a CSS translate keyed by icon name), never per
// button.
//
// Optional environment:
//   CHROMIUM_PATH  use an existing Chromium build instead of Playwright's
import { createRequire } from "node:module";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, basename } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  const [, v] = args.splice(i, 2);
  return v;
};
const json = args.includes("--json") && args.splice(args.indexOf("--json"), 1);
const size = +flag("--size", "24");
if (!args.length) {
  console.error("usage: node icon-centre.mjs <file.svg|dir>... [--size 24] [--json]");
  process.exit(1);
}

const files = args.flatMap((p) =>
  statSync(p).isDirectory()
    ? readdirSync(p).filter((f) => f.endsWith(".svg")).map((f) => join(p, f))
    : [p],
);
const icons = files.map((f) => ({
  name: basename(f, ".svg"),
  svg: readFileSync(f, "utf8").replace(/currentColor/g, "#000"),
}));

const require = createRequire(join(resolve(process.env.PW_DIR || process.cwd()), "noop.js"));
const { chromium } = require("playwright");
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();

const results = await page.evaluate(async (icons) => {
  const RES = 512;
  const out = [];
  for (const { name, svg } of icons) {
    const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
    const root = doc.documentElement;
    if (root.nodeName !== "svg") {
      out.push({ name, error: "not an svg" });
      continue;
    }
    const vb = (root.getAttribute("viewBox") || `0 0 ${root.getAttribute("width") || 24} ${root.getAttribute("height") || 24}`)
      .split(/[\s,]+/)
      .map(Number);
    const [vx, vy, vw, vh] = vb;
    const scale = RES / Math.max(vw, vh);
    const W = Math.round(vw * scale);
    const H = Math.round(vh * scale);
    root.setAttribute("width", W);
    root.setAttribute("height", H);
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(root))}`;
    const img = new Image();
    img.src = url;
    try {
      await img.decode();
    } catch {
      out.push({ name, error: "could not render" });
      continue;
    }
    const canvas = new OffscreenCanvas(W, H);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, W, H);
    const { data } = ctx.getImageData(0, 0, W, H);
    let sum = 0, sx = 0, sy = 0;
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const a = data[(y * W + x) * 4 + 3];
        if (!a) continue;
        sum += a;
        sx += a * (x + 0.5);
        sy += a * (y + 0.5);
      }
    if (!sum) {
      out.push({ name, error: "no ink" });
      continue;
    }
    out.push({
      name,
      viewBox: vb,
      weight: [vx + sx / sum / scale, vy + sy / sum / scale],
      centre: [vx + vw / 2, vy + vh / 2],
    });
  }
  return out;
}, icons);
await browser.close();

const q = (v) => Math.round(v * 4) / 4 + 0; // + 0 turns -0 into 0
for (const r of results) {
  if (r.error) continue;
  const px = size / Math.max(r.viewBox[2], r.viewBox[3]);
  r.off = [r.weight[0] - r.centre[0], r.weight[1] - r.centre[1]];
  r.nudge = [q(-r.off[0] * px), q(-r.off[1] * px)];
}

if (json) {
  console.log(JSON.stringify(results, null, 1));
} else {
  const f = (v) => v.toFixed(2);
  const s = (v) => (v > 0 ? `+${v.toFixed(2)}` : v.toFixed(2));
  for (const r of results) {
    if (r.error) {
      console.log(`${r.name}: ${r.error}`);
      continue;
    }
    const dx = r.off[0], dy = r.off[1];
    const where = [
      Math.abs(dx) >= 0.005 ? `${f(Math.abs(dx))} ${dx < 0 ? "left" : "right"}` : "",
      Math.abs(dy) >= 0.005 ? `${f(Math.abs(dy))} ${dy < 0 ? "high" : "low"}` : "",
    ].filter(Boolean).join(", ") || "centred";
    console.log(
      `${r.name}  weight ${f(r.weight[0])}, ${f(r.weight[1])}  box centre ${f(r.centre[0])}, ${f(r.centre[1])}  off ${where}  nudge at ${size}px: x ${s(r.nudge[0])} y ${s(r.nudge[1])}`,
    );
  }
}
