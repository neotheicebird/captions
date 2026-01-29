## MODIFIED Requirements
### Requirement: Teleprompter Video with Synced Highlights
The system SHALL generate an ElevenLabs voiceover from the input text and render a teleprompter-style MP4 video with smooth scrolling full-text display. The active phrase (grouped by punctuation) SHALL be highlighted near the vertical center using an inverted color treatment (highlight background #222222 and highlight font color #DDDDDD), while surrounding text scrolls past like end credits. The initial frame SHOULD begin with text visible near the vertical center (no empty screen). Rendering SHALL be produced by an HTML/GSAP template captured via a headless Chromium renderer.

#### Scenario: GSAP render pipeline
- **WHEN** the video is rendered
- **THEN** the scrolling and highlight animation is driven by GSAP in an HTML template and captured via headless Chromium

## ADDED Requirements
### Requirement: Headless HTML Renderer
The system SHALL provide a headless HTML rendering pipeline (Chromium) that captures frames from the teleprompter template and supplies them to ffmpeg for MP4 export.

#### Scenario: Frame capture
- **WHEN** the renderer runs
- **THEN** it captures sequential frames from the HTML animation for encoding
