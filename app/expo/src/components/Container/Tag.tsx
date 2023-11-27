import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Tag = ({
  content,
  tagColor,
  textSize,
  fontColor,
  closeButton,
}: {
  content: string;
  tagColor: string;
  textSize: number;
  fontColor: string;
  closeButton: () => void;
}) => {
  return (
    <View
      style={{
        width: 100,
        borderRadius: 10,
        margin: 3,
        backgroundColor: tagColor,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          marginLeft: 5,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: textSize,
            color: fontColor,
          }}
        >
          {content}
        </Text>
      </View>
      <TouchableOpacity onPress={closeButton}>
        <AntDesign name="close" size={15} color={fontColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Tag;
