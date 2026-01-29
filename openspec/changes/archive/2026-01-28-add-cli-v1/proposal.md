# Change: Add v1 CLI to generate teleprompter videos

## Why
We need a minimal, working command-line interface that turns a script into a teleprompter-style video with synced ElevenLabs voiceover.

## What Changes
- Add a v1 CLI command (`captions`) that can run in flag mode or interactive prompt mode.
- Read ElevenLabs credentials from a local secure `config.json` file with a default voice id.
- Offer an optional interactive voice selection using a static list from `config.json`.
- Add interactive style/export options (aspect ratio, background color, font, font weight).
- Highlight words in sync with the generated audio.

## Impact
- Affected specs: generate-teleprompter-video
- Affected code: new CLI entrypoint and video/voiceover pipeline
