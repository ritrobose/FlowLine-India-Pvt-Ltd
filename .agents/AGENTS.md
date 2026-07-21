# Workspace Customizations

This workspace is equipped with the following custom cloning modules:

## 1. webflow_dom_extractor
- **Purpose**: Cleans Webflow HTML tags and strips proprietary analytics/tracking scripts.
- **Execution**: Run `node .agents/skills/webflow_dom_extractor/scripts/extractor.js <url> <dest_file>` to extract clean page layouts.

## 2. asset_pipeline
- **Purpose**: Automates asset fetching and path translation for offline capability.
- **Execution**: Run `node .agents/skills/asset_pipeline/scripts/pipeline.js <html_file> <asset_dir>` to download assets.

## 3. tailwind_compiler
- **Purpose**: Parses native Webflow CSS rules and outputs corresponding Tailwind styling classes.
- **Execution**: Run `node .agents/skills/tailwind_compiler/scripts/compiler.js <css_file>` to check translation mappings.

## 4. animation_transcriber
- **Purpose**: Translates Webflow interactive attributes into custom GSAP javascript code blocks.
- **Execution**: Run `node .agents/skills/animation_transcriber/scripts/transcriber.js <html_file>` to produce animation timelines.

## 5. animation_ux_orchestrator
- **Purpose**: Optimizes jQuery animations and native CSS transitions into hardware-accelerated GSAP timelines.
- **Execution**: Run `node .agents/skills/animation_ux_orchestrator/scripts/orchestrator.js <html_file>` to scan animations.

## 6. google_hosted_libraries_resolver
- **Purpose**: Detects CDN script dependencies (like jQuery and WebFont loaders) and maps them locally.
- **Execution**: Run `node .agents/skills/google_hosted_libraries_resolver/scripts/resolver.js <html_file>` to verify CDNs.

## 7. webfont_loader_manager
- **Purpose**: Optimizes font rendering by injecting font-display swaps to prevent FOUT layout shifts.
- **Execution**: Run `node .agents/skills/webfont_loader_manager/scripts/manager.js <css_file>` to apply display options.

## 8. semantic_html5_srcset_compiler
- **Purpose**: Enforces HTML5 guidelines and generates responsive srcset mappings for images.
- **Execution**: Run `node .agents/skills/semantic_html5_srcset_compiler/scripts/compiler.js <html_file>` to check responsive source files.
