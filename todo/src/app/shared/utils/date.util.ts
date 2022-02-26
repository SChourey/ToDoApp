export function getDateDiffInDays(dt1time: number, dt2time: number) {
  return Math.ceil((dt2time - dt1time) / (1000 * 60 * 60 * 24));
}

export function getDateInStandardFormat(dt: Date) {
  const c = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
  return c.toISOString().split('T')[0];
}
