import { Image } from 'expo-image';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/Icon/TabBarIcon';

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
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: 'Poppins',
            textAlign: 'left',
          },
          tabBarActiveTintColor: '#FC6873',
          headerRight: () => (
            <Image
              source={require('../../../assets/images/profile.png')}
              contentFit="contain"
              style={{
                width: 40,
                height: 40,
                right: 20,
              }}
            />
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
