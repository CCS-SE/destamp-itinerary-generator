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

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j] as T;
    shuffledArray[j] = temp as T;
  }
  return shuffledArray;
}
