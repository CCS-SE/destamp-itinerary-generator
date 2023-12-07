import { useState } from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { ExpenseCategory } from '~/graphql/generated';
import Peso from '../../../assets/images/peso-sign.svg';

interface AmountTextInputProps extends TextInputProps {
  budgetInlusions: ExpenseCategory[];
  duration: number;
  totalTraveler: number;
  onChangeText: (value: string) => void;
  onBudgetError: (value: string) => void;
}

export default function AmountTextInput({
  budgetInlusions,
  duration,
  totalTraveler,
  onChangeText,
  onBudgetError,
  ...textInputProps
}: AmountTextInputProps) {
  const [amount, setAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [minBugdget, setMinBudget] = useState(0);

  const inputWidth = Dimensions.get('window').width * 0.82;

  const handleAmountChange = (value: string) => {
    // setAmount(value);
    // onChangeText(value);
    const sanitizedValue = value.replace(/^0+/, '');

    setAmount(sanitizedValue);
    onChangeText(sanitizedValue);

    let costCutoff = 200;
    const MIN_HOTEL_PRICE = 385;
    let accommodationCutoff = 0;

    if (duration && totalTraveler && !isNaN(parseFloat(value))) {
      const parsedValue = parseFloat(value.trim());
      const input = parsedValue / totalTraveler;

      let minBudget = 0;
      if (budgetInlusions.includes(ExpenseCategory.Accommodation)) {
        minBudget += MIN_HOTEL_PRICE / totalTraveler;
      }

      // Adjust the minimum budget based on the duration
      minBudget *= duration;

      if (
        !budgetInlusions.includes(ExpenseCategory.Food) &&
        !budgetInlusions.includes(ExpenseCategory.Transportation) &&
        !budgetInlusions.includes(ExpenseCategory.Accommodation)
      ) {
        minBudget = 0;
      }
      minBudget = Math.ceil(minBudget);

      setMinBudget(minBudget);

      if (input < minBudget) {
        setErrorMsg(`Min Budget: ₱${minBudget} per person for the whole trip.`);
        onBudgetError(
          `Min Budget: ₱${minBudget} per person for the whole trip.`,
        );
      } else {
        setErrorMsg('');
        onBudgetError('');
      }
    }
  };
  return (
    <View>
      <View className="flex-row items-center" style={{ width: inputWidth }}>
        <Peso
          height={18}
          width={18}
          style={{
            position: 'absolute',
            marginLeft: 14,
            alignSelf: 'center',
            bottom: 20,
          }}
        />
        <TextInput
          {...textInputProps}
          className="mt-2 h-14 w-[320] rounded-xl border border-gray-500 px-10 pl-10 font-poppins text-xl text-[#787675]"
          value={amount}
          onChangeText={handleAmountChange}
          inputMode="numeric"
          maxLength={7}
        />
      </View>
      {!!errorMsg && !!amount && (
        <>
          <Text
            testID={textInputProps.testID + '-error'}
            className="mt-2 font-poppins text-xs text-red-500"
          >
            {errorMsg}
          </Text>
          <Text
            testID={textInputProps.testID + '-error'}
            className=" font-poppins text-xs text-gray-500"
          >
            Try increasing your budget or scale down duration.
          </Text>
        </>
      )}
    </View>
  );
}
