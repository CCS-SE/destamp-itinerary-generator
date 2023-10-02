import { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface DirectionCardProps {
  icon: ReactNode;
  duration: string;
}

export default function DirectionCard({ icon, duration }: DirectionCardProps) {
  return (
    <View className="mx-8 mt-5 h-[45] w-[320] flex-row items-center rounded-xl bg-gray-100">
      {icon}
      <Text className="mx-2 font-poppins text-lg text-gray-400">
        {duration}
      </Text>
    </View>
  );
}
