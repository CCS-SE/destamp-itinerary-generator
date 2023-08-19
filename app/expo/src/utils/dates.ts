export function getTripDateFormat(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: 'numeric'
  });
}

export function getDaysDifference(startDate: Date, endDate: Date) {
  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
  );
}
