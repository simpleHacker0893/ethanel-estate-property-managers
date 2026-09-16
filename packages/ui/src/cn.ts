import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge has to be taught this project's type scale, and the failure it
 * causes otherwise is silent and dangerous.
 *
 * The scale is custom (`--text-display`, `--text-body-sm`, `--text-data`, …), so
 * out of the box tailwind-merge classifies `text-body-sm` as a *text colour*
 * rather than a font size. Combining a colour and a size — which every button,
 * badge and heading does — then makes the later class win and silently drop the
 * other:
 *
 *   cn('bg-brand-500 text-sand-0', 'text-body-sm')  ->  'bg-brand-500 text-body-sm'
 *
 * That shipped white-on-green as ink-on-green at 3.33:1 and was caught by the
 * axe gate rather than by review. Declaring the font-size group fixes it for
 * every caller at once; `cn.test.ts` pins the behaviour.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
            'h1',
            'h2',
            'h3',
            'h4',
            'body-lg',
            'body',
            'body-sm',
            'caption',
            'data',
          ],
        },
      ],
    },
  },
})

/**
 * The shadcn/ui class helper (D-19). Merges conditional classes and resolves
 * Tailwind conflicts so a caller's override actually wins.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
