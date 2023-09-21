import React from 'react';
import { Text, View } from 'react-native';

interface ColoredContainerProps {
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
}

export default function ColoredContainer({
  title,
  content,
  backgroundColor,
  textColor,
}: ColoredContainerProps) {
  return (
    <View
      style={{ backgroundColor: backgroundColor }}
      className={'mx-2 mt-4 h-20 w-40 items-center justify-center rounded-2xl'}
    >
      <Text
        style={{ color: textColor }}
        className={`text-[${textColor}] text-m`}
      >
        {title}
      </Text>
      <Text
        style={{ color: textColor }}
        className={`text-[${textColor}] text-xl`}
      >
        {content}
      </Text>
    </View>
  );
}
