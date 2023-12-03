import { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { useQuery } from '@apollo/client';

import { FlipCardComponent } from '~/components/Card/traveler/FlipCard';
import { AuthContext } from '~/context/AuthProvider';
import { GetUserInfoDocument } from '~/graphql/generated';
import Back from '../../../assets/images/back-btn.svg';

export default function StampScreen() {
  const { user } = useContext(AuthContext);

  const { data } = useQuery(GetUserInfoDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  const handleBackButtonPress = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: ' Stamps',
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
      {data &&
        data.user.stamps.map((stamp) => (
          <View key={stamp.id} className="flex-row p-5">
            <FlipCardComponent url={stamp.image.url} title={stamp.title} />
          </View>
        ))}
    </View>
  );
}
