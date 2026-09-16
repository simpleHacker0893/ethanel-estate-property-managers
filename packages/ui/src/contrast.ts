import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * WCAG 2.1 contrast, computed from the token values in `../theme.css` rather
 * than from a table written alongside them.
 *
 * This exists once, here, because it has two consumers that must never
 * disagree: `contrast.test.ts`, which fails the build if a pair moves, and
 * `/kitchen-sink`, which prints the same numbers on screen. A comment block
 * listing ratios would rot away from the tokens the first time a hex changed;
 * a recomputation cannot.
 *
 * Node-only (it reads a file), so it is reached through the `@ethanel/ui/contrast`
 * subpath and never through the package index — a client component importing
 * `cn` must not drag `node:fs` in behind it.
 */

export type ThemeColours = ReadonlyMap<string, string>

/**
 * Built by path arithmetic rather than `new URL('../theme.css', import.meta.url)`:
 * Turbopack statically analyses that form as a module specifier and tries to
 * resolve theme.css as a CSS chunk, which fails the build. This is a file read,
 * not an import, and the path math keeps it that way.
 */
const THEME_CSS = join(dirname(fileURLToPath(import.meta.url)), '..', 'theme.css')

/** Every `--color-<token>: #rrggbb` declaration in the @theme block. */
export function parseThemeColours(css: string): ThemeColours {
  const colours = new Map<string, string>()
  for (const match of css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\b/g)) {
    const token = match[1]
    const hex = match[2]
    if (token && hex) colours.set(token, hex)
  }
  return colours
}

export function loadThemeColours(): ThemeColours {
  return parseThemeColours(readFileSync(THEME_CSS, 'utf8'))
}

