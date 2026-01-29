#!/usr/bin/env bash
set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Please install ffmpeg first."
  exit 1
fi

if ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffprobe not found. Please install ffmpeg (includes ffprobe)."
  exit 1
fi

if [ ! -f config.json ]; then
  echo "config.json not found in the current directory."
  echo "Create config.json with elevenlabsApiKey and defaultVoiceId first."
  exit 1
fi

cat << 'EOF' > /tmp/captions-smoke.txt
This is a longer smoke test to preview scrolling captions with multiple paragraphs.
We want steady pacing, readable text, and a clean highlight near the center.
The highlight should move phrase by phrase, not word by word.

Paragraph two starts here. It should feel like end credits: calm, steady, and smooth.
Try a few sentences with commas, semicolons; and pauses to test phrase grouping.
If anything feels rushed, we can slow the scroll or shrink the text further.

Final paragraph: keep it simple and readable. The goal is a pleasant, cinematic flow.
EOF

CAPTIONS_SKIP_TTS=1 ./captions --input /tmp/captions-smoke.txt --output /tmp/captions-smoke.mp4

echo "Smoke test output: /tmp/captions-smoke.mp4"
echo "Expected: smooth scrolling text with phrase highlights near center."
