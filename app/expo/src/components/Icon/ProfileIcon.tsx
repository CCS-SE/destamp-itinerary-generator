import { Text, View } from 'react-native';

interface ProfileIconProps {
  firstName: string;
  lastName: string;
}

export default function ProfileIcon({ firstName, lastName }: ProfileIconProps) {
  return (
    <View className="items-centerjustify-center rounded-full bg-orange-500">
      <View className="flex-row p-3">
        <Text className="-bottom-1 font-poppins-medium text-4xl text-white">
          {firstName.charAt(0).toUpperCase()}
        </Text>
        <Text className="-bottom-1 font-poppins-medium text-4xl text-white">
          {lastName.charAt(0).toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
