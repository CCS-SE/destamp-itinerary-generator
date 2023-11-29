import React from 'react';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';

interface CustomContainerProps {
  placeholder: string;
  height: number;
  width: number;
  value: string;
  onChangeText: (text: string) => void;
  numeric?: boolean; // Add numeric prop
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  placeholder,
  height,
  width,
  value,
  onChangeText,
  numeric = false, // Default to false
}) => {
  const keyboardType: KeyboardTypeOptions = numeric ? 'numeric' : 'default';

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#5A5A5A',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        height,
        width,
      }}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{ fontFamily: 'Poppins', fontSize: 15 }}
      />
    </View>
  );
};

export default CustomContainer;
