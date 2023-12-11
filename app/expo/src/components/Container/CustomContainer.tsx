import React, { useState } from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface CustomContainerProps extends TextInputProps {
  errorMessage?: string;
  errorWidth?: number;
  width?: number;
  prefix?: string | JSX.Element | JSX.Element[];
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  errorMessage,
  errorWidth,
  width,
  prefix,
  ...textInputProps
}: CustomContainerProps) => {
  const inputWidth = Dimensions.get('window').width * 0.85;

  const [contentHeight, setContentHeight] = useState(0);

  return (
    <View>
      <View
        className="items-center"
        style={{
          borderWidth: 1,
          borderColor: '#5A5A5A',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          padding: 10,
          marginVertical: 5,
          minHeight: 50,
          width: width || inputWidth,
        }}
      >
        {prefix}
        <TextInput
          className="w-full font-poppins text-lg text-gray-600 "
          {...textInputProps}
          style={{
            height: Math.max(35, contentHeight),
          }}
          onContentSizeChange={(e) => {
            setContentHeight(e.nativeEvent.contentSize.height);
          }}
        />
      </View>
      {!!errorMessage && (
        <Text
          testID={textInputProps.testID + '-error'}
          className=" font-poppins text-xs text-red-500"
          style={{ width: errorWidth || inputWidth }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default CustomContainer;
