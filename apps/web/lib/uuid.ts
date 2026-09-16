import { randomFillSync } from 'node:crypto'

/**
 * UUIDv7, generated in the application (D-07).
 *
 * Written here rather than pulled in as a dependency because it is twenty lines
 * and the blueprint's dependency policy asks for every addition to be justified
 * against the JavaScript budget. It is server-only, so it costs no browser bytes
 * either way — but a dependency that does not exist cannot need patching.
 *
 * Layout (RFC 9562 §5.7): 48 bits of Unix milliseconds, 4 bits of version, 12
 * bits of random, 2 bits of variant, 62 bits of random. The time prefix is what
 * makes these sort chronologically, which is the property the ledger's indexes
 * will want in Sprint 005 — so the marketing site's one write path uses the same
 * scheme rather than a v4 that would have to be migrated.
 */
export function uuidv7(now: number = Date.now(), fill = randomFillSync): string {
  const bytes = new Uint8Array(16)
  fill(bytes)

  const timestamp = BigInt(now)
  bytes[0] = Number((timestamp >> 40n) & 0xffn)
  bytes[1] = Number((timestamp >> 32n) & 0xffn)
  bytes[2] = Number((timestamp >> 24n) & 0xffn)
  bytes[3] = Number((timestamp >> 16n) & 0xffn)
  bytes[4] = Number((timestamp >> 8n) & 0xffn)
  bytes[5] = Number(timestamp & 0xffn)

  // Version 7 in the high nibble of byte 6.
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x70
  // Variant 10xx in the high bits of byte 8.
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
