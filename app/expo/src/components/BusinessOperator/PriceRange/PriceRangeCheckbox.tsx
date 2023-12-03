import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PriceRangeCheckBox = ({
  option,
  onSelect,
}: {
  option: string;
  onSelect: (selectedOption: string | null) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      onSelect(null);
    } else {
      setSelectedOption(option);
      onSelect(option);
    }
  };

  return (
    <View style={{ flexDirection: 'row', marginLeft: 15 }}>
      <TouchableOpacity onPress={() => handleOptionSelect(option)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'gray',
              backgroundColor: selectedOption === option ? '#C43737' : 'white',
              marginRight: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {selectedOption === option && (
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 11,
                  color: 'white',
                }}
              >
                X
              </Text>
            )}
          </View>
          <Text
            style={{
              fontFamily: 'Poppins',
              marginLeft: 5,
              fontSize: 18,
              color: 'black',
            }}
          >
            {option}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PriceRangeCheckBox;
