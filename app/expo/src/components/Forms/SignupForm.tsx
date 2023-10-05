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
import UnselectedBusinessOwner from '../../../assets/images/businessman-unselected.svg';
import BusinessOwner from '../../../assets/images/businessman.svg';
import UnselectedTraveler from '../../../assets/images/traveler-unselected.svg';
import Traveler from '../../../assets/images/traveler.svg';
import GradientButton from '../Button/GradientButton';
import UserTypeCard from '../Card/UserTypeCard';
import { CustomTextInput } from '../FormField/CustomTextInput';
import ShowPasswordIcon from '../Icon/ShowPasswordIcon';
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

  const [userType, setUserType] = useState<UserType>(UserType.Traveler);

  const handleUserTypeChange = (value: UserType) => {
    setUserType(value);
  };

  const { handleSubmit, control } = useForm<SignUpSchema>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const [createProgram] = useMutation(CreateUserDocument);

  const onSubmit: SubmitHandler<SignUpSchema> = async (input) => {
    setIsSubmitting(true);

    const { error, data } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          user_metadata: {
            role:
              userType === UserType.Traveler ? 'traveler' : 'business_owner',
          },
        },
      },
    });

    if (error) Alert.alert('Sign Up Error', error.message);
    else if (data && data.user) {
      const createUserInput: MutationCreateUserArgs = {
        data: {
          id: data.user!.id,
          userType: userType,
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
      <View className="-top-2 w-[370]">
        <Text className="ml-2.5 self-start font-poppins text-base text-gray-500">
          Choose account type
        </Text>
        <View className="mx-1.5 flex-row justify-between">
          <UserTypeCard
            selectedIcon={<Traveler height={40} width={30} />}
            unselectedIcon={<UnselectedTraveler height={40} width={30} />}
            isSelected={userType === UserType.Traveler}
            title="Traveler"
            onPress={() => handleUserTypeChange(UserType.Traveler)}
          />
          <UserTypeCard
            selectedIcon={<BusinessOwner height={33} width={25} />}
            unselectedIcon={<UnselectedBusinessOwner height={33} width={25} />}
            isSelected={userType === UserType.BusinessOperator}
            title="Business Owner"
            onPress={() => handleUserTypeChange(UserType.BusinessOperator)}
          />
        </View>
      </View>
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
      <View testID="sign-up-btn" className="mb-6 items-center">
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
