import { Alert } from 'react-native';

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
    date: Date;
  }[],
) => {
  return data
    .reduce(
      (
        accumulator: {
          __typename?: 'Expense' | undefined;
          amount: number;
          category: ExpenseCategory;
          date: Date;
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
