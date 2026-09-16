# 10: The feature page template, proven on one page

**What to build:** The template is the work; the remaining pages are mechanical once it exists.
Building it as its own ticket stops nine pages inheriting a shape that was only
ever tested against one.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] One shared feature-page template driven entirely by a content module — no copy inside the component.
- [ ] One real feature page built on it, complete and reachable from navigation.
- [ ] Every capability on the page names its implementing service and its availability, and fails to compile otherwise.
- [ ] The template generates its own metadata so the nine remaining pages inherit it rather than repeating it.
- [ ] The accessibility gate passes on this page, which is the fourth scanned route.
