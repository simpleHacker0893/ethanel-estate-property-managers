# ADR-023 · The receivable is keyed to the lease, not the resident

**Status:** accepted · **Decision:** D-57 · **Date:** 15 September 2026
**Exercised:** Sprint 003 (property domain), Sprint 005 (ledger core)

The chart of accounts called it "resident receivable", but every key in the money
path says lease: `leases` has no `resident_id`, parties hang off
`lease_parties (lease_id, resident_id, user_id?)` with many rows per lease,
`invoices` are keyed `lease_id`, and `ledger_accounts` carries
`landlord_id?, property_id?, lease_id?` and no `resident_id` at all. We are
keying the receivable to the **lease** and renaming the account
**`lease receivable`**, so the name matches the key and the parties to a lease
are co-liable for the whole rent.

## Why this needs a record

Postings are immutable (D-15, ADR-007's append-only ledger). Once commission and
rent entries exist against an account, the account's grain cannot be changed
without rewriting history that is deliberately unrewritable. This is a decision
made before the first entry exists, and it cannot be revisited after Sprint 005
ships — which is exactly the condition an ADR is for.

## Considered options

**Key the receivable to the resident.** Rejected. It cannot represent a lease
with two parties without inventing a rent split on `lease_parties`, and no such
column exists. Worse, it makes step 2 of the reconciliation order ambiguous
rather than harmless: two flatmates on one lease have two verified phones but
share a single `units.code`, so "payer phone on file" cannot pick between them.
Under a lease-keyed receivable that ambiguity costs nothing — both payments
allocate against the same invoice. Under a resident-keyed one it is a defect on
every shared unit.

**Key it to the lease, with a per-party split.** Rejected for the pilot, not on
principle. It is strictly more expressive and strictly more expensive: it needs
the split column, a rule for what happens when the splits do not sum to the rent,
and per-party arrears ageing. Nothing in the pack asks for per-party arrears, and
whether the partners' real leases even apportion liability is **Q17, open**. If
Q17 comes back "shares, not joint liability", this ADR is superseded rather than
patched.

## Consequences

- **`resident receivable` is a rejected alias**, listed as such in `DOMAIN.md` §3.
  A Builder who sees it in an older document should read `lease receivable`.
- **A party leaving mid-term closes its `lease_parties` row; it is never deleted.**
  `leases` is *not* versioned by effective date (unlike `management_agreements`),
  so a deleted party row would silently rewrite who owed what while the postings
  behind it stay immutable. Closing the row keeps the ledger's history legible.
- **Arrears are a property of a lease.** A landlord asking "which resident owes
  me" gets an answer scoped to the lease and its parties, not to one person.
- **Q17 is the confirming evidence, not the basis.** This decision was made on
  the schema's evidence. The legal reality is checked against the signed lease
  Sprint 001 collects, and this ADR is superseded if the two disagree.
