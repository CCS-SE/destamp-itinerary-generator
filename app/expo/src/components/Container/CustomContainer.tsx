import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const CustomContainer = ({
  placeholder,
  height,
  width,
}: {
  placeholder: string;
  height: number;
  width: number;
}) => {
  const [content, setContent] = useState('');

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
        value={content}
        onChangeText={(text) => setContent(text)}
        style={{ fontFamily: 'Poppins', fontSize: 15 }}
      />
    </View>
  );
};

export default CustomContainer;
