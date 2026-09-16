# Ethanel — Product Requirements Document

| | |
|---|---|
| **Version** | 1.2 (supersedes 1.1) |
| **Date** | 15 September 2026 |
| **Owner** | Njuguna Njenga (Cpt. N), Founder and Technical Architect |
| **Inputs** | Discovery questionnaire answers (61/61), founder decisions of 15 Sep 2026, round 2 scoping answers recorded in `DECISIONS.md` |
| **Companion** | Ethanel Architecture v1.2 · `DECISIONS.md` · `ROADMAP.md` |
| **Status** | Approved scope for pilot build. PRD-F1 and PRD-F2 closed; PRD-F3, PRD-F4 and PRD-F5 still open — see §0 |

## Change log

| Version | Change |
|---|---|
| 1.2 | Reconciled with the round 2 decisions in `DECISIONS.md`. **Pilot is sixteen one-week sprints, not thirteen weeks** (D-50) — §6.1, §13 and the §3 on-time metric rebuilt against `ROADMAP.md`. Tension **PRD-F1 closed** by taking its own "move the pilot date to 16 weeks" option; **PRD-F2 closed** by D-28/D-31. Release 1.1 and Release 2 windows shifted one month. Decision PRD-D5 corrected to schema-per-service with RLS (D-11, D-12). Closes `RECONCILIATION.md` |
| 1.1 | Discovery answers applied. Renamed workspace → **organization**, tenant → **resident**, property owner → **landlord**. Added land companies, subdivided land projects, sale milestone tracker, lead pipeline, storefronts, live video viewings, 360° photos, outside location view, e-signature, document text recognition and AI, eTIMS, WhatsApp as the main channel. Slack removed from the product. Pricing extended for land companies and lead fees. Release plan rebuilt for a solo build and a 3-month pilot go-live |
| 1.0 | Clerk auth, rental management focus, reports, repairs, pricing model, Kubernetes |
| 0.1 | Initial marketplace-first draft |

### A note on the codes in this document

Two prefixes, because the bare codes this document used to carry collided with
the pack's — and, in two places, with each other (D-56, `READINESS.md` §4).

- **`DQ-…`** — an answer from the round-1 discovery questionnaire (61/61). These
  are *provenance*: they say where a statement came from, not what was decided.
- **`PRD-D1`–`PRD-D20`** — this document's decisions log, §14.
  **`PRD-F1`–`PRD-F5`** — the five founder tensions in §0.
- **`D-nn`** unprefixed — a decision in `DECISIONS.md`, which is the
  binding record. **`E1`–`E22`** — a readiness item in `READINESS.md`.

`DQ-D2` and `PRD-D2` are different things, which is why neither is written bare
any more. Journeys in §5 are numbered "Journey 1…6" rather than `J1…J6` for the
same reason. One bare code survives on purpose: `B4` in Journey 2 is a literal
unit code, the kind a resident types as an M-Pesa account reference.

---

## 0. Founder calls

Five tensions were raised in v1.1. **Two are now closed.** The remaining three still need a yes or no, and Phase 0 is now sprints 001–004 (`ROADMAP.md`), so they are due by the end of Sprint 004.

### Closed

| # | Tension | Resolution |
|---|---|---|
| **PRD-F1** | Solo build with Claude Code (DQ-J3), first paying agency live within 3 months (DQ-J4), and every workflow excellent (DQ-J5), with a very large MVP scope | **Closed by taking PRD-F1's own third option: the pilot date moves to 16 weeks** (D-50). Sixteen one-week sprints, go-live at the end of Sprint 016. The extra four weeks are Phase 4 — readiness — and they exist because 18 of 22 readiness items were marked "pay before go-live". §6.1 remains the scope commitment; the rest ships in Releases 1.1 and 2. No developer is being hired |
| **PRD-F2** | Kubernetes (DQ-D4) with a near-zero budget (DQ-F4) and no platform engineer | **Closed by D-28 and D-31.** One EKS Auto Mode cluster, GitHub Actions + Helm with a manual production gate, OpenTofu, HPA on `web` and `gateway`. Argo CD, KEDA and separate AWS accounts are deferred with explicit triggers in Architecture §11.0 — not "after the pilot" by default. Eleven logical services run in four Deployments (Architecture ADR-001), which is also what keeps the pod floor affordable |

### Still open

| # | Tension | Why it matters | Recommendation |
|---|---|---|---|
| **PRD-F3** | Residents sign in with Google, then type their WhatsApp number (DQ-C3) | An unverified number would let anyone see another person's M-Pesa payments and chats | Verify the number with a WhatsApp one-time code (SMS fallback) before linking payments, chats or leases. Built this way in M1-02 and Architecture §6.1 — but never formally accepted, so it is still listed here |
| **PRD-F4** | Caretaker phone numbers shown on listings for viewing calls (DQ-E1) | Public numbers attract scams and spam, bypass lead tracking, and break per-lead billing (DQ-A3) | Show a "Request viewing" and a tracked WhatsApp button; reveal the caretaker's number only after a verified prospect submits a request |
| **PRD-F5** | Ethanel sells software to agencies and also manages its own portfolio (DQ-A2) | Agencies will ask whether Ethanel sees their data or ranks its own listings higher | Ethanel's management arm is an ordinary organization with no special access; marketplace ranking rules are published and identical for all; disclose this in the terms |

PRD-F3, PRD-F4 and PRD-F5 are carried in `QUESTIONS.md` as Q11, Q12 and Q13 so they sit with the other open business facts rather than only here.

## 1. Product summary

Ethanel is a multi-tenant SaaS platform for Kenyan property businesses, with a public marketplace.

