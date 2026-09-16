# 02: Design tokens and the kitchen sink

**What to build:** The project's first brand artifact. Nothing in the planning pack has ever
specified a colour, a typeface or a tone of voice, so this ticket decides them
once — and it is built for **data density**, because Sprint 003's rent roll
inherits this scale rather than re-deciding it, and Sprint 011 re-derives it per
organization for storefronts. A development-only page proves every token and
state exists and stays legible in both colour schemes.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] A single `@theme` block in the shared UI package holds the brand green, the ochre accent, warm neutrals, the fluid type scale, and the radius and motion tokens.
- [ ] Light-first. Dark is supported by redefining tokens under the colour-scheme preference, with **no manual toggle**.
- [ ] A development-only kitchen-sink page renders every token, type style and component state, including the five ochre contrast pairs with their **computed ratios printed on screen**.
- [ ] Ochre is never text on white and never carries white text. The primary call-to-action is an ochre fill with brand-900 ink at no less than 6.12:1.
- [ ] A search for hex codes anywhere outside the theme block returns nothing (acceptance row 10).
- [ ] Reduced-motion preference disables every transform and opacity animation and keeps state changes instant.
- [ ] The kitchen sink is excluded from the sitemap and is not built in production.
- [ ] The type and spacing scale is justified against **data density** in a note in the theme block, naming which steps a rent roll will use — not only which ones a hero needs.
