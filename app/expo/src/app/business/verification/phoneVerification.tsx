import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

import ContactVerification from '~/components/BusinessOperator/contactVerification';
import SimpleButton from '~/components/Button/BasicButton';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';

const PhoneVerification = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  // const [verifying, setVerifying] = useState(false);
  // const [code, setCode] = useState('');

  return (
    <View>
      <ContactVerification phoneNumber={'09496651088'} />
      <SimpleButton
        title={'Send OTP'}
        onPress={() => {
          setPendingVerification(true);
        }}
      />
      <View>
        {pendingVerification && (
          <BottomHalfModal
            isVisible={pendingVerification}
            onClose={() => {
              setPendingVerification(false);
              // setVerifying(false);
            }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Business Operator Verification</Text>
              <Text>
                Please enter the 4-digit code that was sent to the phone number
                provided.
              </Text>
              <OTPTextInput
                tintColor={'#FB2E53'}
                inputCount={4}
                // handleTextChange={(code) => setCode(code)}
              />
            </View>
          </BottomHalfModal>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
export default PhoneVerification;
