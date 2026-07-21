---
name: asset_pipeline
description: Intercepts, downloads, and processes external website assets (images, webfonts, SVGs) locally, rewriting asset paths.
---

# Asset Pipeline Skill

This skill downloads all referenced external media assets locally to support complete offline capability.

## Instructions
1. Run `node scripts/pipeline.js <html_file> <output_assets_dir>` to download assets and map their paths locally.
2. The pipeline handles fonts, images, and SVGs.
