import type { ReactNode } from 'react';
import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { supabase } from 'config/initSupabase';

import ProfileMenuItem from './ProfileMenuItem';

function ProfileMenuList() {
  const [profileMenu] = useState<ProfileMenu[]>(profileMenus);
  const { isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <FlatList
      testID="profile-menu-list"
      data={profileMenu}
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

interface ProfileMenu {
  icon: ReactNode;
  title: string;
  color: string;
  onPress?: () => void;
}

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    Alert.alert('Error Signing Out User', error.message);
  }
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
    onPress: () => undefined,
  },
  {
    icon: <MaterialIcons name="logout" color={'#FB2E53'} size={22} />,
    title: 'Logout',
    color: '#FB2E53',
    onPress: handleLogout,
  },
];

export default ProfileMenuList;
