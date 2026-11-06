# EIAS Lab Website
Static site for the Environmental Intelligence & Autonomous Systems Lab (EIAS Lab), ICRI-STE. No build step.

## Publish on GitHub Pages
1. Create a repository (e.g. `eias-lab.github.io` or any name).
2. Upload the *contents* of this folder to the repository root.
3. Settings > Pages > Deploy from branch > `main` / root. The site appears at `https://<user>.github.io/<repo>/`.

## Before you publish
- Add your logo as `assets/ICRI-STE-Logo.png` (footer hides it until the file exists).
- Replace `eias-lab@example.org` in `collaboration.html` (`data-to` attribute) with your real address.
- Update the ICRI-STE link in the footer (`js/main.js`).

## Edit content
- Research domains, objectives, architecture layers, roadmap, work packages, risks and metrics: `data/eias-research-data.json`.
- Navigation and footer: `js/main.js`. Colours and type: top of `css/styles.css`.
- Figures: SVGs in `assets/`, editable in any text or vector editor.

## Preview locally
`python -m http.server 8000` then open http://localhost:8000 (the JSON loads over http only).