- **Letting and property management firms** (first customers) manage rental properties for many **landlords** through **caretakers**: residents, leases, rent collection, repairs, running costs, landlord statements and remittances.
- **Land-selling companies** market subdivided land projects and plots, manage buyer leads and track each sale from offer to title transfer. They pay for what they market.
- **Landlords** see live, spreadsheet-style reports on their properties.
- **Residents** pay rent easily, get receipts and report problems on WhatsApp or in the app.
- **Prospects** browse listings with photos, videos, 360° photos and an outside view of the location, then request viewings, including live video viewings.
- **Ethanel** runs the platform, verifies listings and charges subscriptions and marketplace fees. Ethanel also manages its own portfolio as a regular organization.

## 2. Glossary (binding for UI, code and tickets)

| Term | Meaning | Code name |
|---|---|---|
| **Organization** | An agency, land company or landlord business using Ethanel. Maps 1:1 to a Clerk Organization | `organizations`, `organization_id` |
| **Organization owner** | The principal of an organization; controls billing and can close the account | Clerk role `org:owner` |
| **Landlord** | A property owner whose properties an organization manages | `landlords`, `landlord_id` |
| **Resident** | A person or company renting a unit | `residents`, `resident_id` |
| **Property** | A building, estate or compound with one address | `properties` |
| **Unit** | A lettable space in a property | `units` |
| **Caretaker** | Organization staff member based at a property | Clerk role `org:caretaker` |
| **Repair manager** | Staff member who triages repair requests and controls repair spend | Clerk role `org:repair_manager` |
| **Letting or sales agent** | Staff member who handles listings, leads and viewings | Clerk role `org:agent` |
| **Land project** | A parent parcel subdivided into plots and sold as one project | `land_projects` |
| **Plot** | A saleable or leasable parcel, standalone or within a land project | `plots` |
| **Listing** | A marketplace advert for a unit, home, plot or land project | `listings` |
| **Lead** | A prospect's enquiry on a listing | `leads` |
| **Qualified lead** | A lead that meets the billing definition in §9.4 | `leads.qualified_at` |
| **Storefront** | An organization's public page on Ethanel showing its listings | `storefronts` |
| **Occupied unit** | A unit with an active lease on the billing snapshot date | metering |
| **Active plot listing** | A plot or project listing visible in the marketplace on the snapshot date | metering |

"Tenant" is not used anywhere in the product or code, to avoid confusion with multi-tenancy.

## 3. Goals and success metrics (first 12 months)

| Goal | Metric | Target |
|---|---|---|
| Pilot goes live on time | Committed design partners running live rent collection | First paying agency at the end of Sprint 016 (week 16); all committed partners within 4 weeks of that |
| Residents pay easily | Share of invoiced rent paid through supported channels | ≥ 70% by month 6 of an organization |
| Rent reconciles itself | Paybill and STK payments matched without manual action | ≥ 95% |
| Fast month-end close | Days from month start to all landlord statements issued | ≤ 3 working days |
| Repairs get done | Requests closed within SLA | ≥ 85% |
| Listings convert | Listing views → viewing requests | ≥ 5% |
| Viewings happen | Requested viewings confirmed within 24 hours | ≥ 90% |
| Landlords self-serve | Invited landlords opening their portal monthly | ≥ 60% |
| Scale | Units under management | 5,000–50,000 (DQ-J1) |
| Revenue quality | Net revenue retention | ≥ 110% |

### Non-goals (all releases in this document)

- ~~Public marketing landing page (deferred).~~ **Reversed by D-68.** The public marketing site is in scope and is built as a track (`.docs/tracks/marketing-site/`) alongside the sixteen sprints rather than inside them, so the eighteen-of-twenty-two readiness arithmetic is unaffected.
- Ethanel receiving or disbursing rent (funds go to organization client accounts, DQ-G2).
- Slack integration in the product (DQ-C2: very few agencies use it). Slack stays a developer and internal tool only.
- Short stays and off-plan inventory before Release 2.
- Tenant credit bureau checks, mortgages, escrow.
- 3D interior walk-throughs (DQ-F1: outside view only; interiors use 360° photos).

## 4. Users, roles and permissions

### 4.1 Personas

| Persona | Top jobs |
|---|---|
| **Organization owner / admin** | Portfolio health, staff, plans and billing, landlord relationships |
| **Property manager** | Onboard residents, chase arrears, approve expenses, answer landlords |
| **Letting or sales agent** | Publish listings, work leads, run viewings (in person and video), close lettings and sales |
| **Accountant** | Reconcile payments, record expenses, issue landlord statements, record remittances, eTIMS invoices |
| **Repair manager** | Triage requests, dispatch caretakers or vendors, approve quotes, track cost |
| **Caretaker** | Tasks, photo updates, meter readings, petty costs, showing units. Phones are a mix of smartphones and basic phones (DQ-G10) |
| **Landlord** | Income, expenses, arrears, occupancy, statements, approve large repairs |
| **Resident** | Pay rent, receipts, report problems on WhatsApp or app, lease and balance, e-sign documents |
| **Prospect / buyer** | Browse, request viewing or site visit, join live video viewing, track purchase milestones |
| **Land company staff** | Manage land projects and plot inventory, leads, reservations, sale milestones |
| **Ethanel super admin** | Onboard organizations, plans and flags, listing verification, support sessions, billing, announcements |

### 4.2 Permission matrix (pilot)

**Full** = create, edit, delete · **Read** = view · **Assigned** = only assigned properties or listings · **Own** = own records only · — = none

