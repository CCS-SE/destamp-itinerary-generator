import { Text, TouchableOpacity, View } from 'react-native';

interface CounterProps {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function Counter({
  label,
  count,
  onIncrement,
  onDecrement,
}: CounterProps) {
  return (
    <View className=" mb-2 ml-4 mr-6 flex-row items-center justify-between">
      <Text className="font-poppins text-base text-gray-600">{label}</Text>
      <View className="w-[125] flex-row items-center rounded-lg bg-gray-100 px-5 py-0.5">
        <TouchableOpacity onPress={onDecrement}>
          <Text className="right-1 -mb-1 mt-1.5 font-poppins text-4xl text-gray-600">
            -
          </Text>
        </TouchableOpacity>
        <Text className="absolute left-14 font-poppins text-lg text-gray-500">
          {count}
        </Text>
        <TouchableOpacity onPress={onIncrement}>
          <Text className=" absolute left-12 -mb-1 -mt-3.5 font-poppins text-4xl text-gray-600">
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
