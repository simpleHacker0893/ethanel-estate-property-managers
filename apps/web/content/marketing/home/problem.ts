import type { ProblemContent } from '../types'

/**
 * S4 — the problem, in the customer's words.
 *
 * Five things an agency owner says out loud about the week rent is due. They
 * are written as complaints about the work, not as set-ups for a sales line,
 * because a reader who has been sold property software before recognises a
 * straw man immediately.
 *
 * Each pain is answered with a **capability**, never with a result. "Payments
 * reconcile against the unit's account reference first" is something the
 * platform does; "agencies save a day a month" is a number nobody has measured
 * and a business fact this site is not allowed to invent (D-68). There is
 * deliberately no figure anywhere in this module for how long any of this takes
 * an agency today — the pack does not contain one, so neither does the page.
 *
 * The answers here are a summary. The reconciliation order they refer to is
 * written out in full in `how-it-works.ts`, where it is data rather than prose.
 */

type Pain = ProblemContent['pains'][number]

const painsAndResponses: readonly (readonly [string, string])[] = [
  [
    'A resident pays the right amount to the right number and leaves the account reference off the message, so now I am guessing which unit it belongs to.',
    'Reconciliation reads the account reference on the unit first, then a payer phone already verified on the lease, then an exact amount against the open invoices.',
  ],
  [
    'Ask me who has paid this morning and I cannot tell you until I open the spreadsheet and find out whether anyone updated it.',
    'Each payment posts to the double-entry ledger as it arrives, so who has paid is a question the ledger answers rather than a workbook somebody has to keep current.',
  ],
  [
    'The landlord rings in the middle of the month to ask where the money is, and I have to go away and work it out before I can give an answer.',
    'Landlord figures are read live from the ledger with a last-updated stamp, never from a cached summary, and the same figures render on the statement.',
  ],
  [
    'At month end it is me and the M-Pesa statement, reconciling line by line, and the ones I cannot place I leave until later.',
    'A payment the engine cannot attribute still posts to the ledger, into suspense, and waits in one manual match queue instead of in a statement export.',
  ],
  [
    'A repair arrives as a phone call to my mobile, and by the end of the week nobody can tell me whether anyone actually went out to it.',
    'A repair request is a record the moment it is raised, and the work order dispatched against it carries its assignee and its status through to closure.',
  ],
]

const pains: Pain[] = painsAndResponses.map(([symptom, response]) => ({ symptom, response }))

export const problem: ProblemContent = {
  heading: {
    eyebrow: 'The problem',
    title: 'Collecting the rent was never the hard part',
    lede: 'Money arrives over M-Pesa all month, in the wrong amounts, against the wrong references, from numbers nobody recognises. Everything after that is the job.',
  },
  pains,
}
