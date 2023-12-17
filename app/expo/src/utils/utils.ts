import { Alert } from 'react-native';
import { Moment } from 'moment';

import { ExpenseCategory } from '~/graphql/generated';

export function amountFormatter(amount: number) {
  return new Intl.NumberFormat().format(Math.floor(amount));
}

export function confirmationAlert(
  title: string,
  message: string,
  rightBtnMsg: string,
  leftBtnMsg: string,
  onPress?: () => void,
) {
  return Alert.alert(
    `${title}`,
    `${message}`,
    [
      { text: `${leftBtnMsg}`, style: 'cancel' },
      { text: `${rightBtnMsg}`, onPress: onPress },
    ],
    {
      cancelable: false,
    },
  );
}

export function toSentenceCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

export const getPieChartData = (
  data: {
    __typename?: 'Expense' | undefined;
    amount: number;
    category: ExpenseCategory;
    dateSpent: Date;
  }[],
) => {
  return data
    .reduce(
      (
        accumulator: {
          __typename?: 'Expense' | undefined;
          amount: number;
          category: ExpenseCategory;
          dateSpent: Date;
        }[],
        current,
      ) => {
        const existingItem = accumulator.find(
          (item) => item.category === current.category,
        );

        if (existingItem) {
          existingItem.amount += current.amount;
        } else {
          accumulator.push({ ...current });
        }
        return accumulator;
      },
      [],
    )
    .map((item, index) => {
      const color = category[item.category]?.color;

      return {
        key: index,
        value: item.amount,
        svg: { fill: color },
        arc: { cornerRadius: 7 },
      };
    });
};

export const calculateAveragePrice = (priceRange: string) => {
  const [min, max] = priceRange.split('-').map(Number);
  if (isNaN(min!) || isNaN(max!)) {
    return 0;
  } else {
    return (min! + max!) / 2;
  }
};

export const getTravelDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  if (hours > 0) {
    return `${hours} hour ${minutes} min`;
  } else {
    return `${minutes} min`;
  }
};

export const getTravelDistance = (distance: number) =>
  (distance / 1000).toFixed(1);

export const calculateTravelExpense = (
  distance: number,
  duration: number,
  travelerCount: number,
) => {
  const travelDistanceInKilometers = parseFloat(getTravelDistance(distance));
  const flagDown = 40;
  const additionalCostPerKm = 13.5;
  const durationMinutes = Math.floor(duration / 60);
  const additionalCostPerMin = 2;

  return travelDistanceInKilometers > 1
    ? Math.round(
        flagDown +
          travelDistanceInKilometers * additionalCostPerKm +
          durationMinutes * additionalCostPerMin,
      ) * taxisNeeded(travelerCount)
    : 0;
};

export const separateWords = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

interface CategoryColor {
  [key: string]: {
    color: string;
  };
}

const category: CategoryColor = {
  ACCOMMODATION: {
    color: '#C79BFF',
  },
  FOOD: {
    color: '#FCA172',
  },
  SIGHTSEEING: {
    color: '#7EC2DF',
  },
  TRANSPORTATION: {
    color: '#DF7E96',
  },
  SHOPPING: {
    color: '#C2C38A',
  },
  ACTIVITY: {
    color: '#30E96D',
  },
  OTHER: {
    color: '#BE7B75',
  },
};

export const getDatesBetween = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate).toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const areDatesEqual = (date1: Date, date2: Date) => {
  // Extract the date portion of the two dates
  const date1WithoutTime = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
  );
  const date2WithoutTime = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate(),
  );

  // Compare the date portions
  return date1WithoutTime.getTime() === date2WithoutTime.getTime();
};

export const getPreferredTime = (preferredTimeValues: [number, number][]) => {
  return preferredTimeValues.map(([start, end]) => `${start}:00-${end}:00`);
};

export const taxisNeeded = (travelerCount: number) => {
  if (travelerCount < 1) {
    return 0;
  } else if (travelerCount <= 4) {
    return 1;
  } else {
    const taxisNeeded = (travelerCount - 1) / 4;
    return Math.floor(taxisNeeded) + 1;
  }
};

export function getTripDateFormat(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function getTripDateWithYearFormat(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

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

export const formatDateToString = (date: Moment | null) => {
  return date ? date.format('YYYY-MM-DD') : '';
};

export const dateFormmater = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
