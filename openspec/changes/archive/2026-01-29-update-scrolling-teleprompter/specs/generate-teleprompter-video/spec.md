## MODIFIED Requirements
### Requirement: Interactive Style Options
The system SHALL offer interactive style options for aspect ratio, background color, font, and font weight. Background color choices MUST include:
- Rose Gold: #B76E79
- Gray Green: #dadbca
- Geranium: #da3d58

#### Scenario: Background color selection
- **WHEN** the user selects a background color
- **THEN** the rendered video uses the chosen color from the specified palette

### Requirement: Teleprompter Video with Synced Highlights
The system SHALL generate an ElevenLabs voiceover from the input text and render a teleprompter-style MP4 video with smooth scrolling full-text display. The active phrase (grouped by punctuation) SHALL be highlighted near the vertical center using an inverted color treatment (highlight background #222222 and highlight font color #DDDDDD), while surrounding text scrolls past like end credits. The initial frame SHOULD begin with text visible near the vertical center (no empty screen).

#### Scenario: Scrolling highlight
- **WHEN** the video is rendered
- **THEN** the full text scrolls upward smoothly while the active punctuation-delimited phrase is highlighted near the vertical center with inverted colors

## ADDED Requirements
### Requirement: Base Font Color
The system SHALL render non-highlighted text in the base font color #222222.

#### Scenario: Non-highlighted text color
- **WHEN** the video is rendered
- **THEN** all non-highlighted text uses #222222
