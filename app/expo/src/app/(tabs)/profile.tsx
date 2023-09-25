import { View } from 'react-native';

import ProfileMenuList from '~/components/Menu/ProfileMenu/ProfileMenuList';
import StampDisplayEmptyState from '~/screens/Profile/StampDisplayEmptyState';

// import BusinessListScreen from '~/screens/BusinessUser/BusinessList';
// import VerificationOption from '~/screens/BusinessUser/VerificationOption';
export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center bg-gray-50 p-5">
      <StampDisplayEmptyState />
      <ProfileMenuList />
      {/* <BusinessListScreen /> */}
      {/* <VerificationOption></VerificationOption> */}
    </View>
  );
}
