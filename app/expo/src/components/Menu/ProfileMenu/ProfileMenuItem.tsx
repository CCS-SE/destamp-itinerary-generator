import { Text, TouchableOpacity, View } from "react-native";

interface ProfileMenu {
  icon: any;
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
        <View className="flex-row items-center bg-white p-4 rounded-xl mt-5">
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
