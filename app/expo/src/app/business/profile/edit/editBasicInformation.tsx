import React, { useState } from 'react';
import { Alert, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Map from '~/components/BusinessOperator/Map';
import Question from '~/components/BusinessOperator/Question';
import GradientButton from '~/components/Button/GradientButton';
import CustomContainer from '~/components/Container/CustomContainer';
import {
  BusinessInfoSchema,
  businessInfoSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import {
  EditPoiDocument,
  GetBusinessDetailsDocument,
} from '~/graphql/generated';

const BusinessBasicInformation: React.FC = () => {
  const { poiId, placeType } = useLocalSearchParams();

  const { error, data } = useQuery(GetBusinessDetailsDocument, {
    variables: {
      poiId: poiId as string,
    },
  });

  if (error) {
    Alert.alert('Error', error.message);
  }

  const [name, setName] = useState(data?.poi.name as string);
  const [description, setDescription] = useState(
    data?.poi.description as string,
  );
  const [contactNumber, setContactNumber] = useState(
    data?.poi.contactNumber as string,
  );
  const [address, setAddress] = useState(data?.poi.address as string);
  const [latitude, setLatitude] = useState(data?.poi.latitude as number);
  const [longitude, setLongitude] = useState(data?.poi.longitude as number);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editPoi] = useMutation(EditPoiDocument);

  const { control, handleSubmit } = useForm<BusinessInfoSchema>({
    mode: 'onChange',
    resolver: zodResolver(businessInfoSchema),
  });

  const onSubmit: SubmitHandler<BusinessInfoSchema> = async () => {
    setIsSubmitting(true);
    await editPoi({
      variables: {
        poiId: poiId as string,
        type: placeType as string,
        input: {
          name: name,
          description: description,
          contactNumber: contactNumber,
          address: address,
          latitude: latitude,
          longitude: longitude,
        },
      },
      onCompleted: () => {
        setTimeout(() => {
          router.push(`/business/profile/${poiId}`);
          setIsSubmitting(false);
          ToastAndroid.show('Successfully edited.', 2000);
        }, 5000);
      },
      onError: (err) => {
        setIsSubmitting(false);
        Alert.alert('Error', err.message);
      },
      refetchQueries: [
        {
          query: GetBusinessDetailsDocument,
          variables: {
            poiId: poiId as string,
          },
        },
      ],
    });
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
      <CreateBusinessHeader title={'Edit Business'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Question question={'About'} />
        <Controller
          control={control}
          name="name"
          defaultValue={(name as string) || ''}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => {
            return (
              <CustomContainer
                placeholder={'Business Name'}
                defaultValue={(name as string) || ''}
                onChangeText={(value) => {
                  onChange(value);
                  setName(value);
                }}
                onBlur={onBlur}
                errorMessage={error?.message}
                maxLength={255}
              />
            );
          }}
        />
        <Controller
          control={control}
          name={'description'}
          defaultValue={(description as string) || ''}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => {
            return (
              <CustomContainer
                placeholder={'Description'}
                defaultValue={(description as string) || ''}
                onChangeText={(value) => {
                  onChange(value);
                  setDescription(value);
                }}
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
            defaultValue={contactNumber}
            render={({
              field: { onChange, onBlur },
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
                  defaultValue={contactNumber as string}
                  onChangeText={(value) => {
                    onChange(value);
                    setContactNumber(value);
                  }}
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
        <Map
          latitude={latitude}
          longitude={longitude}
          address={address}
          setEditAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      </ScrollView>
      <GradientButton
        title="Save"
        onPress={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </View>
  );
};

export default BusinessBasicInformation;
