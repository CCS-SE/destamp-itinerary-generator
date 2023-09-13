import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import LoginForm from '../LoginForm';

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({})),
  };
});

describe('Login Form', () => {
  it('renders the log in form', () => {
    const { getByTestId } = render(<LoginForm />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-btn');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
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

  //   it('handles login button click', () => {
  //     const { getByTestId } = render(<LoginForm />);
  //     const emailInput = getByTestId('email-input');
  //     const passwordInput = getByTestId('password-input');
  //     const loginButton = getByTestId('login-btn');

  //     fireEvent.changeText(emailInput, 'testuser@gmail.com');
  //     fireEvent.changeText(passwordInput, 'testpassword');
  //     fireEvent.press(loginButton);

  //     expect().toHaveBeenCalledWith({
  //       email: 'testuser@gmail.com',
  //       password: 'testpassword',
  //     });
  //   });
});