function channelLuminance(value: number): number {
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [0, 2, 4].map((offset) =>
    channelLuminance(parseInt(hex.slice(1 + offset, 3 + offset), 16) / 255),
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(a: string, b: string): number {
  const [lighter = 0, darker = 0] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  )
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * `forbidden` is not a failure state — it is a pair the system deliberately
 * refuses to use, asserted so that nobody "corrects" it into service. AA body
 * text is 4.5:1; AA large text and non-text UI boundaries are 3:1.
 */
export type PairVerdict = 'forbidden' | 'ui-only' | 'large-text' | 'body-text'

export interface ContrastPair {
  readonly name: string
  readonly foreground: string
  readonly background: string
  readonly usage: string
  /** The ratio verified on 16 September 2026, to two decimal places. */
  readonly expected: number
  readonly verdict: PairVerdict
}

export function verdictFor(ratio: number): PairVerdict {
  if (ratio >= 4.5) return 'body-text'
  if (ratio >= 3) return 'large-text'
  return 'forbidden'
}

/**
 * The verified table. Every pair the site is allowed to render, plus the four
 * it is forbidden to render, plus the two findings that decide where a border
 * colour may be used.
 */
export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  {
    name: 'accent-500 text on white',
    foreground: 'accent-500',
    background: 'sand-0',
    usage: 'Forbidden. Ochre text on white is accent-700.',
    expected: 2.67,
    verdict: 'forbidden',
  },
  {
    name: 'white text on accent-500',
    foreground: 'sand-0',
    background: 'accent-500',
    usage: 'Forbidden. The CTA fill carries brand-900 ink, never white.',
    expected: 2.67,
    verdict: 'forbidden',
  },
  {
    name: 'brand-900 ink on accent-500 fill',
    foreground: 'brand-900',
    background: 'accent-500',
    usage: 'THE primary CTA pair, light and dark alike.',
    expected: 6.12,
    verdict: 'body-text',
  },
  {
    name: 'accent-700 text on white',
    foreground: 'accent-700',
    background: 'sand-0',
    usage: 'Ochre links and ochre text.',
    expected: 5.98,
    verdict: 'body-text',
  },
  {
    name: 'white text on brand-500 fill',
    foreground: 'sand-0',
    background: 'brand-500',
    usage: 'Secondary solid button, header CTA.',
    expected: 5.0,
    verdict: 'body-text',
  },
  {
    name: 'brand-900 ink on accent-300',
    foreground: 'brand-900',
    background: 'accent-300',
    usage: 'Badges and quiet fills.',
    expected: 9.72,
    verdict: 'body-text',
  },
  {
    name: 'accent-300 on brand-900',
    foreground: 'accent-300',
    background: 'brand-900',
    usage: 'The dark-mode accent, and the accent inside an inverted band.',
    expected: 9.72,
    verdict: 'body-text',
  },
  {
    name: 'white on brand-900',
    foreground: 'sand-0',
    background: 'brand-900',
    usage: 'Inverted bands.',
    expected: 16.36,
    verdict: 'body-text',
  },
  {
    name: 'sand-800 body ink on white',
    foreground: 'sand-800',
    background: 'sand-0',
    usage: 'Body ink.',
    expected: 16.67,
    verdict: 'body-text',
  },
  {
    name: 'sand-600 on white',
    foreground: 'sand-600',
    background: 'sand-0',
    usage: 'Muted body.',
    expected: 8.61,
    verdict: 'body-text',
  },
  {
    name: 'sand-500 on white',
    foreground: 'sand-500',
    background: 'sand-0',
    usage: 'The quietest text allowed, and the form-control border floor.',
    expected: 5.12,
    verdict: 'body-text',
  },
  {
    name: 'brand-500 focus ring on white',
    foreground: 'brand-500',
    background: 'sand-0',
    usage: 'Focus ring, light scheme. Well over the 3:1 UI floor.',
    expected: 5.0,
    verdict: 'body-text',
  },
  {
    name: 'brand-400 focus ring on sand-950',
    foreground: 'brand-400',
    background: 'sand-950',
    usage: 'Focus ring, dark scheme.',
    expected: 8.83,
    verdict: 'body-text',
  },
  {
    name: 'sand-200 border on white',
    foreground: 'sand-200',
    background: 'sand-0',
    usage: 'Card borders only. Decoration — never a form control boundary.',
    expected: 1.27,
    verdict: 'forbidden',
  },
  {
    name: 'sand-400 border on white',
    foreground: 'sand-400',
    background: 'sand-0',
    usage: 'Under the 3:1 UI floor. Never a form control boundary either.',
    expected: 2.73,
    verdict: 'forbidden',
  },
  {
    name: 'sand-100 ink on sand-950',
    foreground: 'sand-100',
    background: 'sand-950',
    usage: 'Body ink, dark scheme.',
    expected: 17.2,
    verdict: 'body-text',
  },
  {
    name: 'sand-300 muted on sand-950',
    foreground: 'sand-300',
    background: 'sand-950',
    usage: 'Muted body, dark scheme.',
    expected: 10.69,
    verdict: 'body-text',
  },
  {
    name: 'sand-400 quiet on sand-950',
    foreground: 'sand-400',
    background: 'sand-950',
    usage: 'The quietest text allowed in the dark scheme.',
    expected: 7.08,
    verdict: 'body-text',
  },
]

export interface ComputedPair extends ContrastPair {
  readonly ratio: number
  readonly foregroundHex: string
  readonly backgroundHex: string
}

export function computePairs(colours: ThemeColours): ComputedPair[] {
  return CONTRAST_PAIRS.map((pair) => {
    const foregroundHex = colours.get(pair.foreground)
    const backgroundHex = colours.get(pair.background)
    if (!foregroundHex || !backgroundHex) {
      throw new Error(
        `theme.css is missing --color-${pair.foreground} or --color-${pair.background}`,
      )
    }
    return {
      ...pair,
      foregroundHex,
      backgroundHex,
      ratio: contrastRatio(foregroundHex, backgroundHex),
    }
  })
}
