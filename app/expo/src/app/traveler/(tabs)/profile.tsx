import { useContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';

import StampCard from '~/components/Card/traveler/StampCard';
import StampDisplayEmptyState from '~/components/EmptyState/StampDisplayEmptyState';
import ProfileIcon from '~/components/Icon/ProfileIcon';
import ProfileMenuList from '~/components/Menu/ProfileMenu/ProfileMenuList';
import ProfileScreenSkeleton from '~/components/Skeleton/ProfileScreenSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import { GetTravelerInfoDocument } from '~/graphql/generated';

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

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height * 0.3;

  return (
    <View className="flex-1 items-center bg-gray-50">
      <View className=" mb-5 self-start ">
        <View
          className="items-center rounded-3xl bg-gray-100 p-4"
          style={{ width: width, height: height }}
        >
          <View className="mt-14">
            {data && (
              <TouchableOpacity activeOpacity={0.9}>
                <ProfileIcon
                  firstName={data.user.firstName}
                  lastName={data.user.lastName}
                />
              </TouchableOpacity>
            )}
          </View>
          <View className="mx-5 mt-5 items-center">
            <Text className="font-poppins-medium text-2xl text-gray-500">{`${data?.user.firstName} ${data?.user.lastName}`}</Text>
            {data && (
              <Text className="font-poppins text-xs text-gray-500">
                {data.user.email}
              </Text>
            )}
          </View>
        </View>
      </View>
      {data && data.user.traveler?.stamps.length !== 0 ? (
        <StampCard url={data?.user.traveler?.stamps[0]?.image.url || ''} />
      ) : (
        <StampDisplayEmptyState />
      )}
      <ProfileMenuList />
    </View>
  );
}
