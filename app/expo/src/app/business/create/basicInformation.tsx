import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CustomContainer from '~/components/Container/CustomContainer';

interface FormData {
  businessName: string;
  description: string;
  contactNumber: string;
}

const BusinessBasicInformation = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    description: '',
    contactNumber: '',
  });

  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {},
  );

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setValidationErrors({ ...validationErrors, [field]: '' }); // Clear validation error for the field
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberRegex = /^(09|\+?639)\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.businessName.trim()) {
      errors.businessName = 'Business Name is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = 'Phone Number is required';
    } else if (!validatePhoneNumber(formData.contactNumber.trim())) {
      errors.contactNumber = 'Invalid phone number format';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      router.push('/business/create/openingHours');
    }
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Basic Information'} />
      <SafeAreaView>
        <ScrollView>
          <Question question={'About'} />
          <CustomContainer
            placeholder={'Business Name'}
            height={50}
            width={300}
            value={formData.businessName}
            onChangeText={(text) => handleInputChange('businessName', text)}
          />
          <CustomContainer
            placeholder={'Description'}
            height={50}
            width={300}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
          <Question question={'Contact Information'} />
          <CustomContainer
            placeholder={'Contact Number'}
            height={50}
            width={300}
            value={formData.contactNumber}
            onChangeText={(text) => handleInputChange('contactNumber', text)}
            numeric={true}
          />
          <Text style={{ color: 'red', marginBottom: 10 }}>
            {validationErrors.contactNumber}
          </Text>

          <Question question={'Address'} />

          <BasicButton title={'Next'} onPress={handleNext} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BusinessBasicInformation;
