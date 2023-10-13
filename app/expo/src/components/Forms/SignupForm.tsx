import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { router } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { UserType } from '~/graphql/generated';
import UnselectedBusinessOwner from '../../../assets/images/businessman-unselected.svg';
import BusinessOwner from '../../../assets/images/businessman.svg';
import UnselectedTraveler from '../../../assets/images/traveler-unselected.svg';
import Traveler from '../../../assets/images/traveler.svg';
import GradientButton from '../Button/GradientButton';
import UserTypeCard from '../Card/UserTypeCard';
import { CustomTextInput } from '../FormField/CustomTextInput';
import ShowPasswordIcon from '../Icon/ShowPasswordIcon';
import BottomHalfModal from '../Modal/BottomHalfModal';
import { SignUpSchema, signUpSchema } from './schema/signupSchema';

interface ErrorJson {
  status: number;
  clerkError: boolean;
  errors: {
    code: string;
    message: string;
    longMessage: string;
    meta: {
      paramName: string;
    };
  }[];
}

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [userType, setUserType] = useState<UserType>(UserType.Traveler);

  const handleUserTypeChange = (value: UserType) => {
    setUserType(value);
  };

  const { handleSubmit, control } = useForm<SignUpSchema>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async (input) => {
    setIsSubmitting(true);

    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: input.email,
        password: input.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err) {
      const error = err as ErrorJson;
      if (error.errors.length > 0) {
        Alert.alert('Error signing up', error.errors[0]!.message);
      }
      setIsSubmitting(false);
    }
  };

  const onPressVerify: SubmitHandler<SignUpSchema> = async (input) => {
    setVerifying(true);
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      setIsSubmitting(false);
      setPendingVerification(false);

      if (completeSignUp && completeSignUp.createdSessionId) {
        router.push({
          pathname: '/(auth)/profile',
          params: {
            email: input.email,
            password: input.password,
            type: userType,
          },
        });
      }
    } catch (err) {
      const error = err as ErrorJson;
      if (error.errors.length > 0) {
        Alert.alert('Email verification error', error.errors[0]!.longMessage);
        console.log(JSON.stringify(err, null, 2));
      }
    }
    setIsSubmitting(false);
    setVerifying(false);
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
      <BottomHalfModal
        isVisible={pendingVerification}
        onClose={() => {
          setPendingVerification(false);
          setIsSubmitting(false);
        }}
      >
        <View className="items-center">
          <Text className="mt-3 text-2xl font-bold">Email Verification</Text>
          <Text className="mt-5 text-center text-lg">
            Please enter the 6-digit code that {'\n'}
            was sent to your email.
          </Text>
        </View>
        <View className="mt-3 items-center">
          <OTPTextInput
            tintColor={'#FB2E53'}
            inputCount={6}
            handleTextChange={(code) => setCode(code)}
          />
        </View>
        <GradientButton
          onPress={handleSubmit(onPressVerify)}
          title="Verify Email"
          isSubmitting={verifying}
        />
      </BottomHalfModal>
    </View>
  );
}
