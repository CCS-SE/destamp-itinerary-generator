import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import addBusinessFormStore from '~/store/addBusinessFormStore';

const OpeningHourCheckbox = ({
  day,
  option,
  options,
}: {
  day: number;
  option: string;
  options: string[];
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(option);

  const { openingHours, setData } = addBusinessFormStore();

  const handleOptionSelect = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  useEffect(() => {
    const updatedOpeningHours = openingHours.openingHours.map((oh) => {
      if (oh.day === day) {
        if (selectedOption === null) {
          return {
            ...oh,
            isClosed: false,
            is24Hours: false,
          };
        }
        return {
          ...oh,
          isClosed: selectedOption === 'CLOSED',
          is24Hours: selectedOption === '24 HOURS OPEN',
        };
      }
      return oh;
    });

    setData({
      step: 2,
      data: {
        ...openingHours,
        openingHours: updatedOpeningHours,
      },
    });
  }, [selectedOption]);

  return (
    <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 10 }}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleOptionSelect(option)}
          style={{ marginRight: index < options.length - 1 ? 10 : 0 }}
          activeOpacity={0.9}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              className="items-center justify-center"
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'grey',
                backgroundColor:
                  selectedOption === option
                    ? option === 'CLOSED'
                      ? '#FB2E53'
                      : 'green'
                    : 'white',
              }}
            >
              {selectedOption === option && (
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 14,
                    color: 'white',
                  }}
                >
                  ✓
                </Text>
              )}
            </View>
            <Text
              style={{
                fontFamily: 'Poppins',
                marginLeft: 5,
                fontSize: 14,
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
