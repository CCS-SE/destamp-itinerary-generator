// import React from 'react';
// import { fireEvent, render } from '@testing-library/react-native';
// import { act } from 'react-test-renderer';

import { mockSupabaseClient } from '~/components/Forms/__mock__/mockSupabaseClient';

// import ProfileMenuList from '../ProfileMenuList';

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => mockSupabaseClient),
    error: null,
  };
});

describe('Logout', () => {
  it('should test', () => {});
  // it('renders the logout button', () => {
  //     const { getByTestId } = render(<ProfileMenuList />);
  //     const logoutBtn = getByTestId('Logout-btn');

  //     expect(logoutBtn).toBeTruthy();
  //   });

  //   it('logs out a user', async () => {
  //     const { getByTestId } = render(<ProfileMenuList />);
  //     const logoutBtn = getByTestId('Logout-btn');

  //     await act(() => {
  //       fireEvent.press(logoutBtn);
  //     });

  //     expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
  // });
});
