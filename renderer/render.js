#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");
const puppeteer = require("puppeteer");

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i += 1) {
    const key = args[i];
    if (!key.startsWith("--")) continue;
    out[key.slice(2)] = args[i + 1];
    i += 1;
  }
  return out;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: "inherit", ...options });
  if (result.status !== 0) {
    throw new Error(`${command} failed`);
  }
}

(async () => {
  const args = parseArgs();
  if (!args.input || !args.output) {
    console.error("Usage: render.js --input data.json --output video.mp4 --width 1080 --height 1350 --fps 30");
    process.exit(1);
  }

  const dataPath = path.resolve(args.input);
  const outputPath = path.resolve(args.output);
  const width = Number(args.width || 1080);
  const height = Number(args.height || 1350);
  const fps = Number(args.fps || 30);

  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const template = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");

  const html = template.replace("__DATA__", JSON.stringify(data));
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "captions-render-"));
  const htmlPath = path.join(tempDir, "index.html");
  fs.writeFileSync(htmlPath, html, "utf8");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(`file://${htmlPath}`, { waitUntil: "load" });

    // The page exposes the total animation duration so we can sample frames deterministically.
    const duration = await page.evaluate(() => window.__duration || 1);
    const frameCount = Math.ceil(duration * fps);

    const framesDir = path.join(tempDir, "frames");
    fs.mkdirSync(framesDir);

    // We step the animation timeline and capture a screenshot per frame for ffmpeg.
    for (let i = 0; i < frameCount; i += 1) {
      const time = i / fps;
      await page.evaluate((t) => window.__seek(t), time);
      const framePath = path.join(framesDir, `frame_${String(i).padStart(5, "0")}.png`);
      await page.screenshot({ path: framePath });
    }

    run("ffmpeg", [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      path.join(framesDir, "frame_%05d.png"),
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      outputPath,
    ]);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
