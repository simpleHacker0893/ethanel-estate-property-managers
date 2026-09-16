import type { StandardPageContent } from '../types'

/**
 * `/status` — the second `v1.1-stub`, and the page with the strongest pull
 * towards fiction on the whole site.
 *
 * A status page has a conventional shape: a row of green ticks, an uptime
 * figure for the last ninety days, and a short incident history. Every part of
 * that shape can be produced from nothing, and all of it would be false here.
 * No infrastructure is deployed, no service is serving a request, nothing has
 * been measured and nothing has failed. An uptime figure computed over a period
 * in which the system did not exist is not a flattering number, it is a
 * fabricated one — and a green tick beside a component that has never started is
 * the single clearest signal that a status page is decorative.
 *
 * So this page reports the only thing there is to report, which is that there is
 * nothing to report, and then does the useful work open to it: it explains
 * what will be reported once there is a system, which components will be named,
 * where the signal will come from, and how an incident will reach this page. An
 * agency owner evaluating a supplier can judge that in advance. They cannot
 * judge a wall of ticks.
 *
 * The components listed are the real deployment story — the twelve logical
 * services of the topology, grouped the way a reader cares about them — and the
 * monitoring named is the monitoring the roadmap actually schedules: uptime
 * checks and alert routing in Sprint 004, service-level alerting and the
 * runbooks in Sprint 014. Writing those as commitments with a sprint attached is
 * the only honest tense here.
 *
 * What this page refuses to say: any uptime figure, any incident, any
 * maintenance window, any response or resolution target, and any component
 * state at all. It also carries no figures of its own — the four design targets
 * are stated once, with their bounds, on the Security page.
 */
export const status: StandardPageContent = {
  slug: '/status',

  meta: {
    title: 'Service status',
    description:
      'What this page will report once Ethanel is deployed and serving agencies, and why there is honestly nothing to report on it today.',
  },

  hero: {
    eyebrow: 'Company',
    h1: 'There is nothing to report yet',
    lede: 'Nothing is deployed, so nothing has an uptime record and nothing has failed. This page explains what it will report once there is a system behind it, and refuses to show a wall of green ticks in the meantime.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'The honest state',
        title: 'No system, no history, no numbers',
      },
      paragraphs: [
        'Ethanel is in build. No service is deployed, no agency is using it, and no rent has moved through it. There is therefore no measurement period, no incident to describe and no maintenance that has been carried out.',
        'That makes the conventional status page impossible to produce truthfully. An uptime figure has to be measured over a window, and a window in which nothing was running produces a number that describes nothing. An incident history with no entries reads as a clean record when it is really an empty one. Both would be inventions, and a supplier that invents its own reliability record is telling you something useful about how it will behave during an outage.',
        'What follows is a description of the page this will become. It is written now so that you can judge the reporting commitment before you depend on it, which is the only part of a status page that is worth anything before the first failure.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The plan',
        title: 'What this page will report',
        lede: 'Grouped the way an agency experiences a failure, not the way the system is deployed.',
      },
      items: [
        {
          title: 'The site and the public interface',
          body: 'Whether the web application and the gateway are serving requests, since the gateway is what every integration and every inbound callback arrives through. A failure here is the one you notice first.',
        },
        {
          title: 'Payment callbacks',
          body: 'Whether the payments service is accepting, persisting and acknowledging M-Pesa callbacks, and whether any backlog is being drained. This is the component whose failure costs money rather than convenience, so it is reported on its own rather than folded into an overall state.',
        },
        {
          title: 'Reconciliation and the match queue',
          body: 'Whether payments are being attributed, and how far behind the queue is if they are not. An unattributed payment is already posted to suspense and safely on the record, which is what makes a delay here a delay rather than a loss — and this page will say which of the two is happening.',
        },
        {
          title: 'The ledger, invoicing and rent runs',
          body: 'Whether the money service is posting entries and whether a scheduled rent run has completed. Rent day is the day this matters, and a status page that is silent on the busiest day of the month is not a status page.',
        },
        {
          title: 'Messaging',
          body: 'Whether WhatsApp delivery and the SMS fallback are getting through, since a notification nobody received looks identical to one that was never sent.',
        },
        {
          title: 'Incident history that stays put',
          body: 'Each incident with when it started, what was affected, what was done and when it ended. Entries are added and corrected in the open; none is quietly deleted once it is embarrassing.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'Commitments with dates',
        title: 'How an incident will reach this page',
        lede: 'Each of these is scheduled work, written in the tense of something that has not happened yet, because none of it has.',
      },
      steps: [
        {
          title: 'Monitoring and uptime checks go in',
          body: 'Error tracking, container metrics and external uptime checks, with alerts routed to a phone rather than to an inbox nobody is watching at the weekend. The targets a service is held to are defined in the same sprint.',
          source: 'Sprint 004',
        },
        {
          title: 'Alerting is wired to the signals that matter',
          body: 'Webhook failure rate, queue age, error rate and how much of the payment volume is being attributed without a human. These are the four that tell you something is wrong before an agency does.',
          source: 'Sprint 014',
        },
        {
          title: 'Every failure mode gets a runbook first',
          body: 'An M-Pesa outage, a callback backlog, a WhatsApp outage, a database restore and a credential leak, each written by causing the failure in staging and recording what was actually done about it.',
          source: 'Sprint 014',
        },
        {
          title: 'This page starts reporting',
          body: 'Component state, incident entries and planned maintenance, published from the same monitoring the alerts come from rather than updated by hand from a good mood.',
          source: 'Sprint 016',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'The rules this page will keep',
        title: 'What it will not do, once it has something to say',
        lede: 'Written down now, while there is no incident making it inconvenient.',
      },
      rows: [
        {
          label: 'No figure without its window',
          value:
            'Any reliability figure published here will carry the period it was measured over and what counted as an outage. A bare figure with neither is not a measurement, and the same rule governs every design target on the Security page.',
        },
        {
          label: 'No green tick during an outage',
          value:
            'Component state will be derived from monitoring rather than set by whoever is awake. A page that stays green while agencies cannot collect rent is worse than having no page.',
        },
        {
          label: 'No disappearing incidents',
          value:
            'An entry that turns out to be wrong is corrected in place with the correction visible, in the same way a wrong posting in the ledger is undone by a reversal rather than an edit.',
        },
        {
          label: 'No response-time promise it has not agreed',
          value:
            'Targets will appear here when they have been set and measured, not before. Until an agreement exists, the honest answer is that there is no committed target.',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Judge the plan before you need the page',
      lede: 'How a supplier intends to report failure is a fair question to ask in a demo, and a better one than asking after the first outage.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
