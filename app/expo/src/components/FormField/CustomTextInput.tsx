import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  errorMessage?: string;
}

export const CustomTextInput = ({
  errorMessage,
  ...textInputProps
}: CustomTextInputProps) => {
  return (
    <View className="mb-4">
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        {...textInputProps}
        className="h-14 w-[370] rounded-2xl border-2 border-orange-500 px-6 font-poppins"
      />
      {!!errorMessage && (
        <Text
          testID={textInputProps.testID + '-error'}
          className="mt-2 font-poppins text-sm text-red-500"
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
