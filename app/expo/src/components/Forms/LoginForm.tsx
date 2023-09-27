import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from 'config/initSupabase';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import GradientButton from '../Button/GradientButton';
import { CustomTextInput } from '../FormField/CustomTextInput';
import ShowPasswordIcon from '../Icon/ShowPasswordIcon';
import { LoginSchema, loginSchema } from './schema/loginSchema';

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const { handleSubmit, control } = useForm<LoginSchema>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (input) => {
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error && error.name == 'AuthApiError')
      Alert.alert('Sign In Error', 'Wrong email or password.');

    setIsSubmitting(false);
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
                errorMessage={error?.message}
                keyboardType="email-address"
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
      <View testID="login-btn" className="mb-12 items-center">
        <GradientButton
          onPress={handleSubmit(onSubmit)}
          title="Login"
          isSubmitting={isSubmitting}
        />
      </View>
      <Text
        testID="login-with-text"
        className="font-poppins text-lg font-normal text-gray-500"
      >
        Or login with
      </Text>
    </View>
  );
}
