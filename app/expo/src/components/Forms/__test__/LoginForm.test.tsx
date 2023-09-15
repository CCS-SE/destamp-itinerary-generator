import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import LoginForm from '../LoginForm';

jest.mock('config/initSupabase', () => {
  return {
    createClient: jest.fn(),
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

  it('handles email and password input correctly', () => {
    const { getByTestId } = render(<LoginForm />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'testuser@gmail.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    expect(emailInput.props.value).toBe('testuser@gmail.com');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('shows input error text', async () => {
    const { getByTestId, getByRole } = render(<LoginForm />);
    const loginBtn = getByRole('button', { name: 'Login' });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    await act(async () => {
      await fireEvent.press(loginBtn);
    });

    const emailInputError = getByTestId('email-input-error');
    const passwordInputError = getByTestId('password-input-error');

    expect(emailInputError).toBeTruthy;
    expect(passwordInputError).toBeTruthy;

    fireEvent.changeText(emailInput, 'testuser@gmail.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    expect(emailInputError).toBeFalsy;
    expect(passwordInputError).toBeFalsy;

    fireEvent.changeText(emailInput, 'testuser');

    expect(emailInputError).toBeTruthy;
  });

  it('unhides/hides password input when unhide/hide icon is pressed', () => {
    const { getByTestId } = render(<LoginForm />);
    const passwordInput = getByTestId('password-input');
    const showPasswordIcon = getByTestId('show-password-icon');

    fireEvent.press(showPasswordIcon);

    expect(passwordInput.props.secureTextEntry).toBe(false);

    fireEvent.press(showPasswordIcon);

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});