| Capability | Super admin | Org owner/admin | Property manager | Agent | Accountant | Repair manager | Caretaker | Landlord | Resident |
|---|---|---|---|---|---|---|---|---|---|
| Plan, billing, staff | Full (platform) | Full | — | — | Read billing | — | — | — | — |
| Landlords, properties, units | Support session, read | Full | Assigned | Read | Read | Read | Assigned, read | Own, read | — |
| Residents and leases | Support session, read | Full | Assigned | Assigned | Read | Read | Assigned, contact | Own, read | Own, read, sign |
| Invoices and payments | Support session, read | Full | Assigned | — | Full | — | Record cash | Own, read | Own, read, pay |
| Expenses and running costs | Support session, read | Full | Assigned, approve | — | Full | Assigned, repairs | Assigned, petty cash | Own, read; approve above threshold | — |
| Repairs and work orders | Support session, read | Full | Assigned | — | Read | Full | Assigned tasks | Own, read | Create, own |
| Landlord statements, remittances | Support session, read | Full | Assigned, read | — | Full | — | — | Own, read | — |
| Listings, leads, viewings | Verify, take down | Full | Assigned | Assigned, full | — | — | Assigned viewings | — | — |
| Land projects, plots, sales | Verify | Full | — | Assigned, full | Read | — | — | — | Buyer: own milestones |
| Reports | Platform metrics | Full | Assigned | Leads, listings | Full | Repairs | — | Own portfolio | — |
| Documents | — | Full | Assigned | Assigned | Full | Repair docs | Upload on assigned | Own, read | Own, read |

Staff in several organizations (DQ-B4) see only the data of the organization they have selected and only what their role in that organization allows. Ethanel staff access organization data only inside a time-limited support session granted by the organization (DQ-B8). Ethanel staff sign in with Google accounts via Clerk (DQ-C2).

## 5. Key journeys

**Journey 1. Resident onboarding and first payment.** Invite link by WhatsApp/SMS → sign in with Google → complete profile → verify WhatsApp number with a code → lease and balance appear → e-sign lease if pending → pay by M-Pesa paybill (unit code as account) or STK prompt → receipt in WhatsApp and app.

**Journey 2. Repair via WhatsApp.** Resident messages the organization's WhatsApp number ("sink leaking in B4") → verified number is matched to the resident and unit → request created, AI suggests category and urgency → repair manager confirms and assigns caretaker → caretaker updates with photo → cost above landlord threshold goes to the landlord for approval → closed, cost posted, resident confirms on WhatsApp.

**Journey 3. Month-end close.** Clear unmatched payments → expenses posted (repairs automatic, recurring costs generated) → management fee calculated → landlord statements generated, reviewed, issued → eTIMS invoices issued where applicable → remittances recorded → period locked → landlords notified.

**Journey 4. Listing to viewing.** Agent creates listing → uploads photos, 360° photos and video; AI drafts the description from photos and details → Ethanel verifies → listing live on marketplace and storefront with outside location view → prospect verifies phone and requests a viewing (in person or live video) → agent or caretaker confirms; Google Calendar event with a video link is created for video viewings → WhatsApp reminder the day before → viewing held or marked no-show → lead moves through pipeline.

**Journey 5. Land project sale.** Land company creates project → uploads subdivision plan and draws plot boundaries (labelled survey or illustrative) → publishes project and plot listings → buyer enquires, visits site → reserves plot → milestone tracker: offer letter, deposit, official search (Ardhisasa/eCitizen link, certificate uploaded), sale agreement, balance, transfer, title issued → each milestone with documents, dates and notifications to buyer.

**Journey 6. Organization onboarding (guided pilot, DQ-H2).** Ethanel creates organization and invites owner → Ethanel imports landlords, properties, units, residents and balances from the organization's Excel files → organization connects paybill → staff and caretakers invited → residents invited in bulk → first invoice run reviewed together.

## 6. Release plan

### 6.1 Pilot scope: sprints 001–016, sixteen weeks

What committed design partners need to run their business on Ethanel, done well. The sequence, the critical path and the per-sprint exit criteria are in `ROADMAP.md`; this table is the scope commitment, not the schedule.

| Area | In pilot |
|---|---|
| Accounts | Google sign-in, organizations and roles, multi-organization staff, verified WhatsApp number, support sessions, audit log |
| Portfolio | Landlords, management agreements, properties, units (residential and commercial), caretaker and repair manager assignment, Excel import (done by Ethanel with the partner) |
| Leasing | Residents, leases from organization templates, **simple e-signature** with OTP and audit trail, deposits, move-in and move-out inspections with photos and deductions, renewal reminders, annual rent increase rules |
| Money | Configurable charges per organization (rent, water by meter reading, service charge, garbage, electricity, parking, penalties, deposit top-ups), monthly invoice runs, M-Pesa paybill (C2B) and STK, bank/PesaLink and cash recording, auto-reconciliation, receipts, reminders then automatic penalties, resident statements, double-entry ledger |
| Repairs and costs | Requests from app and WhatsApp, triage, work orders to caretaker or vendor, landlord quote approval, cost charged to landlord or resident, expenses, management fee, landlord statements, remittance records, period lock |
| Landlord portal | Dashboard, statements, rent roll, arrears, expenses, approvals |
| Reports | Rent roll, collections, arrears ageing, occupancy, income and expense, landlord statement, expense register, repairs performance, payments log; Excel-like grid; XLSX/PDF export |
| Marketplace | Listings for units, homes for sale, plots, land for lease, commercial; photos, 360° photos, video; outside location view (2D satellite and map); storefront page per organization; viewing requests with agent confirmation; live video viewings via calendar video link; Google Calendar sync; WhatsApp reminders; no viewing fees; lead pipeline with stages, assignment and follow-ups; source tracking |
| Communications | WhatsApp notices and two-way messages, SMS fallback, in-app notices |
| AI | Listing description drafts; WhatsApp message → repair request suggestion |
| Super admin | Organizations, plans, limits and feature flags, listing verification, support sessions, announcements, suspend and offboard, manual subscription invoices payable by M-Pesa paybill or STK |
| Platform | Pilot Kubernetes platform (Architecture §11.0), backups with a monthly restore drill, monitoring and SLO alerting |

