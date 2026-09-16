# 03: Marketing shell, content types and the boundary rule

**What to build:** The frame every marketing page hangs in, plus the three mechanical guards that
make the rest of the track cheap to review. After this ticket a visitor can
navigate a skeleton site with a phone or a keyboard, and the copy rules are
enforced by tooling rather than by someone reading a diff.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] An isolated public route group with its own layout that imports nothing authenticated.
- [ ] Header with an accessible mega menu, a mobile drawer, a footer and a skip link. Every menu, dialog, tab and accordion uses accessible primitives — nothing hand-rolled.
- [ ] Renders correctly at 390, 768 and 1440. Touch targets are at least 44 by 44. Visible focus ring, never removed.
- [ ] Language wiring in place with `en-KE` active and `sw-KE` reserved, so translation is later a content task and not a rebuild.
- [ ] A route manifest is the single source for navigation, and later for the sitemap and robots files.
- [ ] Content-module types exist, including a capability type that **does not compile** unless it names both its implementing service and its availability:

      ```ts
      type Capability = {
        label: string
        service: ServiceName   // union of the twelve services
        availability: 'available' | 'sprint' | 'may-not-ship'
      }
      ```

      (Shape carried over from the spec's implementation decisions; `ServiceName` is the twelve logical services of D-67.)
- [ ] The no-invented-proof test runs over the content modules and fails on a price pattern, a testimonial or logo key, or the word "tenant" (acceptance rows 6 and 9). It is written before any copy exists, so it guards from the first line.
- [ ] A lint rule rejects string literals longer than 30 characters inside section components, so copy cannot migrate out of the content modules (acceptance row 12).
- [ ] **An ESLint import zone fails the build** if anything in the marketing group imports from an authenticated route group or from a service package. This is what enforces the boundary today, because the graph path query has no endpoints to match until those groups exist.
- [ ] The graph path check stays in `acceptance.md` as a second check for when Sprint 002 gives it real endpoints — both guards, not one.
