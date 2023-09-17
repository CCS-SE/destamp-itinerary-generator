import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import { UserType } from '~/graphql/generated';
import { mockSupabaseClient } from '../__mock__/mockSupabaseClient';
import SignUpForm, { CreateUser } from '../SignUpForm';

const userMock = [
  {
    request: {
      query: CreateUser,
      variables: {
        data: {
          id: '123',
          userType: UserType.Traveler,
          email: 'testemail@gmail.com',
          password: 'testpassword',
        },
      },
    },
    result: {
      data: {
        createUser: {
          id: '123',
        },
      },
    },
  },
];

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => mockSupabaseClient),
}));

describe('Sign up Form', () => {
  it('renders the Sign up form', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={userMock} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const confirmPasswordInput = getByTestId('confirm-password-input');
    const signUpButton = getByTestId('sign-up-btn');
    const bottomText = getByTestId('bottom-text');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(signUpButton).toBeTruthy();
    expect(bottomText).toBeTruthy();
  });

  it('handles inputs correctly', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={userMock} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const confirmPasswordInput = getByTestId('confirm-password-input');

    fireEvent.changeText(emailInput, 'testuser@gmail.com');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.changeText(confirmPasswordInput, 'testpassword');

    expect(emailInput.props.value).toBe('testuser@gmail.com');
    expect(passwordInput.props.value).toBe('testpassword');
    expect(confirmPasswordInput.props.value).toBe('testpassword');
  });

  it('unhides/hides password input when unhide/hide icon is pressed', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={userMock} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );

    const passwordInput = getByTestId('password-input');
    const showPasswordIcon = getByTestId('show-password-icon');
    const confirmInput = getByTestId('confirm-password-input');
    const showConfirmIcon = getByTestId('show-confirm-icon');

    await act(() => {
      fireEvent.press(showPasswordIcon);
      fireEvent.press(showConfirmIcon);
    });

    expect(passwordInput.props.secureTextEntry).toBe(false);
    expect(confirmInput.props.secureTextEntry).toBe(false);

    await act(() => {
      fireEvent.press(showPasswordIcon);
      fireEvent.press(showConfirmIcon);
    });

    expect(passwordInput.props.secureTextEntry).toBe(true);
    expect(confirmInput.props.secureTextEntry).toBe(true);
  });

  it('shows input error texts', async () => {
    const { getByTestId, getByRole } = render(
      <MockedProvider mocks={userMock} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );

    const loginBtn = getByRole('button', { name: 'Create Account' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const confirmInput = getByTestId('confirm-password-input');

    await act(() => {
      fireEvent.press(loginBtn);
    });
    const emailInputErrorText = getByTestId('email-input-error');
    const passwordInputErrorText = getByTestId('password-input-error');
    const confirmInputErrorText = getByTestId('confirm-password-input-error');

    expect(emailInputErrorText).toBeTruthy();
    expect(passwordInputErrorText).toBeTruthy();
    expect(confirmInputErrorText).toBeTruthy();

    await act(() => {
      fireEvent.changeText(emailInput, 'testuser@gmail.com');
      fireEvent.changeText(passwordInput, 'testpassword');
      fireEvent.changeText(confirmInput, 'password');
    });

    expect(emailInputErrorText).toBeFalsy;
    expect(passwordInputErrorText).toBeFalsy;
    expect(confirmInputErrorText).toBeTruthy;
  });

  it('creates a user account when the form is submitted with valid data', async () => {
    const { getByTestId, getByRole } = render(
      <MockedProvider mocks={userMock} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );

    const loginBtn = getByRole('button', { name: 'Create Account' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const confirmInput = getByTestId('confirm-password-input');

    await act(() => {
      fireEvent.changeText(emailInput, 'shemjehrojondanero@gmail.com');
      fireEvent.changeText(passwordInput, 'shemjehro');
      fireEvent.changeText(confirmInput, 'shemjehro');
      fireEvent.press(loginBtn);
    });

    await act(async () => {
      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: 'shemjehrojondanero@gmail.com',
        password: 'shemjehro',
      });
    });
  });
});