**Scope not in §6.1 but required before go-live:** the Phase 4 sprints (013–016) — threat model, full cross-organization isolation audit, public API and keys, Data Protection Act tooling, end-to-end journey tests, load test, runbooks, self-serve import, usability tests, and the 95% reconciliation gate. These are not features and so do not appear in the table above, which is exactly how they got underestimated in v1.1.

### 6.2 Release 1.1: months 5–6

| Area | Scope |
|---|---|
| Land companies | Land projects with subdivision plan and plot inventory map (available, reserved, sold), reservations, sale milestone tracker with documents, buyer milestone view, Ardhisasa/eCitizen search deep links and certificate tracking |
| Tax and accounting | KRA eTIMS invoices through a certified integrator; Monthly Rental Income reports; exports to QuickBooks, Xero, Sage, Zoho Books |
| Documents and AI | Photo capture with text recognition; read leases and receipts into structured data; generate documents from templates; full-text search; expiry reminders |
| Maps | On-demand photorealistic 3D outside view within the free monthly session allowance (§ Architecture 9.5) |
| SaaS billing automation | Metering, automatic invoices, M-Pesa Ratiba standing orders, card via Paystack, dunning; qualified-lead and featured-listing billing |
| Geography | Mombasa, Nakuru, Nanyuki listings and portfolios (DQ-A7) |

### 6.3 Release 2: months 7–10

Off-plan inventory (DQ-D2), portal syndication to BuyRentKenya and Jiji (DQ-D6), agent commissions (DQ-D7), recurring maintenance jobs (DQ-G9), caretaker SMS task flow for basic phones and offline queue (DQ-G10), approvals and compliance certificate storage (DQ-G12), vendor portal, pivot builder and scheduled reports, lead sources from agency websites via embeddable widget, furnished and short stays discovery (DQ-D1) as a separate evaluation.

## 7. Functional requirements

IDs are stable GitHub issue prefixes. **[P]** = pilot, **[1.1]**, **[2]** = release.

### M1 Organizations, accounts and roles

- **M1-01 [P]** Google sign-in via Clerk for all users, including Ethanel staff.
- **M1-02 [P]** Profile completion after first sign-in: full name, WhatsApp number, optional email for statements. The number is verified by WhatsApp one-time code (SMS fallback) before it links chats, payments or leases.
- **M1-03 [P]** Organizations are Clerk Organizations with roles `org:owner`, `org:admin`, `org:property_manager`, `org:agent`, `org:accountant`, `org:repair_manager`, `org:caretaker`.
- **M1-04 [P]** Landlords, residents and buyers are not organization members; access comes from Ethanel records, giving one account and one combined home across all organizations that serve them (DQ-B5).
- **M1-05 [P]** Staff can belong to several organizations; data and permissions follow the selected organization only (DQ-B4).
- **M1-06 [P]** Property-level and listing-level assignment scoping.
- **M1-07 [P]** Invitations by WhatsApp, SMS or email link.
- **M1-08 [P]** Support sessions granted by organization owner or admin, time-limited, read-only, audited.
- **M1-09 [P]** Audit log for security- and money-relevant actions.

### M2 Portfolio

- **M2-01 [P]** Landlords: individual or company, KRA PIN (encrypted), contacts, payout details, repair approval threshold, statement preferences.
- **M2-02 [P]** Management agreements per landlord or property: fee type and rate, fee base (collected or invoiced), remittance day, expense authority.
- **M2-03 [P]** Properties: type (residential, commercial, mixed), address, county, location pin, caretakers, repair manager, photos, documents.
- **M2-04 [P]** Units: code (M-Pesa account reference), type (flat, bedsitter, house, shop, office, godown), size, rent, deposit, meters, status.
- **M2-05 [P]** Excel import with template, validation and import report; used by Ethanel onboarding staff in guided pilots.

### M3 Residents and leases

- **M3-01 [P]** Resident profile: name, verified WhatsApp number, email, ID/passport and KRA PIN (encrypted), documents collected manually (DQ-G7), emergency contact.
- **M3-02 [P]** Lease templates per organization with merge fields; generated lease PDF.
- **M3-03 [P]** Simple electronic signature: resident and landlord or agent review the PDF, confirm with a WhatsApp/SMS one-time code, and the system stamps name, time, IP, device and document hash into a signature certificate appended to the PDF. Legal review of enforceability for lease types before go-live.
- **M3-04 [P]** Lease terms: dates, rent, billing day, deposit, charges, penalty rule, notice period, annual increase rule (percentage or fixed, effective date).
- **M3-05 [P]** Move-in and move-out inspections with room-by-room photos, condition notes, deductions and deposit refund tracking.
- **M3-06 [P]** Renewal reminders at 90/60/30 days; increase applied automatically on the rule date with resident notice.

### M4 Invoicing and rent collection

- **M4-01 [P]** Charge catalogue per organization: the organization decides what is billed (DQ-G4). Charge types: fixed, metered (rate × consumption from readings), percentage, one-off.
- **M4-02 [P]** Monthly invoice runs per property with preview and approval before sending.
- **M4-03 [P]** Meter readings entered by caretakers with photo; anomaly flag when consumption jumps.
- **M4-04 [P]** Channels: M-Pesa paybill per organization or landlord (account = unit code), M-Pesa STK from resident app, bank transfer/PesaLink and cash recorded by staff with reference and proof.
- **M4-05 [P]** Auto-reconciliation: account reference → verified phone → amount; oldest invoice first; overpayment as credit; unmatched review queue.
- **M4-06 [P]** Receipts on WhatsApp and in app, numbered per organization.
- **M4-07 [P]** Reminders before due, on due, +3 and +7 days, then automatic penalties per lease rule; waivers audited.
- **M4-08 [P]** Resident statement with running balance.
- **M4-09 [P]** All money events post balanced ledger entries; corrections are reversals.

