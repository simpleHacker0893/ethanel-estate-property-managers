# 14: Metadata, Open Graph images, structured data, sitemap and robots

**What to build:** How the site is found and how it presents when shared. Generated from the route
manifest rather than hand-listed, so a page added later cannot be silently
missed — which is the failure this approach exists to prevent.

**Blocked by:** 11, 12, 13

**Status:** ready-for-agent

- [ ] Every route generates its own title and description; none is a duplicate of another.
- [ ] Open Graph images generate from one template.
- [ ] **Sitemap and robots files generate from the route manifest, never a hand-written list.**
- [ ] Organization, software, FAQ and breadcrumb structured data present wherever it applies.
- [ ] The organization data **omits the address entirely** rather than inventing one, and the footer carries no `wa.me` link until there is a real number (Q20). A fabricated address in structured data is a claim search engines index.
- [ ] Language alternates declared for `en-KE`, with `sw-KE` reserved.
- [ ] The kitchen sink is absent from the sitemap and not built in production.
