import { Text, View } from 'react-native';

interface ProfileIconProps {
  firstName?: string | null;
  lastName?: string | null;
}

export default function ProfileIcon({ firstName, lastName }: ProfileIconProps) {
  return (
    <View className="items-centerjustify-center rounded-full bg-orange-500">
      <View className="flex-row p-3">
        <Text className="-bottom-1 font-poppins-medium text-3xl text-white">
          {firstName ? firstName.charAt(0).toUpperCase() : ''}
        </Text>
        <Text className="-bottom-1 font-poppins-medium text-3xl text-white">
          {lastName ? lastName.charAt(0).toUpperCase() : ''}
        </Text>
      </View>
    </View>
  );
}
