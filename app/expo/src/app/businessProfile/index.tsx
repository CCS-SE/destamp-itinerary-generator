import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import NoTripIcon from '../../../assets/images/empty-trip.svg';

// export const GetBusinessOperatorInfoQuery = gql(
//   `query GetBusinessOperatorInfo($userId: String!) {
//         user(id: $userId) {
//           id
//           email
//           password
//           userType
//         }
//       }`,
// );

export default function BusinessSide() {
  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/businessProfile/create/basicInformation');
  };
  //   const { user } = useContext(AuthContext);
  //   const { data } = useQuery(GetTravelerInfoDocument, {
  //     variables: {
  //       userId: user ? user.id : '',
  //     },
  //   });

  return (
    <View testID="my-trip-empty-state" className="flex-1 items-center bg-white">
      <View className="my-7">
        <NoTripIcon height={300} width={500} />
      </View>
      <View className="text-center">
        <Text className="font-poppins text-xl font-normal text-slate-700">
          Welcome, user!
        </Text>
      </View>
      <Text
        testID="empty-state-subtitle"
        className="px-2 pb-5 font-poppins text-base font-normal text-slate-500"
      >
        Add your business!
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
