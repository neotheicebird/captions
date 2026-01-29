# Change: Add HTML + GSAP renderer with headless capture

## Why
The current Python/ffmpeg drawtext approach limits typography and animation quality. A browser-based renderer will enable smoother scrolling, refined highlights, and GSAP animations while still exporting H.264 MP4 via ffmpeg.

## What Changes
- Add a HTML/CSS/GSAP rendering template for the scrolling teleprompter.
- Add a Node-based headless renderer (Chromium) to capture frames from the HTML page.
- Integrate the Python CLI to invoke the Node renderer and pass timing data.
- Keep ffmpeg as the final encoder for MP4 output.

## Impact
- Affected specs: generate-teleprompter-video
- Affected code: new HTML template, Node renderer, Python CLI integration, build pipeline
