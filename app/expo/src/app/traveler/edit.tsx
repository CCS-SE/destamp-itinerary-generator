import { TouchableOpacity, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';

import EditProfileForm from '~/components/Forms/EditProfileForm';
import { GetTravelerInfoDocument } from '~/graphql/generated';
import Back from '../../../assets/images/back-btn.svg';

export default function EditProfileScreen() {
  const { id } = useLocalSearchParams();

  const { data } = useQuery(GetTravelerInfoDocument, {
    variables: {
      userId: id as string,
    },
  });

  const handleBackButtonPress = () => {
    router.back();
  };
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: ' Edit Profile',
          headerTitleStyle: {
            color: '#504D4D',
            fontSize: 20,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackButtonPress}>
              <Back height={25} width={25} />
            </TouchableOpacity>
          ),
        }}
      />
      {data && (
        <EditProfileForm
          id={id as string}
          firstName={data.user.firstName}
          lastName={data.user.lastName}
        />
      )}
    </View>
  );
}
