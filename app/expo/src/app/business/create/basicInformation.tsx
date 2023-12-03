import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import axios from 'axios';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Map from '~/components/BusinessOperator/Map';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CustomContainer from '~/components/Container/CustomContainer';

interface FormData {
  latitude: string;
  longitude: string;
  address: string;
  businessName: string;
  description: string;
  contactNumber: string;
}

const BusinessBasicInformation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    latitude: '',
    longitude: '',
    address: '',
    businessName: '',
    description: '',
    contactNumber: '',
  });
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {},
  );
  const googleMapsKey = Constants.expoConfig?.extra
    ?.GOOGLE_MAPS_API_KEY as string;

  const handleInputChange = async (
    field: keyof FormData,
    value: string,
  ): Promise<void> => {
    const trimmedValue = value.trim();

    if (field === 'businessName' && trimmedValue.split(/\s+/).length > 10) {
      setValidationErrors({
        ...validationErrors,
        [field]: 'Exceeded maximum word limit (10 words).',
      });
    } else if (field === 'description' && trimmedValue.length > 2000) {
      setValidationErrors({
        ...validationErrors,
        [field]: `Exceeded maximum character limit (2000 characters).`,
      });
    } else {
      setFormData({ ...formData, [field]: trimmedValue });
      setValidationErrors({ ...validationErrors, [field]: '' });

      if (field === 'address') {
        console.log('Address before API call:', trimmedValue);

        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              trimmedValue,
            )}&key=${googleMapsKey}`,
          );

          console.log('Geocoding API Response:', response);

          const { results } = response.data;

          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            setFormData({
              ...formData,
              latitude: lat.toString(),
              longitude: lng.toString(),
            });
          }
        } catch (error) {
          console.error('Error fetching geocoding data:', error);
        }
      }
    }
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberRegex = /^(09|\+?639)\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const description_maxCharacters = 2000;

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.businessName.trim()) {
      errors.businessName = 'Business Name is required';
    } else if (formData.businessName.trim().split(/\s+/).length > 10) {
      errors.businessName = 'Business Name cannot exceed 10 words';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.trim().length > description_maxCharacters) {
      errors.description = 'Description cannot exceed 2000 characters';
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = 'Phone Number is required';
    } else if (!validatePhoneNumber(formData.contactNumber.trim())) {
      errors.contactNumber = 'Invalid phone number format';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleNext = (): void => {
    if (validateForm()) {
      // Assuming router.push is a valid function, replace with your actual routing logic
      router.push('/business/create/openingHours');
    }
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Basic Information'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Question question={'About'} />
          <CustomContainer
            placeholder={'Business Name'}
            width={300}
            value={formData.businessName}
            onChangeText={(text) => handleInputChange('businessName', text)}
          />
          {validationErrors.businessName && (
            <Text style={{ color: 'red', marginBottom: 10 }}>
              {validationErrors.businessName}
            </Text>
          )}
          <CustomContainer
            placeholder={'Description'}
            width={300}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            multiline={true}
          />
          {validationErrors.description && (
            <Text style={{ color: 'red', marginBottom: 10 }}>
              {validationErrors.description}
            </Text>
          )}
          <Question question={'Contact Information'} />
          <CustomContainer
            placeholder={'Contact Number'}
            width={300}
            value={formData.contactNumber}
            onChangeText={(text) => handleInputChange('contactNumber', text)}
            numeric={true}
          />
          <Text style={{ color: 'red', marginBottom: 10 }}>
            {validationErrors.contactNumber}
          </Text>
          <Question question={'Address'} />
          <CustomContainer
            placeholder={'Address (Province, City, Street)'}
            width={300}
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
          <Map
            latitude={formData.latitude}
            longitude={formData.longitude}
            businessName={formData.businessName}
            address={formData.address}
          />
          <BasicButton title={'Next'} onPress={handleNext} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BusinessBasicInformation;
