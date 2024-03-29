import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

interface AbsoluteButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export default function AbsoluteButton({
  title,
  onPress,
  ...touchableOpacityProps
}: AbsoluteButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={handlePress}
      activeOpacity={0.98}
      className="absolute bottom-3 right-5"
      {...touchableOpacityProps}
    >
      <LinearGradient
        colors={['#fd8139', '#f65a82']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.8, y: 0 }}
        className="h-16 w-16 items-center justify-center rounded-full"
      >
        <Text
          testID="absolute-btn-text"
          className="mt-4 font-poppins text-5xl text-zinc-100"
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
