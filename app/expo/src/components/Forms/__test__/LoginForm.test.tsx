import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import { mockSupabaseClient } from '../__mock__/mockSupabaseClient';
import LoginForm from '../LoginForm';

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => mockSupabaseClient),
    error: null,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Login Form', () => {
  it('renders the log in form', () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginBtn = getByRole('button', { name: 'Login' });
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginBtn).toBeTruthy();
  });
  it('handles email and password input correctly', async () => {
    const { getByTestId } = render(<LoginForm />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    await act(async () => {
      fireEvent.changeText(emailInput, 'testuser@gmail.com');
      fireEvent.changeText(passwordInput, 'testpassword');
    });
    expect(emailInput.props.value).toBe('testuser@gmail.com');
    expect(passwordInput.props.value).toBe('testpassword');
  });
  it('shows input error texts', async () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const loginBtn = getByRole('button', { name: 'Login' });
    await act(async () => {
      fireEvent.press(loginBtn);
    });
    await act(async () => {
      const emailInputError = getByTestId('email-input-error');
      const passwordInputError = getByTestId('password-input-error');
      expect(emailInputError).toBeTruthy;
      expect(passwordInputError).toBeTruthy;
    });
  });
  it('unhides password input when unhide icon is pressed', async () => {
    const { getByTestId } = render(<LoginForm />);
    const passwordInput = getByTestId('password-input');
    const showPasswordIcon = getByTestId('show-password-icon');
    await act(async () => {
      fireEvent.press(showPasswordIcon);
    });
    expect(passwordInput.props.secureTextEntry).toBe(false);
    await act(async () => {
      fireEvent.press(showPasswordIcon);
    });
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it('should login a user with correct credentials', async () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const loginBtn = getByRole('button', { name: 'Login' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'shemjehrojondanero@gmail.com');
    fireEvent.changeText(passwordInput, 'shemjehro');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'shemjehrojondanero@gmail.com',
        password: 'shemjehro',
      });
    });
  });

  it('should not login a user with incorrect credentials', async () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const loginBtn = getByRole('button', { name: 'Login' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'shemjehro@gmail.com');
    fireEvent.changeText(emailInput, 'invalid@email.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'invalid@email.com',
        password: 'wrongpassword',
      });
    });

    const error = mockSupabaseClient.auth.signInWithPassword(
      'invalid@email.com',
      'wrongpassword',
    );

    expect(error.error).toHaveProperty('name', 'AuthApiError');
  });
});
