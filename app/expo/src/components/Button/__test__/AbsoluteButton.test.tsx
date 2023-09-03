import React from 'react';
import { render } from '@testing-library/react-native';

import AbsoluteButton from '../AbsoluteButton';

describe('Absolute Button', () => {
  it('should render successfully', () => {
    const { getByRole } = render(<AbsoluteButton title="+" />);
    const absoluteBtnElement = getByRole('button');

    expect(absoluteBtnElement).toBeDefined();
  });

  it('should render correct output text', () => {
    const { getByRole, getByTestId } = render(<AbsoluteButton title="+" />);
    const absoluteBtnElement = getByRole('button', { name: '+' });
    const absoluteBtnTextElement = getByTestId('absolute-btn-text');

    expect(absoluteBtnElement).toBeDefined();
    expect(absoluteBtnTextElement.children[0]).toBe('+');
  });
});
