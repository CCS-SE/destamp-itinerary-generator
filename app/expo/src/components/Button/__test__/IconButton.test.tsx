import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import IconButton from '../IconButton';

describe('Icon Button', () => {
  it('should render successfully', () => {
    const buttonCallbackFunction = jest.fn(() => null);
    const { getByRole } = render(
      <IconButton
        icon={<AntDesign name="heart" />}
        onPress={buttonCallbackFunction}
      />,
    );
    const iconBtnElement = getByRole('button');

    expect(iconBtnElement).toBeDefined();
  });

  it('should render correct icon', () => {
    const buttonCallbackFunction = jest.fn(() => null);
    render(
      <IconButton
        icon={<AntDesign name="heart" />}
        onPress={buttonCallbackFunction}
      />,
    );

    const heartIcon = renderer.create(<AntDesign />).toJSON();

    expect(heartIcon).toMatchSnapshot();
  });
});
