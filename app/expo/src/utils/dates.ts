export function getTripDateFormat(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function tripDuration(
  startDate: Date | null | string,
  endDate: Date | null | string,
) {
  return Math.floor(
    (new Date(endDate ? endDate : '').getTime() -
      new Date(startDate ? startDate : '').getTime()) /
      (24 * 60 * 60 * 1000),
  );
}
