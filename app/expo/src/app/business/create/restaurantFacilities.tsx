import React from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import AtmosphereSelection from '~/components/BusinessOperator/EstablishmentTypes/AtmosphereSelection';
import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import StepperButton from '~/components/Button/StepperButton';
import CustomContainer from '~/components/Container/CustomContainer';
import MultiSelection from '~/components/FormField/MultiSelection';
import {
  RestaurantSchema,
  restaurantSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import { GetPoiFacilitiesDocument } from '~/graphql/generated';
import addBusinessFormStore from '~/store/addBusinessFormStore';

const RestaurantFacilities = () => {
  const { restaurantFacilities, setData } = addBusinessFormStore();
  const { data } = useQuery(GetPoiFacilitiesDocument);

  const { control, handleSubmit } = useForm<RestaurantSchema>({
    mode: 'onChange',
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit: SubmitHandler<RestaurantSchema> = async (data) => {
    setData({
      step: 6,
      data: {
        ...restaurantFacilities,
        categories: restaurantFacilities.categories,
        atmpospheres: restaurantFacilities.atmpospheres,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
      },
    });

    if (restaurantFacilities.categories.length === 0) {
      Alert.alert('Please select atleast one category.');
      return;
    }
    if (restaurantFacilities.atmpospheres.length === 0) {
      Alert.alert('Please select atleast one dining atmosphere.');
      return;
    }
    router.push('/business/create/businessImages');
  };
  const categories = data?.restaurantCategoires.map((c) => ({
    key: c.id,
    value: c.name,
  }));

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Create Business'} />
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="mx-7">
            <Question question={'Category'} />
            <MultiSelection
              placeholder="Categories"
              data={(data && categories) || []}
              initialSelectedOptions={[]}
              onOptionChange={(options) =>
                setData({
                  step: 6,
                  data: { ...restaurantFacilities, categories: options },
                })
              }
            />
            <View className="mt-7">
              <Question question={'Atmosphere'} />
              <AtmosphereSelection
                onOptionChange={(options) =>
                  setData({
                    step: 6,
                    data: { ...restaurantFacilities, atmpospheres: options },
                  })
                }
                initialSelectedOptions={restaurantFacilities.atmpospheres}
              />
            </View>
            <Question question={'Meal price range per person'} />
            <View className="flex-row justify-between">
              <Controller
                control={control}
                name="minPrice"
                defaultValue={restaurantFacilities.minPrice}
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
                      placeholder={'Min price'}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={error?.message}
                      multiline={true}
                      inputMode="numeric"
                      width={150}
                      errorWidth={160}
                      maxLength={9}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="maxPrice"
                defaultValue={restaurantFacilities.maxPrice}
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
                      placeholder={'Max price'}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={error?.message}
                      multiline={true}
                      inputMode="numeric"
                      width={150}
                      errorWidth={160}
                    />
                  );
                }}
              />
            </View>
          </View>
          <StepperButton
            label={'Next'}
            onPress={handleSubmit(onSubmit)}
            className="mt-10"
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RestaurantFacilities;