### M5 Running costs and landlord accounting

- **M5-01 [P]** Expenses with category, vendor, amount, receipt photo, paid from, charged to (landlord, resident recharge, organization).
- **M5-02 [P]** Recurring running costs (security, cleaning, garbage contracts).
- **M5-03 [P]** Approval thresholds per property and per landlord.
- **M5-04 [P]** Management fee calculation at close.
- **M5-05 [P]** Landlord statements: bulk generate, review, issue; PDF and XLSX.
- **M5-06 [P]** Remittance records with proof; Ethanel moves no money.
- **M5-07 [P]** Period lock and controlled reopen.
- **M5-08 [1.1]** Monthly Rental Income report per landlord.

### M6 Repairs and maintenance

- **M6-01 [P]** Requests from resident app and WhatsApp (verified number → resident and unit), with photos or video, urgency, permission to enter.
- **M6-02 [P]** AI suggestion of category and urgency from the message; repair manager confirms.
- **M6-03 [P]** Statuses New → Triaged → Assigned → In progress → Awaiting approval → Awaiting resident confirmation → Closed; Rejected; Duplicate.
- **M6-04 [P]** SLAs by urgency and category with breach alerts on WhatsApp.
- **M6-05 [P]** Work orders to caretaker or vendor; estimated and actual cost; before and after photos.
- **M6-06 [P]** Landlord approves quotes above threshold in app or via WhatsApp link.
- **M6-07 [P]** Closing with cost posts an expense to landlord or resident.
- **M6-08 [P]** Resident confirms fixed or reopens on WhatsApp.
- **M6-09 [2]** Recurring jobs (pump service, fumigation) and preventive schedules.

### M7 Reports and dashboards

- **M7-01 [P]** Excel-like grid: sort, filter, column control, grouping with subtotals, frozen columns, conditional highlights, totals.
- **M7-02 [P]** Saved and shared views.
- **M7-03 [P]** XLSX, CSV and PDF export; large exports in background.
- **M7-04 [P]** Dashboards for organization, property manager, agent (listings and leads), repair manager and landlord, with drill-down.
- **M7-05 [P]** Every figure reconciles to the ledger.
- **M7-06 [2]** Pivot builder and scheduled email reports.

### M8 Documents and AI

- **M8-01 [P]** Upload and attach documents: leases and addendums, IDs and KRA PINs, title deeds and search results, receipts and invoices, inspection reports and photos, notices, management agreements.
- **M8-02 [P]** Sensitive documents private, encrypted, short-lived links, access logged.
- **M8-03 [1.1]** Photo capture with text recognition for receipts, IDs and leases; extracted fields shown for confirmation before saving.
- **M8-04 [1.1]** Generate documents from templates (notices, demand reminders, offer letters).
- **M8-05 [1.1]** Full-text search across document text.
- **M8-06 [1.1]** Expiry and renewal reminders.
- **M8-07 [P]** AI listing descriptions from photos and details, always editable, never publishing without agent approval.

### M9 Communications

- **M9-01 [P]** WhatsApp as primary channel: receipts, reminders, repair updates, viewing reminders, notices, two-way conversations linked to residents, landlords and leads.
- **M9-02 [P]** SMS fallback where WhatsApp delivery fails; in-app notices; email only for statements if the user adds an email (DQ-G14).
- **M9-03 [P]** Staff inbox for WhatsApp conversations per organization with assignment and "create request" and "create lead" actions.
- **M9-04 [P]** Bulk notices to a property or portfolio with delivery report.
- **M9-05 [P]** WhatsApp opt-in captured at profile completion; opt-out honoured.

### M10 Marketplace, storefronts and viewings

- **M10-01 [P]** Listing types: unit for rent, home for sale, plot for sale, land for lease, commercial space. Off-plan and short stays in Release 2.
- **M10-02 [P]** Media: photos (up to 30), 360° photos (up to 10) shown in an interactive panorama viewer, videos (up to 3) streamed adaptively; resumable uploads; malware scan.
- **M10-03 [P]** Outside location view: satellite and street map around the listing, nearby roads and landmarks; property pin or plot boundary; optional 3D view in Release 1.1 within the free session allowance.
- **M10-04 [P]** Ethanel verification before a listing goes live (DQ-H3).
- **M10-05 [P]** Storefront page per organization with its verified listings and contact actions (DQ-B3).
- **M10-06 [P]** Prospects must sign in and verify their WhatsApp number to request a viewing or reveal contact details (PRD-F4).
- **M10-07 [P]** Viewing requests: in person or live video; preferred times; agent or caretaker (set per listing) confirms or proposes another time; no viewing fees allowed, with a report-a-fee button.
- **M10-08 [P]** Confirmed viewings create Google Calendar events for the assigned staff member (when connected) and Ethanel calendar entries; live video viewings get a video meeting link in the event and on WhatsApp.
- **M10-09 [P]** WhatsApp reminder the day before; agent marks attended or no-show.
- **M10-10 [P]** Lead pipeline: New → Contacted → Viewing scheduled → Viewed → Negotiating → Won / Lost; assignment, follow-up reminders, notes; source tracking (Ethanel marketplace, storefront, Facebook and Instagram campaign links, WhatsApp, walk-ins and referrals, BuyRentKenya, Jiji, agency website entered manually).
- **M10-11 [1.1]** Featured listings (paid placement, clearly labelled).

### M11 Land projects and sales [1.1]

