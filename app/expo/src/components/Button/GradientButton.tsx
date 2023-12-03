import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
  isSubmitting: boolean;
  width?: number;
}

export default function GradientButton({
  onPress,
  title,
  isSubmitting,
  width: size,
  ...touchableOpacityProps
}: GradientButtonProps) {
  const buttonWidth = Dimensions.get('window').width * (size || 0.86);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.88}
      onPress={onPress}
      disabled={isSubmitting}
      {...touchableOpacityProps}
    >
      <LinearGradient
        testID="gradient-btn-color"
        colors={['#fd8139', '#f65a82']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.8, y: 0 }}
        style={{ width: buttonWidth, alignSelf: 'center' }}
        className={`m-5 items-center rounded-xl py-4 ${
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
            className="ml-2 items-center font-poppins-medium text-base text-white"
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
