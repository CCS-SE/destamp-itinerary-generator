import { Tabs } from "expo-router";
import { TabBarIcon } from "~/components/Icon/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "My Trips",
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'Poppins'
          },
          tabBarActiveTintColor: "#FC6873",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cursor" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'Poppins'
          },
          tabBarActiveTintColor: "#FC6873",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
