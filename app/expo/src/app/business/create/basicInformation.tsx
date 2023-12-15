import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Map from '~/components/BusinessOperator/Map';
import Question from '~/components/BusinessOperator/Question';
import StepperButton from '~/components/Button/StepperButton';
import CustomContainer from '~/components/Container/CustomContainer';
import {
  BusinessInfoSchema,
  businessInfoSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import addBusinessFormStore from '~/store/addBusinessFormStore';

const BusinessBasicInformation: React.FC = () => {
  const { basicInfo, setData, establishment } = addBusinessFormStore();

  const { control, handleSubmit } = useForm<BusinessInfoSchema>({
    mode: 'onChange',
    resolver: zodResolver(businessInfoSchema),
  });

  const onSubmit: SubmitHandler<BusinessInfoSchema> = async (data) => {
    if (!basicInfo.latitude || !basicInfo.longitude) {
      Alert.alert('Please provide address.');
      return;
    }

    setData({
      step: 1,
      data: {
        ...basicInfo,
        contactNumber: data.contactNumber,
        name: data.name,
        description: data.description,
      },
    });

    if (establishment.type === 'Accommodation') {
      router.push('/business/create/accommodationFacilities');
    } else {
      router.push('/business/create/openingHours');
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
      }}
    >
      <CreateBusinessHeader title={'Create Business'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ marginBottom: 10 }}>
          <Question question={'About'} />
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <CustomContainer
                  placeholder={'Business Name'}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={error?.message}
                  maxLength={255}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="description"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <CustomContainer
                  placeholder={'Description'}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={error?.message}
                  multiline={true}
                  inputMode="text"
                  maxLength={255}
                />
              );
            }}
          />
          <Question question={'Contact Information'} />
          <View className="flex-row ">
            <Controller
              control={control}
              name="contactNumber"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => {
                return (
                  <CustomContainer
                    prefix={
                      <Text className="mr-2 justify-center text-center font-poppins-medium text-lg text-orange-500">
                        {'+63'}
                      </Text>
                    }
                    placeholder="Contact Number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                    keyboardType="phone-pad"
                    errorWidth={220}
                    maxLength={10}
                  />
                );
              }}
            />
          </View>
          <Question question={'Address'} />
          <Map />
        </View>
        <StepperButton onPress={handleSubmit(onSubmit)} label={'Next'} />
      </ScrollView>
    </View>
  );
};

export default BusinessBasicInformation;
