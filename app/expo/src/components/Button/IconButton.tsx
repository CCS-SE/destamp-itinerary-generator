import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  icon: React.JSX.Element;
}

export default function IconButton({ onPress, icon }: CustomButtonProps) {
  return (
    <View className="items-center p-3">
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.7}
        onPress={onPress}
        className="w-[120] items-center rounded-2xl bg-gray-200 p-2"
      >
        {icon}
      </TouchableOpacity>
    </View>
  );
}
