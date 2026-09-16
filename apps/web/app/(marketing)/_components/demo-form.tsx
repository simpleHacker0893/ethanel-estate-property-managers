'use client'

import Link from 'next/link'
import { useActionState, useId, useState } from 'react'
import { buttonClassName, cn, ctaMarker } from '@ethanel/ui'
import { demoRequestSchema } from '@ethanel/contracts'

import type { DemoContent } from '../../../content/marketing/demo'
import type { SubmitResult } from '../../../lib/demo-submission'

/**
 * The demo form.
 *
 * Validation runs twice, from the same zod schema in `packages/contracts`
 * (D-22): on blur in the browser so a mistake is caught while the field is
 * still in focus, and again in the Server Action, which is the one that counts.
 * Sharing the schema is what stops the two drifting.
 *
 * **Never a red border without a text message.** Every error state renders
 * prose next to the field, wired with `aria-describedby` and
 * `aria-invalid`, so the message reaches a screen reader as well as an eye.
 *
 * The honeypot is rendered but taken off screen and out of the accessibility
 * tree, never labelled visibly, and excluded from tab order. A human never
 * meets it.
 */

type FieldName =
  'name' | 'agencyName' | 'whatsapp' | 'unitsUnderManagement' | 'currentSystem' | 'email'

/** `| undefined` is explicit because the repo runs `exactOptionalPropertyTypes`. */
type FieldErrors = Partial<Record<FieldName, string | undefined>>

const TEXT_FIELDS = ['name', 'agencyName', 'whatsapp', 'email'] as const

/**
 * The Server Action arrives as a prop from the page rather than being imported
 * here. That keeps this component testable and, more to the point, keeps the
 * action's module out of the client graph entirely.
 */
export type RequestDemoAction = (
  previous: SubmitResult | null,
  formData: FormData,
) => Promise<SubmitResult>

export function DemoForm({ content, action }: { content: DemoContent; action: RequestDemoAction }) {
  const [state, formAction, pending] = useActionState<SubmitResult | null, FormData>(action, null)

  const [clientErrors, setClientErrors] = useState<FieldErrors>({})
  const formId = useId()

  const serverErrors = state?.status === 'invalid' ? state.fieldErrors : {}
  const errorFor = (field: FieldName): string | undefined =>
    clientErrors[field] ?? serverErrors[field]

  /**
   * Validates one field against the shared schema by parsing a whole object and
   * keeping only this field's issue. Cheaper than maintaining a second
   * per-field schema, and it cannot disagree with the server.
   */
  function validateField(field: FieldName, value: string) {
    if (field === 'email' && value.trim() === '') {
      setClientErrors((previous) => ({ ...previous, email: undefined }))
      return
    }
    const result = demoRequestSchema.safeParse({ [field]: value })
    const issue = result.success
      ? undefined
      : result.error.issues.find((i) => i.path[0] === field)?.message
    setClientErrors((previous) => ({ ...previous, [field]: issue }))
  }

  const fieldIds = (field: FieldName) => ({
    id: `${formId}-${field}`,
    hintId: `${formId}-${field}-hint`,
    errorId: `${formId}-${field}-error`,
  })

  return (
    <form action={formAction} noValidate className="mt-8 grid gap-5">
      {state?.status === 'rate-limited' ? (
        <p
          role="alert"
          className="border-line-control text-body-sm text-ink rounded-md border px-4 py-3"
        >
          {content.rateLimited}
        </p>
      ) : null}

      {TEXT_FIELDS.map((field) => {
        const copy = content.fields[field]
        const { id, hintId, errorId } = fieldIds(field)
        const error = errorFor(field)
        return (
          <div key={field}>
            <label htmlFor={id} className="text-body-sm text-ink font-semibold">
              {copy.label}
            </label>
            {copy.hint ? (
              <p id={hintId} className="text-caption text-ink-muted mt-0.5">
                {copy.hint}
              </p>
            ) : null}
            <input
              id={id}
              name={field}
              type={field === 'email' ? 'email' : field === 'whatsapp' ? 'tel' : 'text'}
              inputMode={field === 'whatsapp' ? 'tel' : undefined}
              autoComplete={
                field === 'name'
                  ? 'name'
                  : field === 'agencyName'
                    ? 'organization'
                    : field === 'whatsapp'
                      ? 'tel'
                      : 'email'
              }
              placeholder={copy.placeholder}
              aria-invalid={error ? true : undefined}
              aria-describedby={cn(copy.hint && hintId, error && errorId) || undefined}
              onBlur={(event) => {
                validateField(field, event.currentTarget.value)
              }}
              className={cn(
                'bg-surface text-body placeholder:text-ink-quiet mt-1.5 min-h-[var(--spacing-touch)] w-full rounded-md border px-3',
                // The border is a control boundary, so it clears 3:1 in both
                // states. The error state is never colour alone -- the message
                // below carries the meaning.
                error ? 'border-accent-text border-2' : 'border-line-control',
              )}
            />
            {error ? (
              <p id={errorId} className="text-body-sm text-accent-text mt-1.5 font-semibold">
                {error}
              </p>
            ) : null}
          </div>
        )
      })}

      {(
        [
          ['unitsUnderManagement', content.unitsOptions],
          ['currentSystem', content.systemOptions],
        ] as const
      ).map(([field, options]) => {
        const copy = content.fields[field]
        const { id, errorId } = fieldIds(field)
        const error = errorFor(field)
        return (
          <div key={field}>
            <label htmlFor={id} className="text-body-sm text-ink font-semibold">
              {copy.label}
            </label>
            <select
              id={id}
              name={field}
              defaultValue=""
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              onBlur={(event) => {
                validateField(field, event.currentTarget.value)
              }}
              className={cn(
                'bg-surface text-body mt-1.5 min-h-[var(--spacing-touch)] w-full rounded-md border px-3',
                error ? 'border-accent-text border-2' : 'border-line-control',
              )}
            >
              <option value="" disabled>
                {copy.label}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error ? (
              <p id={errorId} className="text-body-sm text-accent-text mt-1.5 font-semibold">
                {error}
              </p>
            ) : null}
          </div>
        )
      })}

      {/*
        The honeypot. Off screen, out of the accessibility tree, out of tab
        order, and never labelled where a person can see it. It lives in the
        contract rather than only here so the server-side check cannot be
        forgotten.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company-website`}>{content.honeypotLabel}</label>
        <input
          id={`${formId}-company-website`}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/*
        Trust elements sit beside the button rather than at the top of the page,
        because that is where the hesitation actually happens -- with the cursor
        over the button, not while reading the heading.
      */}
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className={buttonClassName('primary', 'lg')}
          {...ctaMarker('primary')}
        >
          {pending ? content.submittingLabel : content.submitLabel}
        </button>
        <ul className="text-caption text-ink-muted max-w-xs space-y-1">
          {content.trust.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <p className="text-caption text-ink-quiet">
        <Link href="/legal/privacy" className="text-accent-text font-semibold underline">
          {content.privacyLinkLabel}
        </Link>
      </p>
    </form>
  )
}
