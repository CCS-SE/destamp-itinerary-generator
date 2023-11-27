import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  content,
  height,
  width,
  buttonColor,
  buttonBorderColor,
  onClickColor,
  textSize,
  textColor,
  onPressTextColor,
  hasShadow,
  onPress,
}: {
  content: string;
  height: number;
  width: number;
  buttonColor?: string;
  buttonBorderColor?: string;
  onClickColor: string;
  textSize?: number;
  textColor?: string;
  onPressTextColor?: string;
  hasShadow?: boolean;
  onPress: () => void;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(!isClicked);
  };

  const shadowStyle = hasShadow
    ? {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }
    : {};

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        handlePress();
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
          justifyContent: 'center',
          borderColor: isClicked ? onClickColor : buttonBorderColor,
          backgroundColor: isClicked ? onClickColor : buttonColor, // Change background color on click
          height,
          width,
          ...shadowStyle,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: textSize,
            color: isClicked ? onPressTextColor : textColor, // Change font color on click
          }}
        >
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
