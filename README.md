# Anup Kumar Sharma — Portfolio

Personal portfolio site for a backend developer (Java / Spring Boot), built as a
single-page React app with a terminal/systems-console visual theme.

**Live site:** _add your deployed URL here_

## Tech stack

- React 19 + Vite
- Tailwind CSS (utility classes + design tokens; most section layout is
  currently hand-written CSS-in-JS — see `src/index.css` for the shared
  responsive tokens)
- No backend — the contact form hands off to the visitor's email client via
  `mailto:`

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
npm run lint      # eslint
```

## Project structure

```
src/
  components/
    hero/ about/ skills/ projects/ education/ gallery/ contact/   → one section each
    ui/                                                            → shared layout primitives
                                                                       (StackLayout, PairedStack,
                                                                       DiagonalWipe, ScrollReveal,
                                                                       CustomCursor)
  context/ThemeContext.jsx     → single source of truth for dark/light theme
  hooks/                       → useScrollReveal, useCounter
  constants/assets.config.js   → background images / hero video / wipe timing —
                                  edit values here rather than in components
  pages/Home.jsx               → composes all sections in order
```

## Responsive system

Section spacing and max-width come from CSS custom properties defined once in
`src/index.css` (`--container-max`, `--container-pad`, `--section-pad-y`),
applied via the shared `.section-container` class rather than being
copy-pasted inline per section. Breakpoints are standardized at 768px
(tablet/mobile) and 480px (small phones).

## Known limitations

- The contact form opens the visitor's default email client (`mailto:`)
  rather than sending in-page. Swap `handleSubmit` in
  `src/components/contact/Contact.jsx` for EmailJS/Formspree/a serverless
  function if in-page delivery is needed.
- Background images in `public/backgrounds/` should be re-compressed/resized
  before adding new ones — see the performance notes in the project audit.
