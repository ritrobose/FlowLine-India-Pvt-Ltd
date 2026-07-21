---
name: google_hosted_libraries_resolver
description: Scans HTML files for external CDN links (Google Hosted Libraries, WebFont Loaders) and maps them to optimized fallback scripts.
---

# Google Hosted Libraries Resolver Skill

This skill replaces third-party CDN scripts with local assets or safe asynchronous links.

## Instructions
1. Run `node scripts/resolver.js <html_file_path>` to check script dependencies.
