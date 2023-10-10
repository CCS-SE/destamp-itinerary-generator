// import React from 'react';
// import { MockedProvider } from '@apollo/client/testing';
// import { fireEvent, render } from '@testing-library/react-native';
// import { act } from 'react-test-renderer';

import { mockSupabaseClient } from '../__mock__/mockSupabaseClient';

// import SignUpForm from '../SignupForm';
// import { ClerkProvider } from '@clerk/clerk-expo';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => mockSupabaseClient),
}));

describe('Sign up Form', () => {
  it('should test', () => {});
  //   it('renders the Sign up form', async () => {
  //     const { getByTestId } = render(
  //       <ClerkProvider
  //       publishableKey={""}
  //     >
  //       <MockedProvider addTypename={false}>
  //         <SignUpForm />
  //       </MockedProvider>,
  //       </ClerkProvider>
  //     );

  //     const emailInput = getByTestId('email-input');
  //     const passwordInput = getByTestId('password-input');
  //     const confirmPasswordInput = getByTestId('confirm-password-input');
  //     const signUpButton = getByTestId('sign-up-btn');

  //     expect(emailInput).toBeTruthy();
  //     expect(passwordInput).toBeTruthy();
  //     expect(confirmPasswordInput).toBeTruthy();
  //     expect(signUpButton).toBeTruthy();
  //   });

  //   it('handles inputs correctly', async () => {
  //     const { getByTestId } = render(
  //       <MockedProvider addTypename={false}>
  //         <SignUpForm />
  //       </MockedProvider>,
  //     );

  //     const emailInput = getByTestId('email-input');
  //     const passwordInput = getByTestId('password-input');
  //     const confirmPasswordInput = getByTestId('confirm-password-input');

  //     await act(async () => {
  //       fireEvent.changeText(emailInput, 'testuser@gmail.com');
  //       fireEvent.changeText(passwordInput, 'testpassword');
  //       fireEvent.changeText(confirmPasswordInput, 'testpassword');
  //     });

  //     expect(emailInput.props.value).toBe('testuser@gmail.com');
  //     expect(passwordInput.props.value).toBe('testpassword');
  //     expect(confirmPasswordInput.props.value).toBe('testpassword');
  //   });

  //   it('unhides password input when unhide icon is pressed', async () => {
  //     const { getByTestId } = render(
  //       <MockedProvider addTypename={false}>
  //         <SignUpForm />
  //       </MockedProvider>,
  //     );

  //     const passwordInput = getByTestId('password-input');
  //     const showPasswordIcon = getByTestId('show-password-icon');
  //     const confirmInput = getByTestId('confirm-password-input');
  //     const showConfirmIcon = getByTestId('show-confirm-icon');

  //     await act(async () => {
  //       fireEvent.press(showPasswordIcon);
  //       fireEvent.press(showConfirmIcon);
  //     });

  //     expect(passwordInput.props.secureTextEntry).toBe(false);
  //     expect(confirmInput.props.secureTextEntry).toBe(false);
  //   });

  //   it('shows input error texts', async () => {
  //     const { getByTestId, getByRole } = render(
  //       <MockedProvider addTypename={false}>
  //         <SignUpForm />
  //       </MockedProvider>,
  //     );

  //     const loginBtn = getByRole('button', { name: 'Create Account' });

  //     await act(async () => {
  //       fireEvent.press(loginBtn);
  //     });

  //     const emailInputErrorText = getByTestId('email-input-error');
  //     const passwordInputErrorText = getByTestId('password-input-error');
  //     const confirmInputErrorText = getByTestId('confirm-password-input-error');

  //     expect(emailInputErrorText).toBeTruthy();
  //     expect(passwordInputErrorText).toBeTruthy();
  //     expect(confirmInputErrorText).toBeTruthy();
  //   });

  //   // it('creates a user account when the form is submitted with valid data', async () => {
  //   //   const { getByTestId, getByRole } = render(
  //   //     <MockedProvider addTypename={false}>
  //   //       <SignUpForm />
  //   //     </MockedProvider>,
  //   //   );

  //   //   const emailInput = getByTestId('email-input');
  //   //   const passwordInput = getByTestId('password-input');
  //   //   const confirmInput = getByTestId('confirm-password-input');
  //   //   const loginBtn = getByRole('button', { name: 'Create Account' });

  //   //   await act(async () => {
  //   //     fireEvent.changeText(emailInput, 'shemjehrojondanero@gmail.com');
  //   //     fireEvent.changeText(passwordInput, 'shemjehro');
  //   //     fireEvent.changeText(confirmInput, 'shemjehro');

  //   //     fireEvent.press(loginBtn);
  //   //   });

  //   //     expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
  //   //       email: 'shemjehrojondanero@gmail.com',
  //   //       password: 'shemjehro',
  //   //     });
  // });
});
