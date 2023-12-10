import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ActivityIndicator size="large" color={'gray'} />
    </View>
  );
}
