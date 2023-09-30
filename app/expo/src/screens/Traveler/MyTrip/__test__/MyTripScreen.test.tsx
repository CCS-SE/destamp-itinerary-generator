import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react-native';

import MyTripScreen from '~/app/(tabs)/index';
import {
  EmptyTripsQueryMock,
  ErrorTripsQueryMock,
  TripsQueryMock,
} from './mock/tripMockData';

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({})),
  };
});

describe('My Trip Screen', () => {
  const renderScreen = async (query: MockedResponse) => {
    return await waitFor(() => {
      render(
        <MockedProvider mocks={[query]}>
          <MyTripScreen />
        </MockedProvider>,
      );
    });
  };

  it('should render loading state', () => {
    renderScreen(TripsQueryMock);

    expect(screen.getByTestId('my-trip-loading')).toBeTruthy();
  });

  it('should render error state', async () => {
    await renderScreen(ErrorTripsQueryMock);

    expect(await screen.findByTestId('my-trip-error')).toBeTruthy();
  });

  it('should render empty state', async () => {
    await renderScreen(EmptyTripsQueryMock);

    const titleElement = await screen.findByTestId('empty-state-title');
    const subTitleElement = await screen.findByTestId('empty-state-subtitle');
    const createTripElement = await screen.findByRole('button', {
      name: /create a trip/i,
    });

    expect(titleElement.props.children).toBe('No trips yet');
    expect(subTitleElement.props.children).toBe(
      'Start planning your adventure!',
    );
    expect(createTripElement).toBeDefined();
  });

  it('should render travelers trips', async () => {
    await renderScreen(TripsQueryMock);

    const tripList = await screen.findByTestId('my-trip-list');
    const createTripBtn = await screen.findByRole('button', { name: '+' });
    const destinationImg = await screen.findByTestId('trip-destination-img');
    const destination = await screen.findByTestId('trip-destination');
    const date = await screen.findByTestId('trip-date');
    const travelSize = await screen.findByTestId('trip-travel-size');
    const budget = await screen.findByTestId('trip-budget');

    const tripData = tripList.props.data;
    const tripQueryData = TripsQueryMock.result.data.travelerTrips;

    expect(tripData.length).toBe(tripQueryData.length);
    expect(createTripBtn).toBeDefined();
    expect(destinationImg).toBeDefined();
    expect(destination).toBeDefined();
    expect(date).toBeDefined();
    expect(travelSize).toBeDefined();
    expect(budget).toBeDefined();
  });
});
