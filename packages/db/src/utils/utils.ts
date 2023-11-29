export function tripDuration(
  startDate: Date | null | string,
  endDate?: Date | null | string,
) {
  return endDate
    ? Math.floor(
        (new Date(endDate ? endDate : '').getTime() -
          new Date(startDate ? startDate : '').getTime()) /
          (24 * 60 * 60 * 1000) +
          1,
      )
    : 1;
}
