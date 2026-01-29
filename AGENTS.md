<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Project Guidelines

- This is an educational project, so add educational comments for any block of code that needs it, sometimes add intention behind a decision.
- We will commit entire feature together, so make sure the git commit messages when requested are detailed and bulleted with a summarized title.
- Take least resistance choices; we are not aiming for perfection, we want what works.
- We build walking skeleton software: build features that can be complete, ask for information if the spec feels incomplete and will break software.
- Add brief explanations in chat as and when you implement the solution.
