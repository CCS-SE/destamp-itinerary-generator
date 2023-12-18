import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from 'config/initSupabase';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  CreateUserDocument,
  GetBusinessOperatorBusinessDocument,
  GetTripsDocument,
  MutationCreateUserArgs,
} from '~/graphql/generated';
import GradientButton from '../Button/GradientButton';
import { CustomTextInput } from '../FormField/CustomTextInput';
import { AddProfileSchema, addProfileSchema } from './schema/addProfileSchema';

export default function AddProfileForm() {
  const { email, password, type } = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useForm<AddProfileSchema>({
    mode: 'onChange',
    resolver: zodResolver(addProfileSchema),
  });

  const [createUser] = useMutation(CreateUserDocument);

  const onSubmit: SubmitHandler<AddProfileSchema> = async (input) => {
    setIsSubmitting(true);

    const { error, data } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
      options: {
        data: {
          userType: type as string,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      },
    });

    if (error) Alert.alert('Sign Up Error', error.message);
    else if (data && data.user) {
      const createUserInput: MutationCreateUserArgs = {
        type: type as string,
        input: {
          id: data!.user.id,
          email: email as string,
          password: password as string,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      };

      await createUser({
        variables: {
          type: createUserInput.type,
          input: createUserInput.input,
        },
        onError: (err) => {
          Alert.alert('Error', err.message);
        },
        refetchQueries: [
          {
            query: GetTripsDocument,
            variables: {
              userId: data.user.id,
            },
          },
          {
            query: GetBusinessOperatorBusinessDocument,
            variables: {
              userId: data.user.id,
            },
          },
        ],
      });
    }
  };

  return (
    <View className="items-center justify-center">
      <Controller
        control={control}
        name="firstName"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View>
              <CustomTextInput
                testID="firstName-input"
                placeholder="First Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={error?.message}
                autoComplete="given-name"
              />
            </View>
          );
        }}
      />
      <Controller
        control={control}
        name="lastName"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <CustomTextInput
              testID="lastName-input"
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={error?.message}
              autoComplete="family-name"
            />
          );
        }}
      />
      <View testID="add-profile-btn" className="mb-12 items-center">
        <GradientButton
          onPress={handleSubmit(onSubmit)}
          title="Save"
          isSubmitting={isSubmitting}
        />
      </View>
    </View>
  );
}
