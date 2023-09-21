import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from 'config/initSupabase';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  CreateUserDocument,
  MutationCreateUserArgs,
  UserType,
} from '~/graphql/generated';
import GradientButton from '../Button/GradientButton';
import ShowPasswordIcon from '../Icon/ShowPasswordIcon';
import { CustomTextInput } from './CustomTextInput';
import { SignUpSchema, signUpSchema } from './schema/signupSchema';

export const CreateUser = gql(
  `mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }`,
);

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const { handleSubmit, control } = useForm<SignUpSchema>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  });

  const [createProgram] = useMutation(CreateUserDocument);

  const onSubmit: SubmitHandler<SignUpSchema> = async (input) => {
    setIsSubmitting(true);

    const { error, data } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });

    if (error) Alert.alert('Sign Up Error', error.message);
    else if (data && data.user) {
      const createUserInput: MutationCreateUserArgs = {
        data: {
          id: data.user!.id,
          userType: UserType.Traveler,
          email: input.email,
          password: input.password,
        },
      };

      await createProgram({
        variables: {
          data: createUserInput.data,
        },
        onError: (err) => {
          Alert.alert('Error', err.message);
        },
      });

      setIsSubmitting(false);
    }
  };

  return (
    <View className="items-center">
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View>
              <CustomTextInput
                testID="email-input"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                errorMessage={error?.message}
              />
            </View>
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View className="flex-row">
              <CustomTextInput
                testID="password-input"
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={error?.message}
                secureTextEntry={hidePassword}
              />
              <ShowPasswordIcon
                hidePassword={hidePassword}
                onPress={() => setHidePassword(!hidePassword)}
                testID="show-password-icon"
              />
            </View>
          );
        }}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View className="flex-row">
              <CustomTextInput
                testID="confirm-password-input"
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={error?.message}
                secureTextEntry={hideConfirmPassword}
              />
              <ShowPasswordIcon
                hidePassword={hideConfirmPassword}
                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                testID="show-confirm-icon"
              />
            </View>
          );
        }}
      />
      <View testID="sign-up-btn" className="mb-12 items-center">
        <GradientButton
          onPress={handleSubmit(onSubmit)}
          title="Create Account"
          isSubmitting={isSubmitting}
        />
      </View>
      <Text
        testID="bottom-text"
        className="mb-1 font-poppins text-lg font-normal text-gray-500"
      >
        Or login with
      </Text>
    </View>
  );
}