- **M11-01** Land project: name, county, parent parcel reference, total area, amenities, approvals, subdivision plan upload.
- **M11-02** Plot inventory map: plots drawn over the uploaded subdivision plan or satellite map; each plot labelled **Surveyed** (from beacon coordinates) or **Illustrative** (traced) (DQ-F3); status available, reserved, sold, on hold; price and size.
- **M11-03** Reservations with expiry and deposit record.
- **M11-04** Sale milestone tracker per plot or home: offer letter, reservation deposit, official search, sale agreement, balance payments (instalment schedule), land control board consent where applicable, transfer, title issued. Each milestone has due date, documents, responsible party and buyer notification.
- **M11-05** Official search step: deep link to Ardhisasa or eCitizen based on county, instructions for the buyer, upload of the search certificate, recorded result. No automated ownership lookup (see Architecture §9.10).
- **M11-06** Buyer view of milestones and documents.

### M12 Super admin and SaaS billing

- **M12-01 [P]** Organization lifecycle: create, guided onboarding, suspend, offboard with export and deletion after 90 days (DQ-H4).
- **M12-02 [P]** Plans, limits and feature flags per organization.
- **M12-03 [P]** Listing verification queue and takedowns.
- **M12-04 [P]** Platform announcements to organizations.
- **M12-05 [P]** Subscription invoices generated by super admin, paid by M-Pesa paybill or STK.
- **M12-06 [1.1]** Automatic metering (occupied units, active plot listings, qualified leads, storage, messages), automatic invoices, M-Pesa Ratiba standing orders and cards via Paystack, dunning.
- **M12-07 [1.1]** Revenue and usage analytics.

### M13 Tax integration [1.1]

- **M13-01** eTIMS invoices for organizations' commissions and, where the landlord opts in, rental income, issued through a KRA-certified integrator's API.
- **M13-02** Invoice status, control unit invoice number and QR code stored and shown on documents.
- **M13-03** Credit notes for reversals.

## 8. Report catalogue (pilot)

| Report | Audience | Key columns |
|---|---|---|
| Portfolio dashboard | Organization, landlord | Due vs collected, collection rate, arrears, occupancy, expenses, net income, open repairs |
| Rent roll | Manager, accountant, landlord | Property, unit, resident, lease dates, rent, charges, balance, status |
| Collections summary | Accountant, landlord | Invoiced, collected, % by channel |
| Arrears ageing | Manager, accountant | Current, 1–30, 31–60, 61–90, 90+ days, last payment |
| Occupancy and vacancy | Organization, landlord | Occupied, vacant, vacancy days, rent lost |
| Income and expense | Landlord, accountant | Income, expenses by category, management fee, net |
| Landlord statement | Landlord, accountant | Per M5-05 |
| Expense register | Accountant, repair manager | Date, property, category, vendor, amount, charged to |
| Repairs performance | Repair manager | SLA met %, time to close, cost by category, repeat issues |
| Listings and leads | Agent, organization | Views, requests, viewings, no-shows, conversion by source |
| Payments log | Accountant | Channel, reference, phone (masked), amount, matched invoice |
| Lease expiries and increases | Manager | End dates, upcoming increases |

## 9. Pricing and packaging

### 9.1 Recap of the model (unchanged from 1.0)

**Property management plans:** base fee with included occupied units, plus a fee per extra occupied unit; properties and staff seats are plan limits, not charges. See 1.0 analysis for why occupied units beat per-property and per-seat pricing.

### 9.2 Property management plans (hypotheses; KES excl. VAT)

| | Landlord | Starter | Professional | Business | Enterprise |
|---|---|---|---|---|---|
| Base per month | Free | 2,500 | 7,500 | 25,000 | Custom |
| Occupied units included | 5 | 20 | 75 | 350 | Committed |
| Each extra occupied unit | Upgrade | 90 | 70 | 50 | Negotiated |
| Properties | 1 | 10 | 50 | Unlimited | Unlimited |
| Staff seats | 1 | 5 | 20 | Unlimited | Unlimited |
| Landlord portal | — | — | Yes | Yes | Yes |
| Rental listings included | 2 | 10 | 50 | Unlimited | Unlimited |
| WhatsApp messages included per month | 100 | 1,000 | 5,000 | 25,000 | Custom |

The first customers' typical size is 50–500 units (DQ-A4), which lands on Professional and Business. Price interviews with design partners should focus there.

### 9.3 Land and sales marketing plans (new, from DQ-A1 note)

Land companies are charged for what they market, as the founder specified.

| | Land Starter | Land Growth | Land Enterprise |
|---|---|---|---|
| Base per month | 5,000 | 15,000 | Custom |
| Active land projects included | 2 | 10 | Unlimited |
| Active plot listings included | 50 | 400 | Committed |
| Each extra active plot listing | 40 | 25 | Negotiated |
| Sale milestone tracker, reservations | Yes | Yes | Yes |
| Plot inventory map | Yes | Yes | Yes |
| Qualified leads included per month | 20 | 150 | Committed |
| Each extra qualified lead | 250 | 180 | Negotiated |

Why this metric: an active plot listing is the unit of value a land company buys (exposure for a sellable asset); plots come off the meter when sold or unpublished, so they never pay for inventory that has left the market.

### 9.4 Qualified lead fee (DQ-A3)

Lead fees suit sales and land listings, where one closed sale is worth hundreds of thousands of shillings. They are not charged on rental listings for property management subscribers, who already pay for occupied units.

A lead is **qualified** only when all of these are true:

1. The prospect is signed in with a verified WhatsApp number.
2. The prospect requested a viewing or site visit, or started a WhatsApp conversation from the listing and the organization replied.
3. It is the first qualified lead from that prospect on that listing in 30 days.
4. It is not flagged invalid by the organization within 7 days (for example wrong number, spam, duplicate); disputes are reviewed by Ethanel.

