Captions is a text to teleprompter style video generator along with elevenlabs api based voiceover which is in sync with the text highlights.

v1

- Ask for input text in this cmd util
- Use eleven labs api. API_KEY is loaded from a local secure file
- Show export options either 4:5 or 1:1 (instagram ready)
- Video style: 
  - Show options for video aspect ratio
  - Background Color options: Rose Gold, Gray Green, Geranium
  - Font options: San Francisco (SF Pro), Helvetica Neue, Avenir
  - Font weight: Light, Medium, Bold
  - Voice options: Show few from eleven labs
  - Any other render options, only if needed
  - Export as H.264 MP4 for instagram

Renderer notes
- The video renderer uses a headless Chromium page (HTML + GSAP) to animate scrolling text.
- Install Node dependencies with `npm install` before running the CLI.
- ffmpeg is required for encoding and muxing.
