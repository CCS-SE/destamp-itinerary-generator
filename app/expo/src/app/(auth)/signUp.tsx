import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

import IconButton from '~/components/Button/IconButton';
import SignUpForm from '~/components/Forms/SignupForm';

export default function SignUpScreen() {
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className="mt-12 flex-1 bg-transparent"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="mb-6 w-[350] self-center font-poppins text-xl text-orange-500">
          Start with creating an account
        </Text>
        <SignUpForm />
        <View className="flex-row items-center justify-center">
          <IconButton
            onPress={() => undefined}
            icon={
              <Entypo name="facebook-with-circle" size={32} color={'#1877F2'} />
            }
          />
          <IconButton
            onPress={() => undefined}
            icon={
              <Image
                source={require('../../../assets/images/google-icon.png')}
                contentFit="scale-down"
                style={{ width: 30, height: 32 }}
              />
            }
          />
        </View>
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
