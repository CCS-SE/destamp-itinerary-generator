import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <View>
      <SafeAreaView edges={['top']} className="flex-0">
        <View className="mx-4 flex-row justify-between">
          <Back height={45} width={45} onPress={handleBack} />
          <View className="flex-row items-end">
            <Map height={45} width={45} style={{ marginRight: 12 }} />
            <Expense height={45} width={45} />
          </View>
        </View>
      </SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        className="relative mt-36  flex-1"
        edges={['left', 'right']}
      ></SafeAreaView>
      <View
        style={{
          elevation: 1,
          width: screenWidth,
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 2,
          alignItems: 'center',
          backgroundColor: '#fff',
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
          paddingTop: 10,
        }}
      >
        <Skeleton
          width={skeWidth * 0.97}
          height={80}
          style={{ borderRadius: 16, marginTop: 16 }}
        />
        <Skeleton
          width={skeWidth * 0.97}
          height={80}
          style={{ borderRadius: 16, marginTop: 24 }}
        />
        <Skeleton
          width={skeWidth * 0.77}
          height={74}
          style={{ borderRadius: 16, marginTop: 24, marginLeft: 68 }}
        />
        <Skeleton
          width={skeWidth * 0.77}
          height={200}
          style={{
            borderRadius: 16,
            marginTop: 24,
            marginLeft: 68,
          }}
        />
        <Skeleton
          width={skeWidth * 0.77}
          height={58}
          style={{ borderRadius: 14, marginTop: 17, marginLeft: 68 }}
        />
        <Skeleton
          width={skeWidth * 0.77}
          height={160}
          style={{
            borderRadius: 16,
            marginTop: 24,
            marginLeft: 68,
          }}
        />
      </View>
    </View>
  );
};

export default ItineraryScreenSkeleton;
