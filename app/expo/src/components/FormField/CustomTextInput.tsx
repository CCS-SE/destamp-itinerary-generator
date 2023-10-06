import {
  Dimensions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  errorMessage?: string;
}

export const CustomTextInput = ({
  errorMessage,
  ...textInputProps
}: CustomTextInputProps) => {
  const inputWidth = Dimensions.get('window').width * 0.86;

  return (
    <View className="mb-4">
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        {...textInputProps}
        className="h-14 rounded-2xl border-2 border-orange-500 px-6 font-poppins"
        style={{ width: inputWidth }}
      />
      {!!errorMessage && (
        <Text
          testID={textInputProps.testID + '-error'}
          className="mt-2 font-poppins text-xs text-red-500"
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