Included leads per plan remove bill shock; overage is capped at twice the base fee per month unless the organization raises the cap.

### 9.5 Other revenue

| Item | Pricing |
|---|---|
| Setup and data migration (DQ-A3, DQ-H2) | One-off: KES 15,000 up to 200 units; KES 35,000 up to 1,000 units; custom above. Waived for committed design partners and annual Business plans |
| Featured listings | KES 500 per rental listing per week; KES 1,500 per sale or plot listing per week |
| Extra WhatsApp and SMS messages | Prepaid bundles at provider cost plus 25–35% |
| Extra media storage | Per 50 GB per month |
| 3D outside view beyond free allowance (1.1) | Included while within free provider sessions; paid add-on only if usage exceeds it |

### 9.6 Ethanel's own portfolio

Ethanel's management arm runs on an internal plan with no charge and no special access. Its listings follow the same ranking rules as every organization's.

### 9.7 Validation

Van Westendorp interviews with the committed design partners and 15 more agencies; land company interviews (5–8) for §9.3; pilot at 50% for 6 months; review rates at month 6 with real cost to serve.

### 9.8 Billing mechanics

Pilot: super admin issues KES invoices payable by M-Pesa paybill or STK. Release 1.1: automatic metering and invoicing, M-Pesa Ratiba standing orders (available through Safaricom Daraja) and cards through Paystack. Clerk Billing not used (Stripe required in production; not suited to KES and M-Pesa).

## 10. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Resident pay and repair screens usable on a mid-range Android over 3G (interactive ≤ 2 s); listing pages with media load progressively; 10,000-row grids virtualised |
| Availability | 99.5% during pilot, 99.9% target from Release 1.1 |
| Integrity | Balanced append-only ledger; idempotent webhooks; no duplicate receipts; daily ledger check |
| Security | Server-side authorisation on every read and write; organization isolation in code and Postgres RLS; verified phone before linking personal financial data; encrypted sensitive fields |
| Privacy | Kenya Data Protection Act 2019 compliance; WhatsApp opt-in; masked phone numbers in logs and reports |
| Cost | Mapping and 3D near zero during beta (DQ-F4): under USD 100 per month, with hard session caps |
| Scale | 50,000 occupied units and 500 organizations without redesign |
| Accessibility | WCAG 2.1 AA on resident, landlord, caretaker and prospect screens |
| Localisation | English; Swahili for resident and caretaker screens in Release 1.1 |
| Recoverability | RPO ≤ 15 minutes, RTO ≤ 4 hours |

## 11. Compliance

- **Funds:** rent goes to organization client accounts or landlord accounts (DQ-G2). Ethanel never holds rent.
- **Electronic signatures:** confirm with an advocate which documents the simple e-signature may be used for, and which need advanced electronic signatures, witnessing or registration.
- **eTIMS:** landlords earning rental income are now expected to issue eTIMS invoices; system integration with KRA requires certification. Ethanel uses a certified third-party integrator until it meets KRA's vendor certification requirements.
- **Land records:** Ardhisasa requires the registered owner to approve a search; Ethanel links to official portals and stores the resulting certificate rather than querying ownership itself.
- **Marketplace:** listing verification, no viewing fees, clear labelling of featured listings and illustrative plot boundaries.
- **Ethanel's dual role:** disclosed in terms; no cross-organization data access.

## 12. Integrations

| Integration | Purpose | Release |
|---|---|---|
| Clerk | Google sign-in, organizations, roles | P |
| WhatsApp Cloud API | Verification codes, notices, receipts, two-way messages | P |
| SMS provider | Fallback codes and notices | P |
| M-Pesa Daraja | C2B paybill, STK, transaction status; Ratiba standing orders for SaaS billing (1.1) | P / 1.1 |
| Google Calendar API | Viewing events and video meeting links | P |
| AI model API | Listing descriptions, message triage; document extraction (1.1) | P / 1.1 |
| Map imagery and 3D tiles | Outside location view | P / 1.1 |
| KRA eTIMS certified integrator | Tax invoices | 1.1 |
| Paystack | Card billing for subscriptions | 1.1 |
| Accounting exports | QuickBooks, Xero, Sage, Zoho Books | 1.1 |
| Ardhisasa / eCitizen | Deep links only | 1.1 |

## 13. Pilot delivery plan (solo founder with Claude Code sub-agents)

Sixteen one-week sprints (D-50). `ROADMAP.md` holds the reasoning, the critical path and each sprint's exit criterion; `.docs/sprints/<n>/requirements.md` holds the detail. This table is the product-facing summary.

