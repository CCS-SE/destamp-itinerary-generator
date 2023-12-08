import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function MyBusinessEmptyState() {
  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/business/create/basicInformation');
  };

  return (
    <View
      testID="my-trip-empty-state"
      className="flex-1 items-center justify-center bg-white"
    >
      <Text
        testID="empty-state-title"
        className="pt-3 font-poppins text-lg font-normal text-slate-600"
      >
        You have no business yet
      </Text>
      <Text
        testID="empty-state-subtitle"
        className="px-2 pb-5 font-poppins text-base font-normal text-slate-500"
      >
        Start adding your business profile!
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        onPress={onPress}
      >
        <LinearGradient
          colors={['#fd8139', '#f65a82']}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0.8, y: 0 }}
          className="rounded-lg shadow-lg"
        >
          <Text
            testID="empty-state-create-btn"
            className="mx-6 p-2.5 font-poppins text-lg font-medium text-zinc-100"
          >
            Add Business
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
