# Keyboard-only navigation pass

## Status

**Pending local interactive verification.**

This is intentionally not marked Pass because a live browser could not be controlled interactively in the audit environment.

## Test script

Target: `https://www.india.gov.in/`

- [ ] Start with mouse/trackpad untouched after page load.
- [ ] `Tab` reaches a useful first control or skip link.
- [ ] Focus indicator remains visible.
- [ ] Navigation links are reachable in a meaningful order.
- [ ] Search/input controls are reachable and labelled.
- [ ] Menus/buttons can be operated with Enter/Space as appropriate.
- [ ] No focus trap occurs.
- [ ] Focus order preserves meaning.
- [ ] Main content can be reached without tabbing through the entire page.
- [ ] Interactive elements remain usable at 200% zoom.
- [ ] Any modal/dialog can be opened and closed with keyboard only.

## Evidence to attach

Save screenshots under this directory with descriptive names, for example:

- `01-first-focus.png`
- `02-navigation-focus.png`
- `03-search-focus.png`
- `04-main-content.png`

Include the browser, viewport, date, and pass/fail result in the commit message or audit notes.
