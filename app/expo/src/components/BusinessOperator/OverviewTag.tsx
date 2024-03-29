import React from 'react';
import { Text, View } from 'react-native';

const OverviewTag = ({
  content,
  icon,
  width,
}: {
  content: string;
  icon: React.ReactElement;
  width?: number;
}) => {
  return (
    <View
      style={{
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        margin: 5,
        borderColor: 'transparent',
        backgroundColor: '#EB4586',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: width || 170,
        padding: 5,
      }}
    >
      <Text style={{ paddingRight: 10, paddingLeft: 5 }}>{icon}</Text>
      <Text style={{ fontFamily: 'Poppins', fontSize: 10, color: 'white' }}>
        {content}
      </Text>
    </View>
  );
};

export default OverviewTag;
