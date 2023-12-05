import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface AdmissionFeeProps {
  admissionFee: string;
  admissionFeeOnChange: (value: number) => void;
}

const AdmissionFee: React.FC<AdmissionFeeProps> = ({
  admissionFee,
  admissionFeeOnChange,
}) => {
  const handleFeeChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      admissionFeeOnChange(parsedValue);
    }
  };

  return (
    <View>
      <View
        className=" h-[60] w-[70] items-center justify-center rounded-lg bg-gray-100"
        style={{
          alignItems: 'center',
          borderColor: '#EB4586',
          borderRadius: 10,
          width: 180,
          padding: 10,
          margin: 10,
          flexDirection: 'row',
          height: 80,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginRight: 15,
            paddingLeft: 8,
            color: 'gray',
          }}
        >
          ₱
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 100 }}
        >
          <TextInput
            style={{
              height: 50,
              borderColor: 'gray',
              borderRadius: 5,
              backgroundColor: 'white',
              flex: 1,
              padding: 5,
              fontFamily: 'Poppins',
              fontSize: 18,
              textAlign: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 1,
            }}
            keyboardType="numeric"
            value={admissionFee}
            maxLength={9}
            onChangeText={handleFeeChange}
          />
        </View>
      </View>
    </View>
  );
};

export default AdmissionFee;
