# Sprints

One-week sprints (D-50). Sixteen of them. The sequence and its reasoning live in
`../ROADMAP.md`; each folder here is the operational detail for one week.

Each sprint folder is filled **just in time**, but not every file is a forecast.

| File | All sixteen? | Why |
|---|---|---|
| `requirements.md` | Yes, stubbed | So the shape of the whole run is visible. |
| `acceptance.md` | Yes | It restates that sprint's own exit criteria **verbatim**. A restatement is not a forecast, so writing it early costs nothing. The "how to verify" column is filled in the week before. |
| `handoff-prompt.md` | Yes | Mechanical: it points at the other three files and carries the standing rules. |
| `blueprint.md` | **001 and 002 only** | This is the file that would be fiction. Sprint 011's blueprint should benefit from what Sprint 007 taught, and Sprint 005's cannot be written until ADR-012 lands at the end of Sprint 004. |

Templates for all three live in `_templates/`. Copy `_templates/blueprint.md`
into a sprint folder in the week before that sprint starts — not earlier.

| Sprint | Theme | Phase |
|---|---|---|
| [001](001-foundations-and-region/) | Ground truth and the pipeline | 0 — Platform |
| [002](002-chassis-and-tenancy/) | The chassis and tenancy | 0 — Platform |
| [003](003-property-domain/) | The property domain | 0 — Platform |
| [004](004-grid-and-readiness-floor/) | The grid and the readiness floor | 0 — Platform |
| [005](005-ledger-core/) | Ledger core | 1 — Money |
| [006](006-invoicing-and-rent-runs/) | Invoicing and rent runs | 1 — Money |
| [007](007-payments-and-reconciliation/) | Payments and reconciliation | 1 — Money |
| [008](008-repairs-and-caretakers/) | Repairs, caretakers and running costs | 2 — Operations |
| [009](009-whatsapp-and-notifications/) | WhatsApp and notifications | 2 — Operations |
| [010](010-resident-and-landlord/) | Resident and landlord experience | 2 — Operations |
| [011](011-marketplace-and-viewings/) | Marketplace, storefronts and viewings | 3 — Market |
| [012](012-land-plots-and-billing/) | Land inventory, God's-eye view, billing | 3 — Market |
| [013](013-hardening-security/) | Security, isolation and obligations | 4 — Readiness |
| [014](014-hardening-reliability/) | Reliability and operations | 4 — Readiness |
| [015](015-pilot-readiness/) | Pilot readiness | 4 — Readiness |
| [016](016-go-live/) | Go-live | 4 — Readiness |

## Filling a sprint folder

Before the sprint starts:

- **`blueprint.md`** — how it gets built. Service boundaries touched, schema
  changes, API contracts added, job definitions, UI surfaces. Specific enough
  that the Builder makes no product decisions. Copy from `_templates/`.
- **`acceptance.md`** — already present. Fill the "how to verify" column with the
  command or the click path, and the evidence column as the week runs.
- **`handoff-prompt.md`** — already present. Read it once to confirm the exit
  criteria it quotes are still the right ones.

The weekly loop that consumes these files is `../PLAYBOOK.md`.

After the sprint, the Builder's completion report is reviewed against
`acceptance.md` before the sprint is closed, and `../STATE.md` is edited in place.
