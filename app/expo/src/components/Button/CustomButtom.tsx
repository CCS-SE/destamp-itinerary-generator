import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  content,
  height,
  width,
  onClickColor,
}: {
  content: string;
  height: number;
  width: number;
  onClickColor: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(!isClicked);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          margin: 10,
          alignContent: 'center',
          borderColor: isClicked ? onClickColor : '#5A5A5A',
          backgroundColor: isClicked ? onClickColor : '#FFFFFF', // Change background color on click
          height,
          width,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: 15,
            color: isClicked ? '#FFFFFF' : '#000000', // Change font color on click
          }}
        >
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
