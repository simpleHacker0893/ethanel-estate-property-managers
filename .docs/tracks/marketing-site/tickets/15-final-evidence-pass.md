# 15: Final evidence pass and acceptance sign-off

**What to build:** The track is done when acceptance passes, not when the code compiles. This
ticket produces the evidence for all twelve rows — each one a command someone
else can rerun, test output, or a screenshot path. "The ticket is closed" is
not evidence.

**Blocked by:** 08, 09, 14

**Status:** ready-for-agent

- [ ] The link crawl walks the navigation and footer manifests and finds **zero 404s** (acceptance row 1).
- [ ] Budgets pass on the throttled mobile profile, with the **actual numbers recorded** rather than a bare pass (acceptance row 2).
- [ ] Zero serious or critical accessibility violations on all four scanned routes (acceptance row 3).
- [ ] Dark-mode full-page screenshots at 390 and 1440 captured and reviewed by the operator (acceptance row 11).
- [ ] All twelve acceptance rows carry rerunnable evidence.
- [ ] Every gate that existed before this track still passes — strict TypeScript with no `any` in a public interface, the image vulnerability scan, and the pod-security chart still rendering.
- [ ] The graph is updated, and the boundary question is answered: **no path from the marketing group to an authenticated surface or a service package.** Note honestly that the query only becomes meaningful once those groups exist — the ESLint import zone from ticket 03 is what enforces the boundary today.
- [ ] Readiness rows E16 (accessibility audit) and E21 (performance budgets in CI) recorded as **narrowed to marketing routes**, with the product-surface deferrals and their triggers left intact. These are narrowings, not payments.
