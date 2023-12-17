import { useContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';

import ProfileIcon from '~/components/Icon/ProfileIcon';
import BusinessProfileMenuList from '~/components/Menu/ProfileMenu/BusinessProfileMenuList';
import BusinessProfileScreenSkeleton from '~/components/Skeleton/BusinessProfileScreenSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import { GetOperatorInfoDocument } from '~/graphql/generated';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(GetOperatorInfoDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  if (loading && !data) {
    return <BusinessProfileScreenSkeleton />;
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
              <TouchableOpacity>
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
      <BusinessProfileMenuList />
    </View>
  );
}
