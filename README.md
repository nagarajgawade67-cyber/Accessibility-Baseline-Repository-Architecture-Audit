# Accessible Public Service Foundation

A monorepo-style full-stack foundation created from an accessibility and architecture audit of the National Portal of India (`india.gov.in`).

## Why this project exists

The audit identified accessibility/architecture concerns worth addressing in a new implementation:

- Lighthouse accessibility score reported as **89/100** by the public Agent Checker report.
- Lighthouse flagged an ARIA role-parent relationship failure.
- The homepage was reported as missing semantic `main` and `nav` landmarks.
- Only 1 of 34 images had explicit `width`/`height` in the latest captured report.
- The audit also reports strong baseline practices: 34/34 images had `alt`, 9/9 visible form fields had labels, one H1, valid `lang="en"`, and server-rendered content.

This repository does **not** reproduce the original site's implementation. It uses the findings as design constraints for an accessible, maintainable foundation.

## Repository boundaries

```text
accessible-public-service-foundation/
├── client/                 # Browser UI only
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   └── package.json
├── server/                 # HTTP API and domain boundary
│   ├── src/
│   │   └── index.js
│   └── package.json
├── docs/
│   ├── AUDIT.md
│   ├── ARCHITECTURE.md
│   └── audit/
│       ├── accessibility-audit.csv
│       └── screenshots/
├── test/
│   ├── audit-check.mjs
│   └── e2e/
└── package.json
```

### Boundary rules

1. **Client** owns presentation, interaction, focus management, and accessibility semantics.
2. **Server** owns HTTP transport, validation, and domain/service data access.
3. **Docs** contains audit evidence and architectural decisions; it is not runtime code.
4. **Tests** verify contracts and accessibility-sensitive behavior.
5. Shared types should be introduced only when a real cross-boundary contract appears; avoid premature coupling.

## Local setup

Requirements: Node.js 20+.

```bash
npm install
npm run dev:server
npm run dev:client
```

Client: `http://localhost:5173`  
API: `http://localhost:3001`

The client uses Vite and React. The server uses Express.

## First vertical feature slice: Service Search

The first slice is deliberately small but end-to-end:

1. User focuses the search field with the keyboard.
2. User enters a service query.
3. Client requests `GET /api/services?q=...`.
4. Server validates the query and returns matching public-service records.
5. Client renders results as semantic links.
6. Result state is exposed through an `aria-live` status region.
7. All controls have visible focus styles and accessible names.

This gives the team one complete path through UI → API → domain data → UI feedback before adding authentication, persistence, or larger modules.

## Accessibility acceptance criteria

- All interactive functionality works without a mouse.
- Focus order follows the visual/meaningful reading order.
- Focus is always visible.
- No keyboard trap.
- Semantic `header`, `nav`, `main`, and `footer` landmarks are present.
- Form controls have explicit labels.
- Images have appropriate `alt`; decorative images use empty `alt`.
- Dynamic result counts/statuses use an appropriate live region.
- No information is conveyed by color alone.
- Responsive layout works at narrow widths without avoidable two-dimensional scrolling.

See `docs/AUDIT.md` for the audit and remediation priorities.
