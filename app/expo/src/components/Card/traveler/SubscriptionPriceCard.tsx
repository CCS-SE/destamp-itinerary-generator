import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SubscriptionPriceCardProps {
  price: string;
  billedPer: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SubscriptionPriceCard({
  price,
  billedPer,
  isSelected,
  onPress,
}: SubscriptionPriceCardProps) {
  const screenWidth = Dimensions.get('window').width * 0.86;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        className={`mt-3 self-center rounded-xl p-4 ${
          isSelected ? 'border-2 border-slate-700 bg-gray-100' : 'bg-gray-100'
        }`}
        style={{ width: screenWidth }}
      >
        <Text
          className={` text-base  ${
            isSelected ? 'font-poppins-medium text-slate-600' : 'text-gray-500'
          }`}
        >
          ₱ {price} {billedPer}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