| Sprint | Phase | Milestone | Demo to design partners |
|---|---|---|---|
| 001 | 0 — Platform | Region measured and decided, partner sample files collected, monorepo, OpenTofu, CI/CD to staging | A commit reaches staging with no human step |
| 002 | 0 | Service chassis, Helm library chart, tenancy and RLS, cross-organization test harness, `identity-svc`, Google sign-in | Staff sign-in with scoped access, provably isolated |
| 003 | 0 | Landlords, properties, units, leases, residents, lease lifecycle, deposits, media, `web` shell | Partner's smallest building represented correctly |
| 004 | 0 | Excel-like data grid, chart primitives, observability, backups, **first timed restore drill**, staging seed | The grid on their real spreadsheet data |
| 005 | 1 — Money | Chart of accounts, double-entry journal, period close, reversal rules | Journal walkthrough with a partner accountant |
| 006 | 1 | Invoices, charges, meter-read water, penalties, credit notes, rent runs (500 units < 2 min), PDF rendering | First real invoice run |
| 007 | 1 | Daraja paybill and STK, webhook ingress at `gateway`, reconciliation engine, suspense and manual match | First real payments; **auto-match rate published** |
| 008 | 2 — Operations | Repair requests, work orders, caretaker UI, inspections, meter readings, running costs, vendors | A caretaker completes a task on their own handset |
| 009 | 2 | WhatsApp templates and inbox, notification engine and preferences, SMS fallback | Resident pays and gets a WhatsApp receipt |
| 010 | 2 | Resident PWA, landlord portal (live ledger figures), accountant month-end | **First full month-end close**, signed off by their accountant |
| 011 | 3 — Market | Listings, search, storefronts, viewings, calendar and video link, lead pipeline, map view | Listings live, first viewings booked |
| 012 | 3 | Plot inventory and instalment sales, God's-eye view, `billing-svc` usage counters and feature flags | A land company onboarded end to end |
| 013 | 4 — Readiness | Threat model, isolation audit to completeness, public API and keys, Data Protection Act tooling, secrets rotation | The gate list green in CI output |
| 014 | 4 | End-to-end journey tests, full load test, SLO alerting, runbooks, second restore drill, cost budgets | Every failure seen in staging has a runbook |
| 015 | 4 | Self-serve import, usability tests (residents, caretakers, accountants), **the 95% match gate**, ADRs complete | Go/no-go readiness review |
| 016 | 4 | Production cutover, first partner migrated, **one rent cycle run in parallel with their spreadsheet** | First paying agency collecting rent |

**Scope levers if the plan slips.** Sprints 011 and 012 are the designated slip absorbers: if Sprint 007 overruns, the marketplace moves to Release 1.1 and the pilot ships as a management platform. Then, in order: (1) e-signature falls back to signed PDF upload; (2) outside view ships as a static map with a pin; (3) inspections without the deductions calculator. **Money, repairs, landlord statements and the whole of Phase 4 are never cut** — Phase 4 is the reason this plan is 16 weeks rather than 12, and cutting it does not save four weeks, it moves them to after the money is real.

## 14. Decisions log

| # | Decision | Source |
|---|---|---|
| PRD-D1 | Clerk auth, Google sign-in for all users including Ethanel staff | 15 Sep, DQ-C2, DQ-C3 |
| PRD-D2 | First customers: letting and property management firms; land companies also served and charged for what they market | DQ-A1 |
| PRD-D3 | Ethanel manages its own portfolio as a normal organization | DQ-A2, DQ-F5 |
| PRD-D4 | Organization (Clerk) + resident + landlord terminology; `organization_id` in code | DQ-B1, DQ-B4 note |
| PRD-D5 | One Neon project, **one schema per service and one role per schema**, with `organization_id` + Postgres RLS on every tenant-scoped table. No cross-schema joins or foreign keys | DQ-B2, superseded by D-11 and D-12 |
| PRD-D6 | Storefront page per organization | DQ-B3 |
| PRD-D7 | WhatsApp is the primary channel; Slack excluded from product | DQ-C1, DQ-C2 |
| PRD-D8 | Verified WhatsApp number required after Google sign-in | DQ-C3, DQ-F3 |
| PRD-D9 | Subdivided land projects and full sale milestone tracker (Release 1.1) | DQ-D3, DQ-D8, DQ-F1 |
| PRD-D10 | Live video viewings in pilot | DQ-E6 |
| PRD-D11 | Outside 3D/location view only, near-zero cost; interiors via 360° photos | DQ-F1, DQ-F2, DQ-F4 |
| PRD-D12 | Rent to organization client accounts; statements and remittances automated in pilot | DQ-G2, DQ-G3 |
| PRD-D13 | eTIMS through a certified integrator | DQ-G11 |
| PRD-D14 | Guided pilots with data import; M-Pesa and card for subscriptions | DQ-H1, DQ-H2 |
| PRD-D15 | PWA only at launch | I1 |
| PRD-D16 | Solo build with Claude Code; **pilot go-live at the end of Sprint 016 — sixteen one-week sprints** — with §6.1 scope | DQ-J3, DQ-J4, DQ-F1, superseded by D-50 |
| PRD-D17 | AWS only; region co-located with Neon and **chosen by measured Nairobi latency in Sprint 001**, Africa-first | DQ-J2, Architecture §3, D-28, D-38 |
| PRD-D18 | Eleven logical services owning one schema each, deployed as four Deployments, split on documented triggers | D-01/D-54, Architecture ADR-001 |
| PRD-D19 | All inbound webhooks terminate at `gateway`; matching is always asynchronous | D-14 |
| PRD-D20 | Landlord portal and dashboard figures read live from the ledger with a "last updated" stamp — never a cached summary | D-45 |

### Open

**Founder calls:** PRD-F3 phone verification, PRD-F4 contact reveal, PRD-F5 neutrality disclosure (§0, and `QUESTIONS.md` Q11–Q13). PRD-F1 and PRD-F2 are closed.

**Business facts this document assumes but does not state** — all in `QUESTIONS.md`, each blocking a named sprint: agency fee terms and VAT (Q2, the highest-value unknown, blocks Sprint 005), reversal approval threshold behind M5-03 and M4-09 (Q1), resident account-number reality behind M4-05 (Q3), landlord remittance cycle behind M5-06 (Q4), deposit rules behind M3-04 (Q5), late-rent penalty behind M4-07 (Q9), water billing behind M4-01 (Q10), data-controller registration (Q6), pricing bands in §9.2 and §9.3 (Q7), and the first pilot partner (Q8). **The pricing tables in §9.2 and §9.3 are explicitly hypotheses, not decisions.**

**Architecture decision still open:** the reporting read model (Architecture §7.4, ADR-012) — due by the end of Sprint 004, because M7-01 through M7-05 and the whole of §8 depend on it.
