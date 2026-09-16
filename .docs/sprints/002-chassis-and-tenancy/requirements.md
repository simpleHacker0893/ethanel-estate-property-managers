# Sprint 002 · The chassis and tenancy

**Phase 0 — Platform · Week 2 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Make the marginal service nearly free, and make cross-organization leakage structurally impossible.

## Services touched

- packages/chassis
- charts/service
- identity-svc

## In scope

- packages/chassis: config loading, structured logging, OpenTelemetry, readiness and liveness probes, graceful shutdown, error envelope, zod->OpenAPI emission, internal JWT sign/verify, pg-boss wiring, Prisma 7 base client with the RLS transaction hook.
- charts/service Helm library chart: probes, CPU/memory requests and limits, PodDisruptionBudget, non-root with read-only root filesystem, default-deny NetworkPolicy with an explicit allow list. These five D-34 gates become structural — rows 1–5 of eight. Rows 6–8 are enforced elsewhere and cannot be rendered by a chart: image scanning is a CI step, graceful worker shutdown is a `packages/chassis` behaviour, per-namespace resource quotas are a namespace manifest (D-65, `READINESS.md` §1a). Four Deployments inherit it (web, gateway, worker, docs-worker) per D-54, and adding a fifth must stay a values file.
- The **ten** domain schemas and their per-schema roles created up front, one Prisma schema each, even though only identity has tables this week (D-11, D-54). The tenth is `reporting` (D-67, ADR-012) — decided early precisely so it is created with the others rather than retrofitted in Sprint 004. A service module loads its own client bound to its own role, so an in-process caller still cannot read across a boundary.
- Image vulnerability scanning in CI, blocking on high and critical.
- identity-svc for real: organizations mirrored from Clerk, users, memberships, roles, permission checks, immutable audit log, Clerk webhooks. Google sign-in end to end.
- The tenancy pattern proven end to end: organization_id column + RLS policy keyed on current_setting('app.organization_id') + the chassis hook that sets it per transaction.
- The cross-organization test harness (E3): for every table in a service's manifest, generate assertions that organization A cannot read, write or enumerate organization B's rows. A table without a policy fails CI.

## Out of scope

- Property, money or messaging domain models.
- Any grid or reporting work.

## Depends on

- 001 (cluster, pipeline, region)

## Readiness items paid

- D-34 (rows 1–7 of eight; row 8, namespace resource quotas, is paid with the namespaces — see `READINESS.md` §1a)
- E3 (harness)

## Blocked by

- _none_

## Exit criteria

- Scaffolding a brand new service - schema, role, contract, job handlers, loaded by an existing Deployment - and getting it to staging takes under one day. If it does not, this sprint is not done - see RISKS R-01 tripwire.
- Moving a service into its own Deployment has been done once, to prove D-54's split path is a values.yaml and a connection string rather than a claim.
- A user signs in with Google, lands in their organization, and is provably unable to reach another organization's data via API or direct query.
- A pull request adding a tenant-scoped table without an RLS policy fails CI.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
