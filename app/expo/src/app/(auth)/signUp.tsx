import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { Link, Stack } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';

import SignUpForm from '~/components/Forms/SignupForm';

export default function SignUpScreen() {
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className="mt-24 flex-1 bg-transparent"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="mb-6 w-[350] self-center font-poppins text-xl text-orange-500">
          Start with creating an account
        </Text>
        <SignUpForm />
        <View className="mt-3 flex-row items-center justify-center">
          <Text className="mr-1 font-poppins text-base text-slate-700">
            Already a Destamp user?
          </Text>
          <Link
            href="/(auth)/login"
            className="font-poppins text-base text-orange-500"
          >
            Login
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
