# Why `typescript` is capped below 6.1.0

`renovate.json` blocks TypeScript 7 on purpose, and it is worth knowing why
before someone removes the rule.

`typescript-eslint@8` declares `typescript: ">=4.8.4 <6.1.0"`. TypeScript's
`latest` tag is already 7.x (the native compiler). typescript-eslint is what
provides `@typescript-eslint/no-explicit-any`, and
**`VALIDATION.md` §2 makes "no `any` in a public interface" a permanent merge
gate from Sprint 001.**

The failure mode is the quiet one. Installing `typescript@7` does not break the
build and does not fail CI loudly: `strict-peer-dependencies=true` in `.npmrc`
will catch it at install time, but if that were ever relaxed, the type-aware
lint rules would stop resolving and the gate would report green while checking
nothing. A gate that passes without checking is worse than no gate.

So: TypeScript stays on 6.x until typescript-eslint supports 7, at which point
this cap and this file both go.
