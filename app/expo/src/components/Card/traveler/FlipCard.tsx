import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Image } from 'expo-image';

export const FlipCardComponent = ({
  url,
  title,
}: {
  url: string;
  title?: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <TouchableOpacity onPress={flipCard}>
      <FlipCard
        friction={6}
        flipHorizontal={true}
        flipVertical={false}
        perspective={1000}
        flip={isFlipped}
        alignHeight
        clickable
      >
        <Image source={{ uri: url || '' }} className=" h-36 w-36 rounded-md" />
        <View className="h-36 w-36 items-center justify-center rounded-full bg-gray-200 py-10">
          <Text className="font-poppins text-sm text-gray-500">{title}</Text>
        </View>
      </FlipCard>
    </TouchableOpacity>
  );
};
