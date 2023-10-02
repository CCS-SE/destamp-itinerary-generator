import { getTripDateFormat, tripDuration } from '../dates';

describe('getTripDateFormat', () => {
  it('should format date', () => {
    const date = new Date(2023, 8, 23);
    const formattedDate = getTripDateFormat(date);

    expect(formattedDate).toBe('Sep 23, 2023');
  });
});

describe('tripDuration', () => {
  it('should get difference of two dates in days', () => {
    const startDate = new Date(2023, 8, 5);
    const endDate = new Date(2023, 8, 8);

    const difference = tripDuration(startDate, endDate);

    expect(difference).toBe(4);
  });
});
