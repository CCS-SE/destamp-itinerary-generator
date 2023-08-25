import { View } from 'react-native';
import ProfileMenuList from '~/components/Menu/ProfileMenu/ProfileMenuList';
import StampDisplayEmptyState from '~/screens/Profile/StampDisplayEmptyState';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center p-5 bg-gray-50">
      <StampDisplayEmptyState />
      <ProfileMenuList
        onPress={() => { }}
      />
    </View>
  );
}
