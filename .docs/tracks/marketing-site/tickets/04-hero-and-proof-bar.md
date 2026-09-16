# 04: Hero and proof bar

**What to build:** The one screen the whole track exists for. A sceptical agency owner opens the
site on a handset on a mobile network and sees, without scrolling, what the
product does and what it costs them to try it.

**Blocked by:** 01, 03

**Status:** ready-for-agent

- [ ] The above-the-fold test is written and **failing before the hero exists**, and asserts the H1, sub-headline, primary call-to-action and risk-reversal line all sit within 844 pixels at 390 wide (acceptance row 4).
- [ ] If the call-to-action would fall below the fold, **sub-copy is cut — never the call-to-action**.
- [ ] Dual-door hero: the letting path and the land path are both reachable from it.
- [ ] The risk-reversal line ships **scoped**: pilot partners run one full rent cycle alongside their existing spreadsheet, and if the two sets of books disagree they do not go live. Publishing it unscoped would turn a one-off pilot gate into a standing offer.
- [ ] The proof bar states only the defensible engineering targets, each labelled as a design target the platform holds itself to and linked to the security page — **never as a result a customer gets**.
- [ ] The auto-match figure appears **with its denominator**: measured over rent and charge payments against open invoices, with deposits and plot instalments excluded. A bare percentage fails review.
- [ ] Largest-contentful-paint stays under 2.0 seconds on the throttled mobile profile with a static hero image. Report the number; if it cannot be met, that is evidence about the stack on Kenyan mobile and the number is reported rather than the profile tuned.
- [ ] No autoplaying video, and no map library.
