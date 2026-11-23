# QAOrbit — Automation Practice Lab

A lightweight browser-based practice playground for Playwright locator and interaction learning.\n

## Run locally

This is a static HTML/CSS/JavaScript site. No Python, Node, or database is required.


### Option A: IntelliJ
1. Open the `QAOrbit` folder in IntelliJ IDEA.
2. Open `index.html`.
3. If you have a Live Server plugin, use **Open with Live Server**.
4. Otherwise, open `index.html` directly in your browser. Most features work without a server.


### Option B: Python local server (optional)
From this folder, run:

```bash
python -m http.server 5500
```
Then open `http://localhost:5500`.

## Modules in this release
- Dashboard
- Input Fields
- Buttons
- Checkbox & Radio
- Locator Playground (CSS/XPath, dynamic IDs, parent/child and sibling practice)

Upcoming modules are shown in the sidebar as placeholders.


## Locator design notes
Dynamic IDs are generated at runtime for several practice elements. Use stable attribute fragments and DOM relationships rather than copying the full IDs. The application includes duplicate text buttons and repeated `Add to Cart` buttons to practise scoping locators.


## Deployment
The site is static and can be deployed using GitHub Pages, Cloudflare Pages, or Netlify. See the next project step for deployment walkthrough.
