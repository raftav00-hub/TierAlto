# TierAlto — Claude Code Guide

## Project Overview
TierAlto is a modern static website built with vanilla HTML, CSS, and JavaScript. No frontend framework. SEO-first approach.

## Tech Stack
- **HTML5** — semantic markup, structured data (JSON-LD)
- **CSS3** — custom properties, BEM naming, responsive via media queries
- **JavaScript (ES Modules)** — vanilla JS, no bundler required for dev
- **Node.js** — dev tooling only (linting, minification, local server)

## Folder Structure
```
src/
  assets/       # Images, fonts, icons
  css/          # Stylesheets (main.css imports partials)
  js/           # JavaScript modules
  pages/        # Additional HTML pages beyond index.html
index.html      # Entry point / homepage
```

## Development
```bash
npm install       # Install dev dependencies
npm run dev       # Start local dev server (port 3000)
npm run build     # Minify CSS + JS to dist/
npm run lint      # Run ESLint + Stylelint
```

## Code Conventions
- **CSS**: BEM methodology (`block__element--modifier`). Variables in `css/base/_variables.css`.
- **JS**: ES Modules (`type="module"`). One responsibility per file.
- **HTML**: Every page must have `<title>`, `<meta name="description">`, canonical `<link>`, and Open Graph tags.
- **Images**: Use `<picture>` + WebP with JPEG/PNG fallback. Always include `alt` text. Use `loading="lazy"` for below-fold images.

## SEO Rules
- Every page has a unique `<title>` (50–60 chars) and `<meta name="description">` (120–158 chars).
- Use only one `<h1>` per page.
- Structured data (JSON-LD) goes in `<head>` or end of `<body>`.
- `sitemap.xml` and `robots.txt` live at project root.
- Core Web Vitals: avoid layout shift, lazy-load offscreen images, defer non-critical JS.

## File Naming
- Lowercase, hyphen-separated: `about-us.html`, `hero-section.css`.
- No spaces, no camelCase in filenames.

## DO NOT
- Do not import React, Vue, or any frontend framework.
- Do not commit `.env` files or API keys.
- Do not add `node_modules/` or `dist/` to git.
- Do not inline large `<style>` or `<script>` blocks in HTML.
