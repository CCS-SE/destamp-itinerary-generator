import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
  const [isTelSelected, setIsTelSelected] = useState(false);

  const { control, handleSubmit } = useForm<BusinessInfoSchema>({
    mode: 'onChange',
    resolver: zodResolver(businessInfoSchema),
  });

  const onSubmit: SubmitHandler<BusinessInfoSchema> = async (data) => {
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
        padding: 25,
      }}
    >
      <CreateBusinessHeader title={'Create Business'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
                    !isTelSelected ? (
                      <Text className="mr-2 justify-center text-center font-poppins-medium text-lg text-orange-500">
                        {'+63'}
                      </Text>
                    ) : (
                      <></>
                    )
                  }
                  placeholder="Contact Number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={error?.message}
                  keyboardType="phone-pad"
                  width={300}
                  errorWidth={220}
                  maxLength={10}
                />
              );
            }}
          />
          <View className="mt-1.5 flex-row">
            <TouchableOpacity
              className="ml-1"
              activeOpacity={0.9}
              onPress={() => setIsTelSelected(!isTelSelected)}
            >
              <View className="h-5 w-5 items-center justify-center rounded-md border">
                <Text>{isTelSelected ? '✓' : ''}</Text>
              </View>
            </TouchableOpacity>
            <Text className="ml-1 font-poppins text-sm">Tel</Text>
          </View>
        </View>
        <Question question={'Address'} />
        <View className="p-2">
          <Text className="font-poppins">{basicInfo.address}</Text>
        </View>
        <Map />
      </ScrollView>
      <StepperButton onPress={handleSubmit(onSubmit)} label={'Next'} />
    </View>
  );
};

export default BusinessBasicInformation;
