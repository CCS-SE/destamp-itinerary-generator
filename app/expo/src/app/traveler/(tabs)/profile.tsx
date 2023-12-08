import { useContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';

import StampCard from '~/components/Card/traveler/StampCard';
import StampDisplayEmptyState from '~/components/EmptyState/StampDisplayEmptyState';
import ProfileIcon from '~/components/Icon/ProfileIcon';
import ProfileMenuList from '~/components/Menu/ProfileMenu/ProfileMenuList';
import ProfileScreenSkeleton from '~/components/Skeleton/ProfileScreenSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import { GetUserInfoDocument } from '~/graphql/generated';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(GetUserInfoDocument, {
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
          {data && (
            <TouchableOpacity>
              <ProfileIcon
                firstName={data.user.firstName}
                lastName={data.user.lastName}
              />
            </TouchableOpacity>
          )}
          <View className="mx-5">
            <Text className="font-poppins text-xl text-gray-500">{`Hi, ${data?.user.firstName}`}</Text>
            {data && (
              <Text className="font-poppins text-xs text-gray-500">
                {data.user.email}
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
      {data && data.user.stamps.length !== 0 ? (
        <StampCard url={data?.user.stamps[0]?.image.url || ''} />
      ) : (
        <StampDisplayEmptyState />
      )}
      <ProfileMenuList />
    </View>
  );
}
