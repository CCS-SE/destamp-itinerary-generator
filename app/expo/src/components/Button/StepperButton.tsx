import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface StepperButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
}

export default function StepperButton({
  onPress,
  label,
  disabled = false,
  ...touchableOpacityProps
}: StepperButtonProps) {
  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}
      className={`mt-2 h-12 w-44 items-center justify-center self-center rounded-xl bg-[#FC8040] p-2.5 ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <Text className="font-poppins-medium text-lg text-white">{label}</Text>
    </TouchableOpacity>
  );
}
