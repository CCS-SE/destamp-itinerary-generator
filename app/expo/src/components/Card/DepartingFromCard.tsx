import { Text, View } from 'react-native';

interface DepartingFromCardProps {
  locationName: string;
}

export default function DepartingFromCard({
  locationName,
}: DepartingFromCardProps) {
  return (
    <View className="mx-8 mt-5 h-[65] w-[320] rounded-xl bg-gray-100 p-1.5">
      <Text className="mx-3 font-poppins text-lg text-orange-500">
        Departing from
      </Text>
      <Text className="mx-3 font-poppins text-lg text-gray-400">
        {locationName}
      </Text>
    </View>
  );
}
