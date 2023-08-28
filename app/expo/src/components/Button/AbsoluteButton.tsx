import { Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

interface AbsoluteButtonProps {
  title: string;
}

export default function AbsoluteButton({ title }: AbsoluteButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      activeOpacity={0.98}
      className="absolute bottom-6 right-6"
    >
      <LinearGradient
        colors={['#F0226C', '#F78E48']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.8, y: 0 }}
        className="rounded-full"
      >
        <Text className="font-lg mx-2.5 p-2.5 text-4xl text-zinc-100">
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
