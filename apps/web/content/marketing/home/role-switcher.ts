import { SOLUTION_SLUGS } from '../routes'
import type { RoleSwitcherContent } from '../types'

/**
 * S10 — the role switcher, as typed data.
 *
 * Four roles, and they are the four solutions pages rather than four invented
 * personas: destructuring `SOLUTION_SLUGS` means a slug rename in the route
 * manifest breaks this file at compile time instead of silently producing a
 * `?role=` value that matches nothing and a tab that links nowhere.
 *
 * Every point names the service that implements it (D-67) and states its real
 * availability. Per the track brief §7, nothing here is `available`: no sprint
 * has shipped, so the honest values are `sprint` and `may-not-ship`. A point
 * marked `available` on this page would be an invented business fact, which is
 * the single most expensive thing this content module could contain.
 *
 * Two of the four publishable numbers appear, each carrying the bound that
 * makes it true — D-40 on the agency tab and D-45 on the landlord tab. There is
 * no third number here and no unbounded one.
 */

const [AGENCIES, LANDLORDS, LAND_SELLERS, RESIDENTS] = SOLUTION_SLUGS

export const roleSwitcher: RoleSwitcherContent = {
  heading: {
    eyebrow: 'Who is reading this',
    title: 'Pick the role you are reading this as',
    lede: 'The tab you choose stays in the address bar, so this page can be sent to your accountant already open at the part that concerns them.',
  },
  roles: [
    {
      id: AGENCIES,
      label: 'Letting agencies',
      lede: 'You hold the management agreement, you carry the arrears conversation, and you answer to the landlord at month end. These are the parts of the platform that do that work, and when each one is scheduled.',
      points: [
        {
          label: 'Rent runs and invoicing',
          service: 'money',
          availability: 'sprint',
          sprint: 'Sprint 005',
          description:
            '500 units invoiced in under 2 minutes, idempotent and resumable — a rent run is safe to execute twice.',
        },
        {
          label: 'M-Pesa reconciliation and the manual match queue',
          service: 'payments',
          availability: 'sprint',
          sprint: 'Sprint 007',
          description:
            'Account reference, then payer phone on file, then exact amount, then a review queue.',
        },
        {
          label: 'Arrears and credit control',
          service: 'money',
          availability: 'sprint',
          sprint: 'Sprint 006',
          description:
            'Oldest invoice first. An overpayment becomes a credit, and every posting is immutable.',
        },
        {
          label: 'Landlord statements and remittance',
          service: 'money',
          availability: 'sprint',
          sprint: 'Sprint 006',
          description:
            'Agency commission income and VAT payable posted as entries, not typed into a column.',
        },
        {
          label: 'Repair requests and work orders',
          service: 'ops',
          availability: 'sprint',
          sprint: 'Sprint 008',
          description:
            'Triage, assignment and approval, with repairs expense posted when the work order closes.',
        },
        {
          label: 'Exports and saved views',
          service: 'reporting',
          availability: 'sprint',
          sprint: 'Sprint 004',
          description: 'Read models and exports, so month end can leave the platform as a file.',
        },
      ],
    },
    {
      id: LANDLORDS,
      label: 'Landlords',
      lede: 'You want to know what came in, what went out and what is still owed — read from the ledger, not from a summary somebody typed up on the last working day of the month.',
      points: [
        {
          label: 'Figures read live from the ledger',
          service: 'money',
          availability: 'sprint',
          sprint: 'Sprint 006',
          description: 'With a last-updated stamp on every figure. Never a cached summary.',
        },
        {
          label: 'The landlord portal',
          service: 'web',
          availability: 'sprint',
          sprint: 'Sprint 010',
          description:
            'Statements, remittance history and every property under management, in one place.',
        },
        {
          label: 'Statements and remittance',
          service: 'money',
          availability: 'sprint',
          sprint: 'Sprint 006',
          description:
            'Commission and VAT shown as postings you can trace back to the entry that made them.',
        },
        {
          label: 'Arrears, as they actually stand',
          service: 'money',
          availability: 'sprint',
          sprint: 'Sprint 006',
          description:
            'Oldest invoice first, and deposits held sit as a liability rather than as income.',
        },
        {
          label: 'Repair spend against the property',
          service: 'ops',
          availability: 'sprint',
          sprint: 'Sprint 008',
          description: 'Repairs expense posted when the work order closes, with the vendor named.',
        },
        {
          label: 'Notices that cannot be switched off',
          service: 'messaging',
          availability: 'sprint',
          sprint: 'Sprint 009',
          description:
            'Financial notices are mandatory. Everything else is per event group and per channel.',
        },
      ],
    },
    {
      id: LAND_SELLERS,
      label: 'Land and plot sellers',
      lede: 'Read this tab differently from the other three. Plot inventory, subdivisions and instalment sales are Sprint 012 work, and Sprint 012 is the release our plan absorbs slippage into. It may not ship at all, so nothing on this tab is a commitment.',
      points: [
        {
          label: 'Plot inventory and subdivisions',
          service: 'listing',
          availability: 'may-not-ship',
          sprint: 'Sprint 012',
          description:
            'A parent parcel, the plots it is divided into, and the state each plot is in.',
        },
        {
          label: 'Instalment sale schedules',
          service: 'money',
          availability: 'may-not-ship',
          sprint: 'Sprint 012',
          description:
            'A plot paid down over time. Plot instalments are excluded from the auto-match denominator.',
        },
        {
          label: 'Plot listings and viewings',
          service: 'listing',
          availability: 'may-not-ship',
          sprint: 'Sprint 012',
          description: 'A plot listed on the public site, and a viewing booked against it.',
        },
        {
          label: 'Buyer receipts and statements',
          service: 'docs',
          availability: 'may-not-ship',
          sprint: 'Sprint 012',
          description: 'Rendered from the ledger, held in KES, with every posting immutable.',
        },
      ],
    },
    {
      id: RESIDENTS,
      label: 'Residents and caretakers',
      lede: 'A resident wants a receipt and a way to report a leak. A caretaker wants a task list that loads on a weak connection. Neither of them is asked to learn the accounting underneath.',
      points: [
        {
          label: 'Pay over M-Pesa and get a receipt',
          service: 'payments',
          availability: 'sprint',
          sprint: 'Sprint 007',
          description:
            'A payment that cannot be matched still posts to suspense, so it is never lost.',
        },
        {
          label: 'The resident portal',
          service: 'web',
          availability: 'sprint',
          sprint: 'Sprint 010',
          description: 'Balance, invoices and receipts for the lease, with nothing in between.',
        },
        {
          label: 'Raise a repair request',
          service: 'ops',
          availability: 'sprint',
          sprint: 'Sprint 008',
          description:
            'New, triaged, assigned, in progress, awaiting your confirmation, then closed.',
        },
        {
          label: 'Caretaker tasks on a low-data screen',
          service: 'ops',
          availability: 'sprint',
          sprint: 'Sprint 008',
          description:
            'Online-only in the pilot, and built for a weak connection rather than an office desk.',
        },
        {
          label: 'WhatsApp first, SMS as fallback',
          service: 'messaging',
          availability: 'sprint',
          sprint: 'Sprint 009',
          description: 'One assignee per conversation; everyone else on the thread is read-only.',
        },
        {
          label: 'Lease documents and signature requests',
          service: 'docs',
          availability: 'sprint',
          sprint: 'Sprint 006',
          description: 'Leases, receipts and statements rendered as documents you can keep.',
        },
      ],
    },
  ],
}
