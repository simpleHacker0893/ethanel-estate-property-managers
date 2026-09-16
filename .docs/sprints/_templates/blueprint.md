# Sprint NNN Blueprint — {sprint name}

> Template. Copy into the sprint folder **in the week before the sprint starts**,
> not earlier. A blueprint written in week 1 for week 11 is fiction — see
> `../README.md`.
>
> This file exists so the Builder makes **no product decisions**. If a section
> below cannot be filled without inventing a business fact, that fact belongs in
> `../../QUESTIONS.md` and this sprint may not start on it.

## Objective

One sentence. What is true at the end of the week that is not true now.

## Files to review first

- `../../AGENTS.md`
- `../../STATE.md`, `../../DECISIONS.md`, `../../DOMAIN.md`
- `../../SERVICE-TOPOLOGY.md`
- `./requirements.md`, `./acceptance.md`
- {the specific ARCHITECTURE or PRD sections that already answer part of this}

## Knowledge graph queries to run before writing code

```bash
graphify query "what already exists for {the thing this sprint touches}?"
graphify affected "{shared symbol}" --depth 3
```

Anything touching `packages/chassis`, `charts/service` or `services/money-svc`
gets its blast radius pasted into the ticket before the first edit.

## Service boundaries touched

| Service | Schema | Change |
|---|---|---|
| | | |

## Schema changes

Per service. Remember: **no cross-schema joins or foreign keys** (D-11). A
reference across a boundary is an id validated through the owning service's
contract. Every tenant-scoped table ships with its RLS policy in the same
migration, or CI rejects it.

## API contracts added

Zod schemas in `packages/contracts`, OpenAPI emitted by the chassis.

## Jobs

`pg-boss` queues, idempotency keys, retry and resume behaviour. Every job is safe
to run twice.

## UI surfaces

Routes, roles that can reach them, and the stated KB budget per screen where the
caretaker or resident is the user.

## Vertical slices

Break the work into tracer bullets. Each one is schema + service + API + UI +
tests **in one ticket**, demoable on its own, sized to one fresh context window.

1.
2.

Prefactoring, if any, is its own ticket and is sequenced first.

## TDD seams

Where red-before-green is mandatory this sprint, and the specific test that would
catch the failure mode nobody expects.

## Out of scope

Explicit. What a reasonable Builder might otherwise pull in.

## Risks this sprint could realise

Cross-reference `../../RISKS.md` and name the tripwire.
