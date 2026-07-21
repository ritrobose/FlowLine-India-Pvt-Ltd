---
name: webflow_dom_extractor
description: Extracts computed HTML structure and CSS variables from Webflow URLs while removing tracking scripts.
---

# Webflow DOM Extractor Skill

This skill extracts clean HTML layout and computed styles from Webflow target websites.

## Instructions
1. Run `node scripts/extractor.js <url> <dest_dir>` to crawl the URL.
2. The script processes the raw HTML to remove Webflow badges, tracking IDs, and custom attributes.
3. It cleans up inline styles and prepares the layout for clean local hosting.
