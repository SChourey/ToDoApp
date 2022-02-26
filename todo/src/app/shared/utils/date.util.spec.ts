import { getDateDiffInDays, getDateInStandardFormat } from './date.util';

describe('Date Utils', () => {
  it('should return correct Date Diff in days', () => {
    const day1 = new Date('2022-02-22').getTime();
    const day2 = new Date('2022-02-24').getTime();
    const result = getDateDiffInDays(day1, day2);
    expect(result).toBe(2);
  });

  it('should return correct date in the required format', () => {
    const currentDate = new Date('02/02/2022');
    const result = getDateInStandardFormat(currentDate);
    expect(result).toBe('2022-02-02');
  });
});
