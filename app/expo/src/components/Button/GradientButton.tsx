import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
  onPress: () => void;
  title: string;
  isSubmitting: boolean;
}

export default function GradientButton({
  onPress,
  title,
  isSubmitting,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isSubmitting}
    >
      <LinearGradient
        colors={['#fd8139', '#f65a82']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.8, y: 0 }}
        className={`m-5 w-[370] items-center rounded-xl py-3 ${
          isSubmitting ? 'opacity-40' : ''
        }`}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={'white'} className="m-1" />
        ) : (
          <Text className="ml-2 items-center text-lg font-medium text-white">
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
