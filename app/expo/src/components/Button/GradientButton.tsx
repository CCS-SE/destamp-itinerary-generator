import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
  isSubmitting: boolean;
  size?: number;
}

export default function GradientButton({
  onPress,
  title,
  isSubmitting,
  size = 370,
  ...touchableOpacityProps
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isSubmitting}
      {...touchableOpacityProps}
    >
      <LinearGradient
        testID="gradient-btn-color"
        colors={['#fd8139', '#f65a82']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.8, y: 0 }}
        style={{ width: size }}
        className={`m-5 items-center rounded-xl py-3 ${
          isSubmitting ? 'opacity-40' : ''
        }`}
      >
        {isSubmitting ? (
          <ActivityIndicator
            testID="gradient-btn-loading"
            size="small"
            color={'white'}
            className="m-1"
          />
        ) : (
          <Text
            testID="gradient-btn-text"
            className="ml-2 items-center font-poppins-medium text-lg text-white"
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
