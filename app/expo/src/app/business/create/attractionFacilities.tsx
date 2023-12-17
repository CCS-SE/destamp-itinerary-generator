import React from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import StepperButton from '~/components/Button/StepperButton';
import CustomContainer from '~/components/Container/CustomContainer';
import MultiSelection from '~/components/FormField/MultiSelection';
import {
  AttractionSchema,
  attractionSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import { GetPoiFacilitiesDocument } from '~/graphql/generated';
import addBusinessFormStore from '~/store/addBusinessFormStore';

const AttractionFacilities = () => {
  const { attractionFacilities, setData } = addBusinessFormStore();

  const { data } = useQuery(GetPoiFacilitiesDocument);

  const { control, handleSubmit } = useForm<AttractionSchema>({
    mode: 'onChange',
    resolver: zodResolver(attractionSchema),
  });

  const onSubmit: SubmitHandler<AttractionSchema> = async (data) => {
    setData({
      step: 5,
      data: {
        ...attractionFacilities,
        categories: attractionFacilities.categories,
        price: data.admissionFee,
      },
    });

    if (attractionFacilities.categories.length === 0) {
      Alert.alert('Please select at least one category.');
      return;
    }

    router.push('/business/create/businessImages');
  };

  const categories = data?.attractionCategoires.map((c) => ({
    key: c.id,
    value: c.name,
  }));

  return (
    <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 40 }}>
      <CreateBusinessHeader title={'Create Business'} />
      <View className="flex-1 px-2 py-7">
        <ScrollView>
          <View>
            <Question question={'Select Category'} />
            <MultiSelection
              data={(data && categories) || []}
              initialSelectedOptions={attractionFacilities.categories}
              placeholder="Category"
              onOptionChange={(options) => {
                setData({
                  step: 5,
                  data: {
                    ...attractionFacilities,
                    categories: options,
                  },
                });
              }}
            />
          </View>
          <Question question={'Admission Fee'} />
          <Controller
            control={control}
            name="admissionFee"
            defaultValue={attractionFacilities.price}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <CustomContainer
                  prefix={
                    <Text className="mr-1.5 justify-center text-center font-poppins-medium text-2xl text-orange-500">
                      {'₱'}
                    </Text>
                  }
                  placeholder={''}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={error?.message}
                  multiline={true}
                  inputMode="numeric"
                  width={280}
                  maxLength={9}
                />
              );
            }}
          />
        </ScrollView>
        <StepperButton label={'Next'} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default AttractionFacilities;
