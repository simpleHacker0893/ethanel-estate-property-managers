# Sprint 001 · Ground truth and the pipeline

**Phase 0 — Platform · Week 1 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Decide the three remaining hard-to-reverse unknowns with measurements, and make a commit on main reach the staging cluster with no human step.

## Services touched

- web (skeleton)
- identity-svc (hello-world)
- infrastructure

## In scope

- Measure Nairobi -> Neon p50/p95 across af-south-1, eu-west-1, eu-central-1 on a real Safaricom mobile connection. Decide the region. Write ADR-002.
- Collect real sample files from design partners (the partner sample files): rent roll spreadsheet, landlord statement, M-Pesa/bank statement export, a signed lease. Anonymise and commit as fixtures.
- Write the caretaker device and data constraints document from the field observation: device classes, screen sizes, data cost per MB, usage posture. This is the spec Sprint 008's UI is graded against.
- Monorepo: pnpm + Turborepo, TypeScript strict, ESLint, Prettier, Husky, Renovate on a weekly schedule (E11).
- Commit the .docs/ pack (D-49). Create the GitHub Project and issue templates (D-53). Configure trunk-based branch protection with required PR checks (D-52).
- OpenTofu (D-32): VPC, EKS Auto Mode cluster, ECR, Neon project, AWS Secrets Manager, External Secrets Operator, Cloudflare zone.
- GitHub Actions -> Helm -> staging namespace; production namespace created with a manual approval gate (D-31).
- Start WhatsApp Business API business verification (see RISKS R-05 - it has a multi-week tail).

## Out of scope

- Any domain model.
- Any UI beyond a deployable shell.
- The service chassis - that is Sprint 002 and deserves a full week.

## Depends on

- None. This is the first sprint.

## Readiness items paid

- D-32
- D-38
- E11
- E17 (folder + first ADRs)
- E18
- D-49
- D-52
- D-53

## Blocked by

- _none_

## Exit criteria

- A commit on main is running in the staging namespace with no manual step.
- The Neon region is decided from measured numbers and recorded in ADR-002.
- Partner sample files are committed as anonymised fixtures.
- The caretaker constraints document exists and names specific devices.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
