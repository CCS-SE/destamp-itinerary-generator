import type { ReactNode } from 'react';
import { Alert, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { supabase } from 'config/initSupabase';

import ProfileMenuItem from './ProfileMenuItem';

interface ProfileMenu {
  icon: ReactNode;
  title: string;
  color: string;
  onPress?: () => void;
}

function ProfileMenuList() {
  const { isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error Signing Out User', error.message);
    }
  };

  const handleSubscriptionDetails = () => {
    return router.push('/subscription/');
  };

  const profileMenus: ProfileMenu[] = [
    {
      icon: <AntDesign name="user" color={'#727272'} size={26} />,
      title: 'Edit Profile',
      color: '#727272',
      onPress: () => undefined,
    },
    {
      icon: <MaterialIcons name="subscriptions" color={'#727272'} size={24} />,
      title: 'Payment & Subscription',
      color: '#727272',
      onPress: handleSubscriptionDetails,
    },
    {
      icon: <MaterialIcons name="logout" color={'#FB2E53'} size={22} />,
      title: 'Logout',
      color: '#FB2E53',
      onPress: handleLogout,
    },
  ];

  return (
    <FlatList
      testID="profile-menu-list"
      data={profileMenus}
      renderItem={({ item }) =>
        item.title == 'Logout' ? (
          <ProfileMenuItem
            key={item.title}
            onPress={() => {
              item.onPress!();
              signOut();
            }}
            item={item}
          />
        ) : (
          <ProfileMenuItem
            key={item.title}
            onPress={item.onPress!}
            item={item}
          />
        )
      }
      scrollEnabled={false}
    />
  );
}

export default ProfileMenuList;
