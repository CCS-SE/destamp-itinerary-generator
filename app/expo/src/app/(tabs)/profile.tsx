import { View } from 'react-native';

import StampDisplayEmptyState from '~/app/(auth)/StampDisplayEmptyState';
import ProfileMenuList from '~/components/Menu/ProfileMenu/ProfileMenuList';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center bg-gray-50 p-5">
      <StampDisplayEmptyState />
      <ProfileMenuList />
    </View>
  );
}
