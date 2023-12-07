import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PriceCheckBox = ({
  option,
  options,
  onSelect,
}: {
  option: string | null;
  options: string[];
  onSelect: (selectedOption: string | null) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(option);

  const handleOptionSelect = (option: string) => {
    if (option === selectedOption) {
      setSelectedOption(null);
      onSelect(null);
    } else {
      setSelectedOption(option);
      onSelect(option);
    }
  };

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
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'grey',
                backgroundColor: 'white',
                marginRight: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {selectedOption === option && option === null && (
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 14,
                    color: 'gray',
                  }}
                >
                  {'✓'}
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
    // <View style={{ flexDirection: 'row', marginLeft: 15 }}>
    //   <TouchableOpacity
    //     onPress={() => handleOptionSelect(option)}
    //     activeOpacity={0.9}
    //   >
    //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //       <View
    //         style={{
    //           width: 20,
    //           height: 20,
    //           borderRadius: 5,
    //           borderWidth: 1,
    //           borderColor: 'gray',
    //           backgroundColor: 'white',
    //           marginRight: 2,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}
    //       >
    //         {selectedOption === option && (
    //           <Text
    //             style={{
    //               fontFamily: 'Poppins',
    //               fontSize: 14,
    //               color: 'white',
    //             }}
    //           >
    //             {option === 'YES' ? '✓' : ''}
    //           </Text>
    //         )}
    //       </View>
    //       <Text
    //         style={{
    //           fontFamily: 'Poppins',
    //           marginLeft: 5,
    //           fontSize: 18,
    //           color: 'gray',
    //         }}
    //       >
    //         {option}
    //       </Text>
    //     </View>
    //   </TouchableOpacity>
    // </View>
  );
};

export default PriceCheckBox;
