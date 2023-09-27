import { View } from 'react-native';
import Modal from 'react-native-modal';

interface BottomHalfModalProps {
  isVisible: boolean;
  children: string | JSX.Element | JSX.Element[];
  onClose: () => void;
}

function BottomHalfModal({
  isVisible,
  children,
  onClose,
}: BottomHalfModalProps) {
  return (
    <Modal
      testID="modal"
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={'down'}
      onSwipeComplete={onClose}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={700}
      backdropTransitionOutTiming={700}
      className="-mx-0 "
    >
      <View className="absolute -bottom-5 h-auto w-full rounded-t-3xl bg-white">
        <View
          testID="modal-menus"
          style={{ alignSelf: 'center' }}
          className=" mt-2.5 h-2 w-12 rounded-2xl bg-slate-300"
        />
        {children}
      </View>
    </Modal>
  );
}

export default BottomHalfModal;
