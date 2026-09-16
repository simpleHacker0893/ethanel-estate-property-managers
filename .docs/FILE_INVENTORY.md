# FILE INVENTORY

Client files, source data, fixtures and references, with their status.

`ROADMAP.md` on the Sprint 001 partner files: **"Nothing else in this plan is
more valuable per hour than these files."** Four sprints are graded against
them, so this table is the tracker for the highest-leverage dependency in the
project, and it is owned by someone other than the Builder.

**Rule:** raw client originals never enter git. Anonymised fixtures do, on
purpose, under `fixtures/`. `.gitignore` ignores `samples/raw/` and
`samples/private/` and does **not** blanket-ignore spreadsheet or PDF extensions,
because the anonymised fixtures must be committable.

---

## 1. Design-partner source files — Sprint 001

| File | Source | Used by | Sensitive | Status | Notes |
|---|---|---|---|---|---|
| Rent roll spreadsheet | Design partner | 004 grid, 006 pro-rata, 015 import | Yes | **Not received** | The grid in 004 is graded against this, not against invented data. Pro-rata cases in 006 are derived from it rather than from first principles. |
| Landlord statement | Design partner | 010 landlord portal, 015 import | Yes | **Not received** | The target output format for the monthly statement. |
| M-Pesa / bank statement export | Design partner | 007 reconciliation, 015 D-39 gate | Yes | **Not received** | The measured auto-match rate is computed against this. Without it the 95% bar has nothing underneath it. |
| Signed lease | Design partner | 003 domain model, 015 import | Yes | **Not received** | The domain model has to survive contact with this. |

**Risk R-04** is that these arrive late or not at all. Mitigation in `STATE.md`:
name all four files in advance of the week-1 partner meeting so they actually
turn up. Chase, do not wait.

---

## 2. Documents Ethanel produces in Sprint 001

| File | Produced by | Used by | Status | Notes |
|---|---|---|---|---|
| Caretaker device and data constraints | Field observation | 008 ops UI | **Not written** | Device classes, screen sizes, data cost per MB, usage posture, where they physically stand. This is the spec the Sprint 008 UI is graded against, and it must name specific devices. |
| Nairobi to Neon latency measurements | Sprint 001 measurement | ADR-002 | **Not measured** | p50 and p95 across `af-south-1`, `eu-west-1`, `eu-central-1`, on a real Safaricom mobile connection. |
| eTIMS certified-integrator lead time | Enquiry | 013, and the plan itself | **Not started** | If the lead time exceeds 16 weeks this is a Sprint 001 action, not a Sprint 013 one. |

---

## 3. Fixtures in the repo

| Path | Contents | Status |
|---|---|---|
| `fixtures/partners/` | Anonymised versions of everything in §1 | **Does not exist yet** |
| staging seed (E22) | Mock listings, every user role, transaction history. Production-shaped and production-sized. | **Sprint 004** |

Once the fixtures land, add them to the knowledge graph so the partners' real
paperwork is queryable domain knowledge rather than files nobody rereads:

```bash
graphify add ./fixtures/partners --author "design partner"
graphify extract . --mode deep
```

The `pdf` extra is installed, so partner PDFs are indexable. `.prisma` files are
**not** parsed by graphify: commit `prisma/migrations/**/migration.sql` and the
schema reaches the graph through the SQL extractor instead.

---

## 4. The pack itself

| Path | Contents | Status |
|---|---|---|
| `.docs/` | The operating pack. `ARCHITECTURE.md` and `PRD.md` at v1.2, reconciled. | Committed (D-49) |
| `.docs/adr/` | Full ADR records for hard-to-reverse decisions (E17) | **Empty.** ADR-002 is the first one due, in Sprint 001. |
| `ethanel-sprint-pack.zip` | The original archive the `.docs/` tree was unpacked from | Gitignored. The unpacked tree is the source of truth. |
