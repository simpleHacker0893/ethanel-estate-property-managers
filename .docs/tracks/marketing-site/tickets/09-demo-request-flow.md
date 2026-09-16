# 09: The demo request flow

**What to build:** An agency owner's moment of interest turns into a lead in under a minute on a
phone, and the click identifier that brought them survives all the way into the
record. The contracts and their tests already exist and are reused rather than
rewritten; what this ticket adds is the form, the write path and the seam that
keeps a sales lead out of somebody else's schema.

**Blocked by:** 01, 03

**Status:** ready-for-agent

- [ ] Five fields, on the page, no more. Email is optional; a Kenyan mobile number is required and normalised to E.164. **The existing request, submission and attribution contracts and their unit tests are reused, not rewritten.**
- [ ] Every invalid field shows a message in words beside it. A red border with no text fails the ticket.
- [ ] The honeypot is enforced server-side from the contract, and a per-IP rate limit applies.
- [ ] Advertising click identifiers and campaign parameters are captured **on first landing** into a first-party 90-day cookie and carried into the submitted record.
- [ ] **One outbound port**, and the Server Action calls nothing else:

      ```ts
      interface LeadSink {
        capture(lead: DemoSubmission): Promise<void>
      }
      ```

      The server-side conversion dispatch happens **inside** the implementation and is explicitly non-fatal, so a dead ad platform can never lose a lead. Operator-confirmed; see the blueprint's API contracts section.
- [ ] A conversion dispatch that throws **does not fail the capture** — asserted against a fake sink.
- [ ] The only implementation appends to a file and a structured log. **No schema is created and no existing service's table is used** — in particular not the marketplace `leads` table, which is a different concept (a sales lead has no listing and no organization). Recorded as DEBT-08 against Q22.
- [ ] End to end: land with a click identifier, navigate to the form, submit, and find that identifier in the captured record (acceptance row 8).
- [ ] The thanks page says what happens next and when.
- [ ] The accessibility gate passes on the form route, which is one of the four scanned (acceptance row 3).
