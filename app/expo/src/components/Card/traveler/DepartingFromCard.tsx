import { Text, View } from 'react-native';

import { truncateText } from '~/utils/utils';

interface DepartingFromCardProps {
  locationName: string;
}

const MAX_TEXT_LENGTH = 30;

export default function DepartingFromCard({
  locationName,
}: DepartingFromCardProps) {
  return (
    <View className="mx-8 mt-5 h-[65] w-[310] rounded-xl bg-gray-100 p-1.5">
      <Text className="mx-3 font-poppins text-lg text-orange-500">
        Departing from
      </Text>
      <Text className="mx-3 font-poppins text-base text-gray-400">
        {truncateText(locationName, MAX_TEXT_LENGTH)}
      </Text>
    </View>
  );
}
