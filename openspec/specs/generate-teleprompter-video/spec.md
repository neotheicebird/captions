# generate-teleprompter-video Specification

## Purpose
TBD - created by archiving change add-cli-v1. Update Purpose after archive.
## Requirements
### Requirement: CLI Invocation
The system SHALL provide a `captions` CLI that supports flag-based invocation with `--input <path>` and `--output <path>`.

#### Scenario: Successful invocation
- **WHEN** the user runs `captions --input script.txt --output out.mp4` with valid files
- **THEN** an MP4 video is created at the output path and the command exits with status 0

#### Scenario: Missing required flags
- **WHEN** the user omits `--input` or `--output`
- **THEN** the command enters an interactive prompt mode to collect the missing values

### Requirement: Interactive Prompt Mode
The system SHALL provide an interactive prompt mode that collects input text and output path when flags are missing.

#### Scenario: Interactive collection
- **WHEN** the user runs `captions` with no flags
- **THEN** the CLI prompts for input text and output path and proceeds after valid entries are provided

### Requirement: Interactive Style Options
The system SHALL offer interactive style options for aspect ratio, background color, font, and font weight. Background color choices MUST include:
- Rose Gold: #B76E79
- Gray Green: #dadbca
- Geranium: #da3d58

#### Scenario: Background color selection
- **WHEN** the user selects a background color
- **THEN** the rendered video uses the chosen color from the specified palette

### Requirement: Local Configuration
The system SHALL read `config.json` from the current working directory and require `elevenlabsApiKey` and a `defaultVoiceId` string value. It SHOULD accept an optional `voices` list of labeled voice ids for interactive selection.

#### Scenario: Config present
- **WHEN** `config.json` includes both required keys
- **THEN** the command uses them to generate voiceover audio by default

#### Scenario: Config missing or invalid
- **WHEN** `config.json` is missing or lacks required keys
- **THEN** the command exits with a non-zero status and prints a clear error message

### Requirement: Interactive Voice Choice
The system SHALL offer an optional voice selection step in interactive prompt mode using the static `voices` list from `config.json`, defaulting to `defaultVoiceId` when no choice is made.

#### Scenario: Default voice used
- **WHEN** the user skips voice selection
- **THEN** the system uses `defaultVoiceId` from `config.json`

#### Scenario: Voice selected
- **WHEN** the user selects a voice during interactive prompts
- **THEN** the system uses the selected voice id for voiceover generation

### Requirement: Multiline Text Input
The system SHALL accept multiline pasted input text in interactive prompt mode, ending on EOF.

#### Scenario: Multiline paste
- **WHEN** the user pastes multiple lines and ends input with EOF
- **THEN** the system treats the combined text as the script input

### Requirement: Teleprompter Video with Synced Highlights
The system SHALL generate an ElevenLabs voiceover from the input text and render a teleprompter-style MP4 video with smooth scrolling full-text display. The active phrase (grouped by punctuation) SHALL be highlighted near the vertical center using an inverted color treatment (highlight background #222222 and highlight font color #DDDDDD), while surrounding text scrolls past like end credits. The initial frame SHOULD begin with text visible near the vertical center (no empty screen).

#### Scenario: Scrolling highlight
- **WHEN** the video is rendered
- **THEN** the full text scrolls upward smoothly while the active punctuation-delimited phrase is highlighted near the vertical center with inverted colors

### Requirement: Instagram-Ready Encoding
The system SHALL export an MP4 video using H.264 encoding suitable for Instagram.

#### Scenario: Export encoding
- **WHEN** the final video is written to disk
- **THEN** it is encoded with H.264 in an MP4 container

### Requirement: Base Font Color
The system SHALL render non-highlighted text in the base font color #222222.

#### Scenario: Non-highlighted text color
- **WHEN** the video is rendered
- **THEN** all non-highlighted text uses #222222

