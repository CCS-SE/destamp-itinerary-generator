import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import GradientButton from '~/components/Button/GradientButton';
import Logo from '../../../../assets/images/destampp-logo.svg';

const RestaurantFacilities = () => {
  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <View style={{ alignContent: 'center' }}>
        <Stack.Screen
          options={{
            title: '',
            headerTitleStyle: {
              color: '#FF8439',
              fontSize: 20,
              fontFamily: 'Poppins',
            },
            headerShown: false,

            headerBackVisible: false,
            headerRight: () => {
              return (
                <View className="rounded-full p-0.5">
                  <Logo height={45} width={45} />
                </View>
              );
            },
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
        <GradientButton
          onPress={() => router.push('/business/')}
          title={'Done'}
          isSubmitting={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default RestaurantFacilities;
