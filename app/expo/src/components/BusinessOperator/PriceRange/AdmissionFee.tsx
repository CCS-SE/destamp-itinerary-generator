import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const AdmissionFee = ({
  admissionFee,
  onChangeText,
}: {
  admissionFee: number;
  onChangeText: (text: string) => void;
}) => {
  const [feeValue, setFeeValue] = useState(admissionFee.toString());

  const handleFeeChange = (value: string) => {
    setFeeValue(value);
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
