import { useState } from 'react';
import { TextInput, View } from 'react-native';

import Peso from '../../../../assets/images/peso-sign.svg';

interface SinglePriceInputProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const SinglePriceInput = ({
  value,
  onValueChange,
}: SinglePriceInputProps) => {
  const [price, setPrice] = useState(value);

  const handleChange = (value: string) => {
    setPrice(value);
    onValueChange(value);
  };

  return (
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
        className="mt-2 h-14 w-[320] rounded-xl border-2 border-orange-500 px-10 pl-10 font-poppins text-xl text-[#787675]"
        inputMode="numeric"
        value={price}
        onChangeText={handleChange}
      />
    </View>
  );
};
