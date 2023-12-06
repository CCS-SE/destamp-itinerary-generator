import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const OpeningHourCheckbox = ({
  options,
  onSelect,
}: {
  options: string[];
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
    <View style={{ flexDirection: 'row', margin: 10 }}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleOptionSelect(option)}
          style={{ marginRight: index < options.length - 1 ? 20 : 0 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'grey',
                backgroundColor:
                  selectedOption === option
                    ? option === 'CLOSED'
                      ? '#C43737'
                      : 'green'
                    : 'white',
                // marginRight: 2,
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
                  {option === 'CLOSED' ? 'X' : '✓'}
                </Text>
              )}
            </View>
            <Text
              style={{
                fontFamily: 'Poppins',
                marginLeft: 5,
                fontSize: 13,
                color: 'black',
              }}
            >
              {option}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OpeningHourCheckbox;
