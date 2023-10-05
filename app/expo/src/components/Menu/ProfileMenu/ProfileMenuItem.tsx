import type { ReactNode } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

interface ProfileMenu {
  icon: ReactNode;
  title: string;
  color: string;
}

interface ProfileMenuItemProps {
  onPress: () => void; // function of each menu
  item: ProfileMenu;
}

function ProfileMenuItem({ onPress, item }: ProfileMenuItemProps) {
  const cardWidth = Dimensions.get('window').width * 0.88;

  return (
    <TouchableOpacity
      testID={`${item.title}-btn`}
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}
    >
      <View testID="profile-menu-item" style={{ width: cardWidth }}>
        <View className="mt-5 flex-row items-center rounded-xl bg-white px-3 py-3 ">
          {item?.icon}
          <Text
            style={{ color: item?.color }}
            className="ml-4 font-poppins text-xl"
          >
            {item?.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProfileMenuItem;
