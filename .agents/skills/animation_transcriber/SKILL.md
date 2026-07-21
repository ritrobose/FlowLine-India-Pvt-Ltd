---
name: animation_transcriber
description: Translates Webflow interactive JSON configurations and animation variables into clean, custom GSAP or Framer Motion blocks.
---

# Animation Transcriber Skill

This skill parses custom dynamic properties on elements and writes clean custom javascript timelines.

## Instructions
1. Run `node scripts/transcriber.js <html_file_path>` to analyze and transcribe triggers.
2. The compiler maps standard hover and scrolling actions to GSAP code.
