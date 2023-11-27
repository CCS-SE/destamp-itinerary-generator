import { View } from 'react-native';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/Icon/TabBarIcon';
import Logo from '../../../assets/images/destampp-logo.svg';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Trips',
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: 'Poppins',
            textAlign: 'left',
          },
          headerRight: () => {
            return (
              <View className="mr-3 rounded-full p-0.5">
                <Logo height={52} width={52} />
              </View>
            );
          },
          tabBarActiveTintColor: '#FC6873',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cursor" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarActiveTintColor: '#FC6873',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
