import type { ReactNode } from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import ProfileMenuItem from './ProfileMenuItem';

interface ProfileMenuListProps {
  onPress: () => void;
  item?: ProfileMenu;
}

function ProfileMenuList({ onPress }: ProfileMenuListProps) {
  const [profileMenu] = useState<ProfileMenu[]>(profileMenus);

  return (
    <FlatList
      data={profileMenu}
      renderItem={({ item }) => (
        <ProfileMenuItem onPress={onPress} item={item} />
      )}
      scrollEnabled={false}
    />
  );
}

interface ProfileMenu {
  icon: ReactNode;
  title: string;
  color: string;
}

const profileMenus: ProfileMenu[] = [
  {
    icon: <AntDesign name="user" color={'#727272'} size={26} />,
    title: 'Edit Profile',
    color: '#727272',
  },
  {
    icon: <MaterialIcons name="subscriptions" color={'#727272'} size={24} />,
    title: 'Payment & Subscription',
    color: '#727272',
  },
  {
    icon: <MaterialIcons name="logout" color={'#FB2E53'} size={22} />,
    title: 'Logout',
    color: '#FB2E53',
  },
];

export default ProfileMenuList;
