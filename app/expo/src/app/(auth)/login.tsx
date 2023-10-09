import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';

import IconButton from '~/components/Button/IconButton';
import LoginForm from '~/components/Forms/LoginForm';

export default function LoginScreen() {
  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      className="top-44 flex-1 bg-transparent"
    >
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="mb-6 w-[350] self-center font-poppins-medium text-3xl font-medium text-orange-500">
          Welcome Back!
        </Text>
        <LoginForm />
        <View className="flex-row items-center justify-center">
          <Text className="mr-1 font-poppins text-base font-medium text-slate-700">
            Don't have an account?
          </Text>
          <Link
            href="/(auth)/signUp"
            className="font-poppins text-base font-medium text-orange-500"
          >
            Create account
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
