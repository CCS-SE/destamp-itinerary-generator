import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import AddProfileForm from '~/components/Forms/AddProfileForm';

export default function AddProfileScreen() {
  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      className="top-48 flex-1 bg-transparent"
    >
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="mx-8 mb-4 font-poppins text-xl text-orange-500">
          What's your name?
        </Text>
        <AddProfileForm />
      </ScrollView>
    </SafeAreaView>
  );
}
