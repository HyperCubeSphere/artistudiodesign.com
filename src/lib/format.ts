/**
 * Format helpers shared across editorial views.
 */

/**
 * Pads a positive number to two digits — `1` → `'01'`, `12` → `'12'`.
 * Used for the recurring `— 0X` numeric eyebrow pattern on Despre /
 * Servicii / Materiale / Features sections and the `Ghid` step list.
 */
export function pad2(n: number): string {
  return String(n).padStart(2, '0')
}
