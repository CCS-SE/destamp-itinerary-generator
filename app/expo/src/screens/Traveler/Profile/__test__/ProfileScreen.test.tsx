import React from 'react';
import { render } from '@testing-library/react-native';

import ProfileScreen from '~/app/(tabs)/profile';

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({})),
  };
});

describe('Profile Screen', () => {
  it('should render empty stamps state when traveler have no stamps collected yet', () => {
    const { getByTestId } = render(<ProfileScreen />);

    const noStampTitle = getByTestId('no-stamps-title');
    const noStampSubtitle = getByTestId('no-stamps-subtitle');

    expect(noStampTitle.props.children).toMatch(
      /You haven't claimed any stamps yet\./,
    );
    expect(noStampSubtitle.props.children).toBe(
      'Start planning your trip and collect stamps as you go. ✨',
    );
  });

  it('should render profile menus', () => {
    const { getByTestId } = render(<ProfileScreen />);

    const profileMenuList = getByTestId('profile-menu-list');
    const profileMenuData = profileMenuList.props.data;

    expect(profileMenuList).toBeDefined();
    expect(profileMenuData[0].title).toBe('Edit Profile');
    expect(profileMenuData[1].title).toBe('Payment & Subscription');
    expect(profileMenuData[2].title).toBe('Logout');
  });
});
