import { Text, TouchableOpacity } from 'react-native';

interface StepperButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
}

export default function StepperButton({ onPress, label }: StepperButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="mt-2 h-12 w-44 items-center justify-center self-center rounded-xl bg-[#FC8040] p-2.5"
    >
      <Text className="font-poppins-medium text-lg text-white">{label}</Text>
    </TouchableOpacity>
  );
}
