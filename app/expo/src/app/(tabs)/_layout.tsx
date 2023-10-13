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
