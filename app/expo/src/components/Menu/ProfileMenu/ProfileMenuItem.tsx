import type { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}
    >
      <View className="w-[360]">
        <View className="mt-5 flex-row items-center rounded-xl bg-white p-4">
          {item?.icon}
          <Text style={{ color: item?.color }} className="ml-5 text-xl">
            {item?.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProfileMenuItem;
