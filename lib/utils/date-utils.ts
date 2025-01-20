/**
 * Adjusts the current date to UTC+8 (Beijing time)
 * @returns Date object adjusted to Beijing timezone
 */
export function getAdjustedDate(): Date {
  const date = new Date();
  date.setHours(date.getHours() + 8);
  return date;
}
