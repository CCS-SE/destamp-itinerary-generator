import { View } from 'react-native';

import ProfileMenuList from '~/components/Menu/ProfileMenu/ProfileMenuList';
import StampDisplayEmptyState from '~/screens/Traveler/Profile/StampDisplayEmptyState';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center bg-gray-50 pt-5">
      <StampDisplayEmptyState />
      <ProfileMenuList />
    </View>
  );
}
