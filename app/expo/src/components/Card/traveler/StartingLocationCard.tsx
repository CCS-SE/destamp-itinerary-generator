import { Dimensions, Text, View } from 'react-native';

interface DepartingFromCardProps {
  locationName: string;
}

export default function StartingLocationCard({
  locationName,
}: DepartingFromCardProps) {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View
      className="mx-7 mt-5 h-[58] rounded-xl bg-gray-100 p-1.5"
      style={{ width: screenWidth / 1.31 }}
    >
      <Text className="mx-3 font-poppins text-base text-orange-500">
        Starting location
      </Text>
      <Text
        className="mx-3 font-poppins text-sm text-gray-400"
        numberOfLines={1}
      >
        {locationName}
      </Text>
    </View>
  );
}
