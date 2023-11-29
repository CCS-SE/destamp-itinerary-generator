import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface AdmissionFeeProps {
  admissionFee: string;
  admissionFeeOnChange: (value: number) => void;
  onChangeText: (value: string) => void;
}

const AdmissionFee: React.FC<AdmissionFeeProps> = ({
  admissionFee,
  admissionFeeOnChange,
  // onChangeText,
}) => {
  const [feeValue, setFeeValue] = useState<string>(admissionFee);

  const handleFeeChange = (value: string) => {
    setFeeValue(value);
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      admissionFeeOnChange(parsedValue);
    }
  };

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          borderColor: '#FFA053',
          borderRadius: 10,
          width: 180,
          padding: 10,
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFA053',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingRight: 8,
            paddingLeft: 8,
            color: 'white',
          }}
        >
          ₱
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 130 }}
        >
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderRadius: 5,
              backgroundColor: 'white',
              flex: 1,
              justifyContent: 'space-around',
              padding: 5,
            }}
            keyboardType="numeric"
            value={feeValue}
            maxLength={9}
            onChangeText={handleFeeChange}
          />
        </View>
      </View>
    </View>
  );
};

export default AdmissionFee;
