import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Dev-only companion to /kitchen-sink: recomputes the WCAG 2.1 contrast ratios
// for the ochre pairs straight out of packages/ui/theme.css at request time, so
// the printed ratios are always the real token values and no hex literal ever
// exists outside the @theme block (acceptance row 10).

export interface ContrastPair {
  name: string
  usage: string
  background: string
  foreground: string
}

type ThemeColours = Map<string, string>

function parseThemeColours(css: string): ThemeColours {
  const colours: ThemeColours = new Map()
  for (const match of css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    const token = match[1]
    const hex = match[2]
    if (token && hex) colours.set(token, hex)
  }
  return colours
}

function luminance(hex: string): number {
  const channels = [0, 2, 4].map((i) => {
    const value = parseInt(hex.slice(1 + i, 3 + i), 16) / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  const [r = 0, g = 0, b = 0] = channels
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(a: string, b: string): number {
  const [l1 = 0, l2 = 0] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

export function themePath(): string {
  return join(process.cwd(), '..', '..', 'packages', 'ui', 'theme.css')
}

export function loadThemeColours(): ThemeColours {
  return parseThemeColours(readFileSync(themePath(), 'utf8'))
}

// The five pairs the interface is allowed to build with ochre, exactly as
// documented in the theme block — plus the forbidden pair, rendered so the
// failure is visible rather than folklore.
export function ochrePairs(
  colours: ThemeColours,
): (ContrastPair & { ratio: number; verdict: string })[] {
  const c = (name: string): string => {
    const hex = colours.get(name)
    if (!hex) throw new Error(`token --color-${name} missing from theme.css`)
    return hex
  }
  const verdict = (ratio: number): string =>
    ratio >= 7
      ? 'AAA body'
      : ratio >= 4.5
        ? 'AA body'
        : ratio >= 3
          ? 'AA large only'
          : 'FAILS — forbidden pair'
  return (
    [
      {
        name: 'ochre-300 + brand-900',
        usage: 'Primary CTA fill and ink, light and dark (the 6.12 pair)',
        background: 'ochre-300',
        foreground: 'brand-900',
      },
      {
        name: 'ochre-200 + brand-900',
        usage: 'Badges and large numerals on tinted fills',
        background: 'ochre-200',
        foreground: 'brand-900',
      },
      {
        name: 'ochre-100 + brand-900',
        usage: 'Banners and callout bands',
        background: 'ochre-100',
        foreground: 'brand-900',
      },
      {
        name: 'ochre-400 + brand-900',
        usage: 'Quiet filled chips; passes AA body',
        background: 'ochre-400',
        foreground: 'brand-900',
      },
      {
        name: 'ochre-500 + brand-900',
        usage: 'The floor: large text only, never body',
        background: 'ochre-500',
        foreground: 'brand-900',
      },
      {
        name: 'ochre-500 + white',
        usage: 'FORBIDDEN — ochre never carries white text',
        background: 'ochre-500',
        foreground: 'neutral-0',
      },
    ] satisfies ContrastPair[]
  ).map((pair) => {
    const ratio = contrastRatio(c(pair.background), c(pair.foreground))
    return { ...pair, ratio, verdict: verdict(ratio) }
  })
}
