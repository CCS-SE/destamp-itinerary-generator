import React from 'react';
import { render } from '@testing-library/react-native';

import GradientButton from '../GradientButton';

describe('Gradient Button', () => {
  describe('default state', () => {
    it('should render successfully', () => {
      const buttonCallbackFunction = jest.fn(() => null);
      const { getByRole } = render(
        <GradientButton
          isSubmitting={false}
          onPress={buttonCallbackFunction}
          title="Login"
        />,
      );
      const gradientBtnElement = getByRole('button');

      expect(gradientBtnElement).toBeDefined();
    });

    it('should render correct output display', () => {
      const buttonCallbackFunction = jest.fn(() => null);
      const { getByTestId } = render(
        <GradientButton
          isSubmitting={false}
          onPress={buttonCallbackFunction}
          title="Login"
        />,
      );
      const gradientBtnTextElement = getByTestId('gradient-btn-text');

      expect(gradientBtnTextElement.type).toBe('Text');
      expect(gradientBtnTextElement.children[0]).toBe('Login');
    });
  });

  describe('disabled/inactive state', () => {
    it('should render correct output display', () => {
      const buttonCallbackFunction = jest.fn(() => null);
      const { getByTestId } = render(
        <GradientButton
          isSubmitting={true}
          onPress={buttonCallbackFunction}
          title="Login"
        />,
      );

      const gradientBtnLoadingElement = getByTestId('gradient-btn-loading');

      expect(gradientBtnLoadingElement.type).toBe('ActivityIndicator');
    });

    it('should render correct bg color', () => {
      const buttonCallbackFunction = jest.fn(() => null);
      const { getByTestId } = render(
        <GradientButton
          isSubmitting={true}
          onPress={buttonCallbackFunction}
          title="Login"
        />,
      );

      const gradientBtnElement = getByTestId('gradient-btn-color');

      expect(gradientBtnElement.props.style[5].opacity).toBe(0.4);
    });
  });
});
