# Anup Kumar Sharma — Portfolio

A security-first backend engineering portfolio built as a race-engineer telemetry console crossed with a keyboard-driven IDE. Dark by default, with a light theme, command palette, section jumps, and an evidence viewer for the FinGateway architecture, STRIDE model, k6 run, and ADRs.

## Stack

- React 19 + Vite (JSX, no UI framework)
- Plain CSS design-token system in `src/race/tokens.css` and `src/race/components.css`
- Syne / Inter / JetBrains Mono via Google Fonts
- Static assets in `public/race/`

## Run

```bash
npm install
npm run dev
npm run check   # eslint + production build
npm run preview
```

## Structure

```text
src/
  race/
    App.jsx              app shell, navigation, keyboard layer, status bar
    data.js              all content, metrics, projects, artifacts
    Hero.jsx             telemetry hero
    Projects.jsx         expandable case studies
    Artifacts.jsx        architecture / STRIDE / k6 / ADR viewer
    ...
    tokens.css           themes and design tokens
    components.css       layout and component styles
index.html               metadata, fonts, theme bootstrap, JSON-LD
design/                  design source of truth
```

The earlier scaffold under `src/App.jsx`, `src/components/`, and `src/constants/` is not imported by the active entry point and is retained only as history.

## Keyboard

| Keys | Action |
| --- | --- |
| `Ctrl` / `Cmd` + `K` | Open or close the command palette |
| `G` then `S` `P` `T` `G` `A` `L` `C` `U` | Jump to system, profile, stack, gateways, artifacts, log, certs, or uplink |
| `/` | Open the command palette |
| `T` | Toggle dark / light theme |
| `?` | Show the shortcut sheet |
| `Esc` | Close the active overlay or cancel a pending jump |

Theme choice persists in `localStorage` under `aks-theme`. The palette and overlays trap focus, restore it on close, and respect `prefers-reduced-motion`.

## Evidence

The artifacts section renders the engineering record: a 7-stage gateway pipeline, an 8-threat STRIDE table, the 60-second k6 run (50 VUs, 104.9 RPS, 6,296 requests, p99 47.6 ms, 0.00% errors), and four ADRs.

The threat table is deliberately not "8/8 mitigated": 4 threats are mitigated, 3 are partial, and 1 is accepted with named residual risk. The k6 run is a local Docker Compose latency check at 50 VUs — it records absolute p99, not gateway overhead, because no direct-to-backend baseline was captured. Host CPU/RAM was not recorded. The 100% detection figure covers the four scripted payload classes only; regex detection is documented as bypassable in each project's Known Limits.

Repository links point at the public FinGateway, Secure File Transfer Gateway, and EmotionEcho projects. The full k6 report is available on request; no broken report link is shipped.

## Deploy

The build is a static Vite bundle in `dist/`. Security headers are defined for two common hosts:

- Netlify / Cloudflare Pages: `public/_headers`
- Vercel: `vercel.json`

Both enforce a same-origin CSP, HSTS, frame denial, and immutable caching for hashed assets. The theme bootstrap is `public/theme-init.js` (not inline) so the CSP does not need an inline-script exception.

## Content rules

- No proficiency bars; levels are defined by what shipped.
- No invented production claims, uptime figures, or unsupported infrastructure.
- "K6 EVIDENCE" replaces any live-telemetry claim; the numbers are from a dated run.
- Known limitations are shown next to each project.
- The contact form composes a `mailto:` draft and never submits silently.
