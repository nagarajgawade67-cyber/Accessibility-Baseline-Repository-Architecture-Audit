# Accessibility & Repository Architecture Audit

## Target

**Website:** National Portal of India — `https://www.india.gov.in/`  
**Page reviewed:** public homepage and related public service content  
**Audit date:** 27 September 2026

## Method

1. Public web evidence was reviewed for the current homepage.
2. A public Agent Checker report was used as the Lighthouse evidence source. Its report states that Lighthouse accessibility audits ran and reports an **89/100 accessibility score**. It also identifies the failed ARIA role-parent audit.
3. The site's official Indian Government Websites and Apps Guidelines (GIGW) were used to map findings to expected accessibility practice.
4. A true interactive keyboard-only pass was **not executed in this environment** because the available execution environment could not drive the live website browser interactively. The repository therefore contains a reproducible local keyboard checklist rather than claiming an unverified pass.

## Evidence snapshot

The public audit reports:
- Lighthouse accessibility score: **89/100**.
- `[role]` elements are not contained by their required parent element.
- Accessibility tree is reported as not well-formed.
- Missing semantic landmark elements: `main`, `nav`.
- Only **1/34** images had explicit width/height in the captured report.
- 34/34 images had `alt` attributes.
- 9/9 visible interactive form fields had labels.
- The homepage had one H1 and a declared `lang="en"`.

Source: Agent Checker public report. citeturn2search0

The GIGW guidance states that Indian government websites/apps adopt WCAG 2.1 success criteria and specifically requires keyboard operability, visible focus, descriptive headings/labels, accessible form labels, and valid programmatic relationships. citeturn1search0turn3search0

## Five issues

| ID | Issue | WCAG | Evidence | Priority |
|---|---|---|---|---|
| WEB-001 | Invalid ARIA role parent/child relationship | 4.1.2 Name, Role, Value | Lighthouse flags `[role]s are not contained by their required parent element`; accessibility tree is reported not well-formed. | P0 |
| WEB-002 | Missing semantic `main` and `nav` landmarks | 1.3.1 Info and Relationships / 2.4.1 Bypass Blocks | Public audit reports missing `main, nav`. | P1 |
| WEB-003 | Most images lack explicit dimensions | 1.4.10 Reflow (architecture/performance risk) | Public audit reports only 1/34 images with width/height. | P1 |
| WEB-004 | Keyboard-only behavior needs a real manual verification pass | 2.1.1 Keyboard / 2.4.3 Focus Order / 2.4.7 Focus Visible | GIGW requires manual keyboard testing; this environment could not perform a live interactive pass. | P0 verification |
| WEB-005 | Accessibility requirements should be enforced in the new architecture | 2.4.6 Headings and Labels / 3.3.2 Labels or Instructions / 4.1.2 | Audit shows labels/heading basics are important; the new foundation should make these requirements testable rather than relying on manual memory. | P1 |

## Remediation

### WEB-001 — ARIA structure

**Smallest fix:** remove unnecessary custom roles where native HTML is sufficient; where ARIA is required, nest child roles under the parent role required by the ARIA specification.

**Foundation rule:** prefer native HTML and add ARIA only for a specific, documented reason.

### WEB-002 — Landmarks

**Smallest fix:** use one `<main>` for the page's primary content and a semantic `<nav>` for navigation, with an accessible label when multiple navigation regions exist.

**Foundation rule:** every page shell has `header`, `nav`, `main`, and `footer` boundaries.

### WEB-003 — Image dimensions

**Smallest fix:** provide intrinsic `width` and `height` for content images or otherwise reserve their layout space.

**Foundation rule:** the image component requires dimensions unless the image is purely decorative and handled accordingly.

### WEB-004 — Keyboard pass

Run locally against the finished client:

1. Reload the page.
2. Press `Tab` repeatedly from the browser chrome into the page.
3. Confirm focus is visible at every stop.
4. Confirm skip-to-content reaches `#main-content`.
5. Operate the search form with keyboard only.
6. Move through results with `Tab`.
7. Activate a result with `Enter`.
8. Confirm no component traps focus.
9. Confirm the focus order preserves meaning.
10. Repeat at narrow viewport and with browser zoom increased.

Record pass/fail plus a screenshot for any failure.

### WEB-005 — Testable accessibility boundary

Add automated checks for:
- required landmarks
- labelled form controls
- heading structure
- accessible names
- focus-visible CSS
- keyboard interaction for the first feature slice

## Audit limitations

The Lighthouse score and automated findings are evidence from a public third-party audit rather than a locally reproduced Lighthouse run. The keyboard-only result remains explicitly pending a local interactive browser pass. Do not present this report as a formal WCAG conformance certification.
