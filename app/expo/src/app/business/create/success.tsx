import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';

import BasicButton from '~/components/Button/BasicButton';

const SuccessScreen = () => {
  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <View style={{ alignContent: 'center' }}>
        <Stack.Screen
          options={{
            headerShown: false,
            headerBackVisible: false,
          }}
        />
      </View>
      <SafeAreaView>
        <View
          style={{ alignSelf: 'center', marginTop: 200, marginBottom: 100 }}
        >
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 40,
              alignSelf: 'center',
              marginTop: 20,
              color: '#FF8439',
            }}
          >
            SUCCESS!
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 20,
              color: 'gray',
              padding: 30,
              textAlign: 'center',
            }}
          >
            Please allow 2 to 5 business days for us to verify your business.
          </Text>
        </View>
        <BasicButton title="Done" onPress={() => router.push('/business/')} />
      </SafeAreaView>
    </View>
  );
};

export default SuccessScreen;
