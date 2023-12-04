import React from 'react';
import { Text, View } from 'react-native';

const Question = ({ question }: { question: string }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          fontFamily: 'Poppins',
          fontSize: 18,
          color: '#FF8439',
          fontWeight: '600',
        }}
      >
        {question}
      </Text>
    </View>
  );
};

export default Question;
