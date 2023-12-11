import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

interface FancyModalProps {
  isVisible: boolean;
  children: string | JSX.Element | JSX.Element[];
  bgColor?: string;
}

export default function FancyModal({
  isVisible,
  children,
  bgColor,
}: FancyModalProps) {
  return (
    <Modal
      testID={'fancy-modal'}
      isVisible={isVisible}
      backdropColor={bgColor || '#f5dfc8'}
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
    >
      <View className="w-80 self-center rounded-3xl bg-white px-3 py-5">
        {children}
      </View>
    </Modal>
  );
}
