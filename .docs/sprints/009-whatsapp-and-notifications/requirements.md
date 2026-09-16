# Sprint 009 · WhatsApp and notifications

**Phase 2 — Operations · Week 9 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Make WhatsApp the working channel it already is for these firms, without two people replying to the same customer.

## Services touched

- messaging-svc
- messaging-worker

## In scope

- WhatsApp Business API: template catalogue and approval tracking, the 24-hour window, inbound routing to a conversation.
- Inbox: one assignee per conversation, everyone else read-only (D-43), claim and release. Polling every 20-60 seconds (D-09).
- Notification engine: per event group, per channel preferences, with financial notices mandatory and not disableable (D-48). WhatsApp primary, SMS fallback, email for documents.
- The pilot's actual notifications: rent due, rent received with receipt, arrears nudge, repair status, lease expiry.

## Out of scope

- Chatbot or automated replies.
- Slack or any other channel - excluded by decision.

## Depends on

- 007 (payment events to notify on), 008 (repair events), 006 (documents to attach)

## Readiness items paid

- D-43
- D-48

## Blocked by

- WhatsApp business verification and template approval must be complete - started Sprint 001, templates submitted Sprint 006

## Exit criteria

- A resident pays and receives a WhatsApp receipt generated from the ledger entry, not from the callback.
- Two staff cannot reply to the same conversation; the second sees it read-only.
- A resident can turn off marketing notifications and cannot turn off a rent invoice.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
