import { Alert } from 'react-native';

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
