import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * The shadcn/ui class helper (D-19). Merges conditional classes and resolves
 * Tailwind conflicts so a caller's override actually wins.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
