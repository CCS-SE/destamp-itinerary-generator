import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

interface RightSlideModalProps {
  isVisible: boolean;
  children: string | JSX.Element | JSX.Element[];

  onClose: () => void;
}

function RightSlideModal({
  isVisible,
  children,
  onClose,
}: RightSlideModalProps) {
  return (
    <Modal
      testID="modal"
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={'right'}
      onSwipeComplete={onClose}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={700}
      backdropTransitionOutTiming={700}
      className="-mx-0"
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          testID="modal-menus"
          style={{
            width: 300,
            height: 400,
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 20,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

export default RightSlideModal;
