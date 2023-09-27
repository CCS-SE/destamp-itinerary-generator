import { Pressable, Text } from 'react-native';

interface DayTabProps {
  date: Date;
  day: number;
  isSelected: boolean;
  onPress: () => void;
}

export default function DayButton({
  isSelected,
  date,
  day,
  onPress,
}: DayTabProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 items-center rounded-xl p-1 ${
        isSelected ? 'w-36 bg-[#FA8E56]' : 'w-24 bg-transparent'
      }`}
    >
      <Text
        className={`font-poppins-medium text-xl  ${
          isSelected
            ? ' font-extrabold text-white'
            : ' font-normal text-gray-500'
        }`}
      >
        DAY {day}
      </Text>
      <Text
        className={`font-poppins text-base ${
          isSelected ? 'text-white' : 'text-gray-500'
        }`}
      >
        {new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </Text>
    </Pressable>
  );
}
