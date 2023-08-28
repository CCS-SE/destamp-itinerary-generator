export function getTripDateFormat(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDaysDifference(startDate: Date, endDate: Date) {
  return Math.floor(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (24 * 60 * 60 * 1000),
  );
}
