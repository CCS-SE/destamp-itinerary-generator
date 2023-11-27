import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CustomContainer from '~/components/Container/CustomContainer';
import CreateBusinessHeader from '.';

const BusinessBasicInformation = () => {
  // const [businessName, setBusinessName] = useState('');
  // const [description, setDescription] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [province, setProvince] = useState('');
  // const [city, setCity] = useState('');
  // const [streetAddress, setStreetAddress] = useState('');
  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader />
      <SafeAreaView>
        <Question question={'About'} />
        <CustomContainer
          placeholder={'Business Name'}
          height={50}
          width={300}
        />
        <CustomContainer placeholder={'Description'} height={50} width={300} />

        <Question question={'Contact Information'} />
        <CustomContainer placeholder={'Phone Number'} height={50} width={300} />

        <Question question={'Address'} />
        <CustomContainer placeholder={'Province'} height={50} width={300} />
        <CustomContainer placeholder={'City'} height={50} width={300} />
        <CustomContainer
          placeholder={'Street Address'}
          height={50}
          width={300}
        />

        <BasicButton
          title={'Next'}
          onPress={() => {
            router.push('/business/create/openingHours');
          }}
        />
      </SafeAreaView>
    </View>
  );
};
export default BusinessBasicInformation;
