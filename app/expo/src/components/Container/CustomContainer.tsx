import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';

interface CustomContainerProps {
  placeholder: string;
  width: number;
  value: string;
  onChangeText: (text: string) => void;
  numeric?: boolean;
  multiline?: boolean; // Make multiline optional
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  placeholder,
  width,
  value,
  onChangeText,
  numeric = false,
  multiline = false, // Default to false if not provided
}) => {
  const keyboardType: KeyboardTypeOptions = numeric ? 'numeric' : 'default';
  const [contentHeight, setContentHeight] = useState(0);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#5A5A5A',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        minHeight: 50,
        width,
      }}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          fontFamily: 'Poppins',
          fontSize: 15,
          height: Math.max(35, contentHeight),
        }}
        multiline={multiline} // Conditionally apply multiline based on the prop value
        onContentSizeChange={(e) => {
          setContentHeight(e.nativeEvent.contentSize.height);
        }}
      />
    </View>
  );
};

export default CustomContainer;
