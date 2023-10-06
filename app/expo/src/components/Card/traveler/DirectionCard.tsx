import { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface DirectionCardProps {
  icon: ReactNode;
  duration: string;
  distance: string;
  transportationPrice: string;
  isTransportationIncluded: boolean;
}

export default function DirectionCard({
  icon,
  duration,
  distance,
  transportationPrice,
  isTransportationIncluded,
}: DirectionCardProps) {
  return (
    <View className="mx-8 mt-5 h-[45] w-[310] flex-row items-center rounded-xl bg-gray-100">
      <View className="mx-2">{icon}</View>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="mx-2 font-poppins text-base text-gray-400">
          {`${duration} • ${distance}`}
        </Text>
        {isTransportationIncluded ? (
          <View className="mr-3 rounded-md bg-orange-100 px-2">
            <Text className="font-poppins text-base text-orange-600">
              {`₱${transportationPrice}`}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
