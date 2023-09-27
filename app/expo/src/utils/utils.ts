import { Alert } from 'react-native';

import { ExpenseCategory } from '~/graphql/generated';

export function amountFormatter(amount: number) {
  return new Intl.NumberFormat().format(amount);
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
  return data.map((item, index) => {
    const color = category[item.category]?.color;

    return {
      key: index,
      value: item.amount,
      svg: { fill: color },
      arc: { cornerRadius: 7 },
    };
  });
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
