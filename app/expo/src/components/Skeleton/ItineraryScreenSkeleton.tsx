import React from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { router, Stack } from 'expo-router';

import Back from '../../../assets/images/back-icon.svg';
import Expense from '../../../assets/images/expense-icon.svg';
import Map from '../../../assets/images/map-icon.svg';
import Skeleton from './Skeleton';

const ItineraryScreenSkeleton = () => {
  const handleBack = () => {
    return router.back();
  };

  const screenWidth = Dimensions.get('window').width;
  const skeWidth = screenWidth * 0.9;
  return (
    <View className="mt-6 items-center">
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ width: screenWidth }} className="flex-0">
        <View className="mx-4 flex-row justify-between">
          <Back height={45} width={45} onPress={handleBack} />
          <View className="flex-row items-end">
            <Map height={45} width={45} style={{ marginRight: 10 }} />
            <Expense height={45} width={45} />
          </View>
        </View>
        <View className="h-36"></View>
      </SafeAreaView>
      <View
        style={{
          elevation: 3,
          width: screenWidth,
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 4,
          alignContent: 'center',
          backgroundColor: '#fff',
          justifyContent: 'center',
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
          padding: 16,
        }}
      >
        <Skeleton
          width={skeWidth}
          height={80}
          style={{ borderRadius: 16, marginTop: 16 }}
        />
        <Skeleton
          width={skeWidth}
          height={80}
          style={{ borderRadius: 16, marginTop: 24 }}
        />
        <Skeleton
          width={skeWidth * 0.8}
          height={74}
          style={{ borderRadius: 16, marginTop: 24, marginLeft: 68 }}
        />
        <Skeleton
          width={skeWidth * 0.8}
          height={136}
          style={{
            borderBottomStartRadius: 16,
            borderTopStartRadius: 16,
            marginTop: 24,
            marginLeft: 68,
          }}
        />
        <Skeleton
          width={skeWidth / 2}
          height={24}
          style={{ borderRadius: 16, marginTop: 8, marginLeft: 76 }}
        />
        <Skeleton
          width={skeWidth / 2.5}
          height={24}
          style={{ borderRadius: 16, marginTop: 8, marginLeft: 76 }}
        />
        <Skeleton
          width={skeWidth * 0.8}
          height={136}
          style={{
            borderBottomStartRadius: 16,
            borderTopStartRadius: 16,
            marginTop: 24,
            marginLeft: 68,
          }}
        />
      </View>
    </View>
  );
};

export default ItineraryScreenSkeleton;
