import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const EstablishmentTypeButton = ({
  label,
  onSelect,
  isSelected,
}: {
  label: string;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  const buttonColor = isSelected ? '#EB4586' : 'white';
  const textColor = isSelected ? 'white' : 'black';

  return (
    <TouchableOpacity
      style={[
        {
          height: 50,
          width: 300,
          borderRadius: 8,
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        { backgroundColor: buttonColor },
      ]}
      onPress={onSelect}
    >
      <Text
        style={[{ fontSize: 15, fontFamily: 'Poppins' }, { color: textColor }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default EstablishmentTypeButton;
