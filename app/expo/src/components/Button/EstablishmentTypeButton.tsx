import React, { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const EstablishmentTypeButton = ({
  label,
  icon,
  onSelect,
  isSelected,
}: {
  label: string;
  icon: ReactNode;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  const borderColor = isSelected ? '#EB4586' : '#D3D3D3';
  const textColor = isSelected ? '#EB4586' : '#EB4586';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="mt-5 items-center justify-center border-2"
      style={[
        {
          height: 60,
          width: 300,
          borderRadius: 8,
          flexDirection: 'row',
        },
        { borderColor: borderColor },
      ]}
      onPress={onSelect}
    >
      {icon}
      <Text
        className={`ml-3 text-base ${
          isSelected ? 'font-poppins-medium' : 'font-poppins'
        }`}
        style={[{ color: textColor }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default EstablishmentTypeButton;
