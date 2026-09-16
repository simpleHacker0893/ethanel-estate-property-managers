# RISKS

Ranked by how much of the plan they take with them. Reviewed at the end of every
sprint; a risk that has not moved in four sprints is either mitigated or real.

---

### R-01 · Twelve service boundaries, one person, sixteen weeks
**Likelihood: medium (was high) · Impact: the schedule**

The three answers in play — twelve service boundaries (D-67 added
`reporting-svc` as the twelfth), sixteen sprints, and every
readiness gate paid — are individually reasonable and jointly the tightest
combination available. Nothing here is unachievable; the margin is thin.

**D-54 took the worst of this risk off the table** by hosting the eleven services
in four Deployments instead of fifteen. That removes eleven pod floors, eleven
rollout steps, eleven PodDisruptionBudgets and eleven places for a partial deploy
to hide, without touching the boundaries themselves. The likelihood drops from
high to medium; it does not drop to low, because sixteen weeks of solo delivery
against a paid-in-full readiness list is still tight.

*Mitigation.* Sprint 002 exists to make the marginal service nearly free: one
chassis package, one Helm library chart. **The tripwire: if scaffolding a new
service — schema, role, contract, handlers — takes more than one day after Sprint
002, stop feature work and fix the chassis.** A second tripwire at the end of
Sprint 004: if Phase 0 has not exited by then, merge `docs-svc` and `billing-svc`
into their nearest neighbours as *boundaries* too, not just as pods, and revisit
after go-live.

*Watch the opposite failure now.* With services sharing a pod, the discipline
that used to be enforced by the network has to be enforced by the schema roles
and by review. The tripwire on that side: **any pull request that reaches across
a schema line, or that works around a contract because the callee happens to be
in-process, is a chassis defect** — fix it in the chassis so the next person
cannot do it either. If that happens twice, split the service that keeps being
reached into.

---

### R-02 · The reconciliation rate lands below 95%
**Likelihood: medium · Impact: go-live date**

D-39 is a hard gate and the thing it measures depends on how residents actually
type their account numbers, which no amount of engineering controls.

*Mitigation.* Measure in Sprint 007, nine weeks before the gate, against the
partners' real M-Pesa statements from Sprint 001. Publish whatever number comes
out. If it is short, the causes are known by week 7 and Sprint 015 has room to
close the gap — typically by tightening account number issuance and the resident
payment instructions rather than by cleverer matching.

---

### R-03 · Daraja integration behaves differently in production than in sandbox
**Likelihood: medium-high · Impact: Sprint 016**

Callback shapes, retry behaviour, timeout semantics and paybill provisioning all
differ between the Daraja sandbox and live. Production credentials arrive in
Sprint 016, which is late to discover a surprise.

*Mitigation.* Acquire a live paybill and run low-value real transactions through
`staging` from Sprint 007, not sandbox-only. The `gateway` inbox design means a
malformed or unexpected callback is stored, not dropped, so a surprise is
debuggable after the fact rather than invisible.

---

### R-04 · Partner sample files never arrive
**Likelihood: medium · Impact: sprints 004, 006, 007, 015**

Four sprints are graded against data collected in Sprint 001. Design partners
are busy and "I'll send it next week" is the normal outcome.

*Mitigation.* Collect them in person in week 1. Do not accept a description of a
spreadsheet in place of the spreadsheet. If by the end of Sprint 002 they have
not arrived, that is a schedule risk to escalate to the partner, not a reason to
invent a format — an invented import format is a Sprint 015 failure that looks
like a Sprint 003 success.

---

### R-05 · WhatsApp Business API approval and template review
**Likelihood: medium · Impact: Sprint 009**

Business verification and per-template approval are Meta's timeline, not yours,
and every notification in D-48 is a template.

*Mitigation.* Start business verification in Sprint 001 — it costs an hour and
it has a multi-week tail. Draft and submit templates in Sprint 006, three
sprints before they are needed. SMS fallback exists partly for this.

---

### R-06 · Neon at an African latency
**Likelihood: low-medium · Impact: ADR-002, possibly the database choice**

If no candidate region gives acceptable p95 from Nairobi, the serverless Postgres
choice itself comes into question, and it is underneath everything.

*Mitigation.* Measure in Sprint 001, before a line of domain code. `web` and the
services sit in the same region as the database, so the latency that matters is
Nairobi → `web`, not Nairobi → Postgres — Cloudflare absorbs a good deal of it.
If af-south-1 is not viable on Neon, the fallback is RDS in af-south-1, which
costs Prisma nothing but costs the branching workflow.

---

### R-07 · The ledger model meets a real accountant too late
**Likelihood: medium · Impact: rework in sprints 006–010**

Sprint 005 designs the chart of accounts; the first accountant sees it in Sprint
010. Five sprints of invoicing, payments and statements would be built on top of
a wrong model.

*Mitigation.* Put the Sprint 005 chart of accounts and three worked journal
examples — a rent payment, a deposit refund, a landlord remittance with
commission — in front of a partner accountant during Sprint 005 itself. One hour,
on paper. This is the cheapest review in the whole plan.

---

### R-08 · Solo bus factor
**Likelihood: certain · Impact: everything**

One person holds every decision, credential and piece of context.

*Mitigation.* This is what `.docs/` is for, and it is why E17's ADRs are a
go-live gate rather than a nicety. Credentials in AWS Secrets Manager with a
break-glass procedure. The Sprint 014 runbooks are written so that someone else
could follow them.

---

### R-09 · Kenya Data Protection Act obligations discovered late
**Likelihood: low · Impact: Sprint 013**

E12 tooling is scoped for Sprint 013 on an assumed reading of the Act. Registration
as a data controller, and the retention rules that conflict with deletion requests
on ledger data, are legal questions, not engineering ones.

*Mitigation.* Get the controller registration question answered by week 4, not
week 13 — see Q6.
