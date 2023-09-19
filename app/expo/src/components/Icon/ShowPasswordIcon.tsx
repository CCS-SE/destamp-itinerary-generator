import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface ShowPasswordIconProps {
  onPress: () => void;
  hidePassword: boolean;
  testID: string;
}

export default function ShowPasswordIcon({
  onPress,
  hidePassword,
  testID,
}: ShowPasswordIconProps) {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      className="absolute right-5 mt-4"
    >
      {hidePassword ? (
        <Entypo name="eye" size={22} color="#A9A9A9" />
      ) : (
        <Entypo name="eye-with-line" size={23} color="#A9A9A9" />
      )}
    </TouchableOpacity>
  );
}
