/**
 * src/lib/date/formatDate.ts
 *
 * Deterministic date formatting utility for Hydrops India.
 * Produces identical output on server (Node.js) and client (Browsers).
 * Formats dates into "5 Aug 2026" without locale or timezone mismatches.
 */

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export function formatDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return '';

  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return '';

    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const monthName = MONTH_NAMES[monthIndex];
    if (!monthName || !year) return '';

    return `${day} ${monthName} ${year}`;
  } catch {
    return '';
  }
}
