import React from 'react';
import { Alert } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import { mockSupabaseClient } from '../__mock__/mockSupabaseClient';
import LoginForm from '../LoginForm';

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => mockSupabaseClient),
    error: null,
  };
});

describe('Login Form', () => {
  it('renders the log in form', () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginWithText = getByTestId('login-with-text');
    const loginBtn = getByRole('button', { name: 'Login' });

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginBtn).toBeTruthy();
    expect(loginWithText).toBeTruthy();
  });

  it('handles email and password input correctly', async () => {
    const { getByTestId } = render(<LoginForm />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    await act(() => {
      fireEvent.changeText(emailInput, 'testuser@gmail.com');
      fireEvent.changeText(passwordInput, 'testpassword');
    });

    expect(emailInput.props.value).toBe('testuser@gmail.com');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('shows input error texts', async () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const loginBtn = getByRole('button', { name: 'Login' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    await act(() => {
      fireEvent.press(loginBtn);
    });

    const emailInputError = getByTestId('email-input-error');
    const passwordInputError = getByTestId('password-input-error');

    expect(emailInputError).toBeTruthy;
    expect(passwordInputError).toBeTruthy;

    await act(() => {
      fireEvent.changeText(emailInput, 'testuser@gmail.com');
      fireEvent.changeText(passwordInput, 'testpassword');
    });

    expect(emailInputError).toBeFalsy;
    expect(passwordInputError).toBeFalsy;

    await act(() => {
      fireEvent.changeText(emailInput, 'testuser');
    });

    expect(emailInputError).toBeTruthy;
  });

  it('unhides/hides password input when unhide/hide icon is pressed', async () => {
    const { getByTestId } = render(<LoginForm />);

    const passwordInput = getByTestId('password-input');
    const showPasswordIcon = getByTestId('show-password-icon');

    await act(() => {
      fireEvent.press(showPasswordIcon);
    });

    expect(passwordInput.props.secureTextEntry).toBe(false);

    await act(() => {
      fireEvent.press(showPasswordIcon);
    });

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it('returns an error if using unexisting user credentials', async () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const loginBtn = getByRole('button', { name: 'Login' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    await act(() => {
      fireEvent.changeText(emailInput, 'shemjehrojondanero@gmail.com');
      fireEvent.changeText(passwordInput, 'eeeeee');
      fireEvent.press(loginBtn);
    });

    await act(async () => {
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'shemjehrojondanero@gmail.com',
        password: 'eeeeee',
      });

      const { error } = await mockSupabaseClient.auth.signInWithPassword(
        'shemjehrojondanero@gmail.com',
        'eeeeee',
      );
      expect(error?.name).toBe('AuthApiError');
    });
  });

  it('logins a user', async () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const loginBtn = getByRole('button', { name: 'Login' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    await act(() => {
      fireEvent.changeText(emailInput, 'shemjehrojondanero@gmail.com');
      fireEvent.changeText(passwordInput, 'shemjehro');
      fireEvent.press(loginBtn);
    });

    await act(async () => {
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'shemjehrojondanero@gmail.com',
        password: 'shemjehro',
      });

      const { error } = await mockSupabaseClient.auth.signInWithPassword(
        'shemjehrojondanero@gmail.com',
        'shemjehro',
      );
      expect(error).toBe(null);
    });
  });
});
