import type { ReactNode } from 'react';
import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { supabase } from 'config/initSupabase';

import ProfileMenuItem from './ProfileMenuItem';

function ProfileMenuList() {
  const [profileMenu] = useState<ProfileMenu[]>(profileMenus);

  return (
    <FlatList
      data={profileMenu}
      renderItem={({ item }) => (
        <ProfileMenuItem onPress={item.onPress!} item={item} />
      )}
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
    onPress: handleLogout,
  },
  {
    icon: <MaterialIcons name="subscriptions" color={'#727272'} size={24} />,
    title: 'Payment & Subscription',
    color: '#727272',
    onPress: handleLogout,
  },
  {
    icon: <MaterialIcons name="logout" color={'#FB2E53'} size={22} />,
    title: 'Logout',
    color: '#FB2E53',
    onPress: handleLogout,
  },
];

export default ProfileMenuList;
