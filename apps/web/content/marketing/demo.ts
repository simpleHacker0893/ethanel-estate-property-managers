import type { Cta } from './types'

/**
 * Copy for `/demo` and `/demo/thanks`.
 *
 * Five fields is the whole design constraint. Everything else an agency owner
 * could tell us is collected on the call, because this form's job is to survive
 * a moment of interest on a handset — not to qualify a lead.
 */

export interface DemoFieldCopy {
  label: string
  /** Shown under the label, before any error. Never only a placeholder. */
  hint?: string
  placeholder?: string
}

export interface DemoContent {
  meta: { title: string; description: string }
  h1: string
  lede: string
  /** Beside the button, where the hesitation actually happens. */
  trust: string[]
  fields: {
    name: DemoFieldCopy
    agencyName: DemoFieldCopy
    whatsapp: DemoFieldCopy
    unitsUnderManagement: DemoFieldCopy
    currentSystem: DemoFieldCopy
    email: DemoFieldCopy
  }
  unitsOptions: { value: string; label: string }[]
  systemOptions: { value: string; label: string }[]
  submitLabel: string
  submittingLabel: string
  rateLimited: string
  errorSummaryTitle: string
  honeypotLabel: string
  privacyLinkLabel: string
}

export const demo: DemoContent = {
  meta: {
    title: 'Request a demo',
    description:
      'Five fields and a WhatsApp number. We will walk you through rent collection, reconciliation and landlord statements on your own numbers.',
  },
  h1: 'See it run on your own numbers',
  lede: 'Five fields. We reply on WhatsApp, because that is where you actually answer.',
  trust: [
    'No card, no contract, no obligation.',
    'We never hold your rent — it settles to your own client account.',
    'Your details are used to arrange the demo and nothing else.',
  ],
  fields: {
    name: { label: 'Your name', placeholder: 'Wanjiru Kamau' },
    agencyName: { label: 'Agency name', placeholder: 'Riverside Property Managers' },
    whatsapp: {
      label: 'WhatsApp number',
      hint: 'Kenyan mobile, for example +254 712 345 678.',
      placeholder: '+254 712 345 678',
    },
    unitsUnderManagement: { label: 'Units under management' },
    currentSystem: { label: 'What you use today' },
    email: {
      label: 'Email',
      // Email is optional on purpose: in this market WhatsApp is the channel,
      // and a required email field costs more leads than the address is worth.
      hint: 'Optional. Add it only if you would rather we sent documents by email.',
      placeholder: 'you@agency.co.ke',
    },
  },
  unitsOptions: [
    { value: 'under_50', label: 'Under 50' },
    { value: '50_150', label: '50 to 150' },
    { value: '150_500', label: '150 to 500' },
    { value: '500_plus', label: 'More than 500' },
  ],
  systemOptions: [
    { value: 'spreadsheet', label: 'Spreadsheets' },
    { value: 'other_system', label: 'Another software system' },
    { value: 'paper', label: 'Paper books' },
    { value: 'mix', label: 'A mix of these' },
  ],
  submitLabel: 'Request a demo',
  submittingLabel: 'Sending…',
  rateLimited:
    'That is several requests from this connection in a short time. Give it an hour, or write to us directly.',
  errorSummaryTitle: 'Check these before sending',
  honeypotLabel: 'Company website',
  privacyLinkLabel: 'How we handle your details',
}

export interface ThanksContent {
  meta: { title: string; description: string }
  h1: string
  lede: string
  steps: { title: string; body: string }[]
  /** The walkthrough film slot — present and empty. DEBT-10. */
  walkthroughNote: string
  next: Cta[]
}

export const thanks: ThanksContent = {
  meta: {
    title: 'Thanks — what happens next',
    description: 'Your demo request has reached us. Here is what happens next.',
  },
  h1: 'Got it',
  // What happens next and when. No invented SLA: we say what we will do, not
  // how fast, because nobody has committed to a response time yet.
  lede: 'Your request has reached us. We will message you on the WhatsApp number you gave.',
  steps: [
    {
      title: 'We read it properly',
      body: 'Someone reads your answers before replying, so the call starts from how your agency already works rather than from a script.',
    },
    {
      title: 'We message you on WhatsApp',
      body: 'A short message to agree a time. If you added an email address we will copy it there too.',
    },
    {
      title: 'The demo runs on your own numbers',
      body: 'Bring a month of rent and a few units. Watching reconciliation run against payments you recognise is worth more than a tour of the screens.',
    },
  ],
  walkthroughNote:
    'A short walkthrough film goes here once it exists. There is no film yet, and a stock loop in its place would tell you nothing.',
  next: [
    { label: 'How reconciliation runs', href: '/features/reconciliation' },
    { label: 'Security and reliability', href: '/security' },
    { label: 'What it costs', href: '/pricing' },
  ],
}
