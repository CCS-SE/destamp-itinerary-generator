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
    <View className=" mb-2 ml-4 mr-7 mt-1 flex-row items-center justify-between">
      <Text className="text-small font-poppins text-gray-600">{label}</Text>
      <View className="w-[110] flex-row items-center rounded-lg bg-gray-100 px-5">
        <TouchableOpacity onPress={onDecrement}>
          <Text className="-left-2 mt-1 font-poppins text-2xl text-gray-600">
            -
          </Text>
        </TouchableOpacity>
        <Text className="absolute left-12 font-poppins text-base text-gray-500">
          {count}
        </Text>
        <TouchableOpacity onPress={onIncrement}>
          <Text className="absolute left-12 -mb-1 -mt-3.5 font-poppins text-2xl text-gray-600">
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
