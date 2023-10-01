import React from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { router, Stack } from 'expo-router';

import Back from '../../../assets/images/back-icon.svg';
import AbsoluteButton from '../Button/AbsoluteButton';
import Skeleton from './Skeleton';

const ExpenseScreenSkeleton = () => {
  const handleBack = () => {
    return router.back();
  };

  const screenWidth = Dimensions.get('window').width;
  return (
    <>
      <View className="mt-6">
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-0">
          <View className="mx-4 flex-row justify-between">
            <Back height={35} width={35} onPress={handleBack} />
          </View>
        </SafeAreaView>
        <View className="mx-5 flex-row self-center" style={{}}>
          <Skeleton
            height={64}
            width={144}
            style={{ marginHorizontal: 16, marginTop: 8, borderRadius: 16 }}
          />
          <Skeleton
            height={64}
            width={144}
            style={{ marginHorizontal: 16, marginTop: 8, borderRadius: 16 }}
          />
        </View>
        <View className="mt-6 items-center">
          <Skeleton
            height={200}
            width={200}
            style={{ marginHorizontal: 4, marginTop: 6, borderRadius: 100 }}
          />
        </View>
        <View className="mx-8 mt-8 flex-row justify-between">
          <Skeleton
            height={30}
            width={screenWidth / 3}
            style={{ marginHorizontal: 8, marginTop: 4, borderRadius: 8 }}
          />
          <Skeleton
            height={30}
            width={screenWidth / 3}
            style={{ marginHorizontal: 8, marginTop: 4, borderRadius: 8 }}
          />
        </View>
        <View className="mx-9 mt-3 flex-row justify-between">
          <View className="flex-row">
            <Skeleton
              height={40}
              width={40}
              style={{ marginLeft: 8, marginTop: 8, borderRadius: 20 }}
            />
            <Skeleton
              height={26}
              width={screenWidth / 3.5}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
          <View>
            <Skeleton
              height={26}
              width={screenWidth / 5}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
        <View className="mx-9 mt-2 flex-row justify-between">
          <View className="flex-row">
            <Skeleton
              height={40}
              width={40}
              style={{ marginLeft: 8, marginTop: 8, borderRadius: 20 }}
            />
            <Skeleton
              height={26}
              width={screenWidth / 3}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
          <View>
            <Skeleton
              height={26}
              width={screenWidth / 7}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
        <View className="mx-9 mt-2 flex-row justify-between">
          <View className="flex-row">
            <Skeleton
              height={40}
              width={40}
              style={{ marginLeft: 8, marginTop: 8, borderRadius: 20 }}
            />
            <Skeleton
              height={26}
              width={screenWidth / 6.5}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
          <View>
            <Skeleton
              height={26}
              width={screenWidth / 7}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
        <View className="mx-9 mt-2 flex-row justify-between">
          <View className="flex-row">
            <Skeleton
              height={40}
              width={40}
              style={{ marginLeft: 8, marginTop: 8, borderRadius: 20 }}
            />
            <Skeleton
              height={26}
              width={screenWidth / 6}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
          <View>
            <Skeleton
              height={26}
              width={screenWidth / 4}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
        <View className="mx-9 mt-2 flex-row justify-between">
          <View className="flex-row">
            <Skeleton
              height={40}
              width={40}
              style={{ marginLeft: 8, marginTop: 8, borderRadius: 20 }}
            />
            <Skeleton
              height={26}
              width={screenWidth / 3}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
          <View>
            <Skeleton
              height={26}
              width={screenWidth / 7}
              style={{
                marginHorizontal: 8,
                marginTop: 16,
                borderRadius: 8,
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
      </View>
      <AbsoluteButton
        title="+"
        onPress={() => {}}
        className="bottom-8 right-7"
      />
    </>
  );
};

export default ExpenseScreenSkeleton;
