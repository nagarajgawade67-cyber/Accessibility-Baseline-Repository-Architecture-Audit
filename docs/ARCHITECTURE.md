# Architecture

## Goal

Provide a small full-stack foundation that can grow into a public-service portal without mixing UI concerns, HTTP concerns, and domain logic.

## Components

### Client

React + Vite.

Responsibilities:
- Rendering pages and components
- Form interaction
- Keyboard and focus behavior
- Accessible names, landmarks and live regions
- Calling the API

Non-responsibilities:
- Database access
- Business secrets
- Authoritative service data

### Server

Node.js + Express.

Responsibilities:
- HTTP routing
- Input validation
- Domain/service lookup
- Stable JSON response contracts
- Security headers and future rate limiting

Non-responsibilities:
- UI rendering
- Browser focus management

### Data

The first slice uses an in-memory repository so the project is setup-ready without external infrastructure. A future persistence adapter can replace it behind the same domain boundary.

## API contract

`GET /api/health`

```json
{ "ok": true }
```

`GET /api/services?q=passport`

```json
{
  "items": [
    {
      "id": "passport",
      "name": "Passport services",
      "description": "Information and online services related to passports."
    }
  ]
}
```

## Accessibility architecture

The client uses native HTML first:
- `<header>`
- `<nav aria-label="Primary">`
- `<main id="main-content">`
- `<form>`
- `<label>`
- `<button>`
- `<a>`

ARIA is added only where native semantics cannot express the requirement, such as the result status live region.

This directly avoids the audit's ARIA parent/child relationship problem by keeping role structures simple and valid.

## First feature slice

`SearchForm` → `/api/services` → `ServiceResults`.

The slice is intentionally narrow. Once its contract and accessibility tests are stable, additional features can follow the same path.
