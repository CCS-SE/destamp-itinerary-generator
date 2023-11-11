import { useContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';

import ProfileIcon from '~/components/Icon/ProfileIcon';
import ProfileMenuList from '~/components/Menu/ProfileMenu/ProfileMenuList';
import ProfileScreenSkeleton from '~/components/Skeleton/ProfileScreenSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import { GetTravelerInfoDocument } from '~/graphql/generated';
import StampDisplayEmptyState from '~/screens/Traveler/Profile/StampDisplayEmptyState';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(GetTravelerInfoDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  if (loading && !data) {
    return <ProfileScreenSkeleton />;
  }

  const width = Dimensions.get('window').width * 0.88;

  return (
    <View className="flex-1 items-center bg-gray-50 pt-7">
      <SafeAreaView className="flex-0 mb-5 self-start ">
        <View
          className="mx-5 flex-row items-center rounded-2xl bg-gray-100 p-4"
          style={{ width: width }}
        >
          <ProfileIcon
            firstName={data?.traveler.firstName}
            lastName={data?.traveler.lastName}
          />
          <View className="mx-5">
            <Text className="font-poppins text-xl text-gray-500">{`Hi, ${data?.traveler.firstName}`}</Text>
            <Text className="font-poppins text-xs text-gray-500">
              {data?.user.email}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <StampDisplayEmptyState />
      <ProfileMenuList />
    </View>
  );
}
