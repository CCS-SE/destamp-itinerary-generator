import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react-native';
import { supabase } from 'config/initSupabase';

import SignUpForm, { CreateUser } from '../SignUpForm';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({})),
  auth: {
    signUp: jest.fn(),
  },
}));

const mockCreateUserMutation = {
  request: {
    query: CreateUser,
    variables: {
      data: {
        id: '123',
        userType: 'Traveler',
        email: 'testuser@gmail.com',
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
};

describe('Sign up Form', () => {
  it('renders the Sign up form', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockCreateUserMutation]} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const confirmPasswordInput = getByTestId('confirm-password-input');
    const signUpButton = getByTestId('sign-up-btn');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(signUpButton).toBeTruthy();
  });

  it('handles inputs correctly', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockCreateUserMutation]} addTypename={false}>
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
});
