import { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import Peso from '../../../assets/images/peso-sign.svg';

interface AmountTextInputProps extends TextInputProps {
  onChangeText: (value: string) => void;
}

export default function AmountTextInput({
  onChangeText,
  ...textInputProps
}: AmountTextInputProps) {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (amount: string) => {
    setAmount(amount);
    onChangeText(amount);
  };

  return (
    <View>
      <View className="flex-row items-center">
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
        />
      </View>
    </View>
  );
}
