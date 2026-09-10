# eXeLearning architecture presentation

A Spanish-language, ten-slide presentation of eXeLearning's browser editor, online services and platform integrations. Built with React, TypeScript and Vite.

## Run locally

Use Node.js 22.12+ or 24 LTS and npm:

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

The build type-checks the project and generates `dist/`. Relative asset URLs preserve compatibility with GitHub Pages repository paths. Styling is bundled locally; the presentation does not load a CSS framework or JavaScript modules from a CDN.

## Navigation

- Previous/next buttons and slide indicators work with keyboard and touch.
- Arrow keys, Page Up/Page Down and Space move between slides.
- Home and End move to the first and last slide.
- Shortcuts do not intercept focused links, buttons or form controls.
- Long slides scroll on small screens and at enlarged text sizes.
- Motion respects the operating system's reduced-motion preference.

## Content and evidence

`content.ts` contains technology comparisons, plugin details and source links pinned to the reviewed commits. `App.tsx` contains the slide narrative and semantic diagrams. `index.css` defines the responsive presentation design.

See [SOURCES.md](SOURCES.md) for the review scope and architectural distinctions. These source snapshots describe development revisions, not a guarantee that every feature is available in a particular published release.

The application's React/Vite dependencies are presentation tooling, not the eXeLearning editor's frontend stack.
