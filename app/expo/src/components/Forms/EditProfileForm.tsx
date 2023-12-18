import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  EditUserDocument,
  GetOperatorInfoDocument,
  MutationEditUserArgs,
} from '~/graphql/generated';
import { GetTravelerInfoQuery } from '~/graphql/query/User/user.query';
import GradientButton from '../Button/GradientButton';
import { CustomTextInput } from '../FormField/CustomTextInput';
import {
  EditProfileSchema,
  editProfileSchema,
} from './schema/editProfileSchema';

export default function EditProfileForm({
  id,
  firstName,
  lastName,
}: {
  id: string;
  firstName: string;
  lastName: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useForm<EditProfileSchema>({
    mode: 'onChange',
    resolver: zodResolver(editProfileSchema),
  });

  const [editUser] = useMutation(EditUserDocument);

  const onSubmit: SubmitHandler<EditProfileSchema> = async (input) => {
    setIsSubmitting(true);

    const editUserInput: MutationEditUserArgs = {
      userId: id,
      input: {
        firstName: input.firstName,
        lastName: input.lastName,
      },
    };

    await editUser({
      variables: {
        userId: editUserInput.userId,
        input: editUserInput.input,
      },
      onCompleted: () => {
        setIsSubmitting(false);
        router.back();
      },
      onError: (err) => {
        Alert.alert('Error', err.message);
      },
      refetchQueries: [
        {
          query: GetOperatorInfoDocument,
          variables: {
            userId: id,
          },
        },
        {
          query: GetTravelerInfoQuery,
          variables: {
            userId: id,
          },
        },
      ],
    });
  };

  return (
    <View className="mt-10 items-center justify-center">
      <Controller
        control={control}
        name="firstName"
        defaultValue={firstName}
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
        defaultValue={lastName}
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
