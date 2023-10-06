import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

import IconButton from '~/components/Button/IconButton';
import LoginForm from '~/components/Forms/LoginForm';

export default function LoginScreen() {
  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      className="top-28 flex-1 bg-transparent"
    >
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="mb-6 w-80 self-center font-poppins-medium text-3xl font-medium text-orange-500">
          Welcome Back!
        </Text>
        <LoginForm />
        <View className="flex-row items-center justify-center">
          <IconButton
            onPress={() => undefined}
            icon={
              <Entypo name="facebook-with-circle" size={35} color={'#1877F2'} />
            }
          />
          <IconButton
            onPress={() => undefined}
            icon={
              <Image
                source={require('../../../assets/images/google-icon.png')}
                contentFit="scale-down"
                style={{ width: 30, height: 30 }}
              />
            }
          />
        </View>
        <View className="mt-3 flex-row items-center justify-center">
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
