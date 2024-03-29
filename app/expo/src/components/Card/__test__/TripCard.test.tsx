import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import { amountFormatter, toSentenceCase } from '~/utils/utils';
import TripCard from '../traveler/TripCard';
import { tripCardData, TripsQueryMock } from './mock/query.mock';

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({})),
  };
});

describe('Trip Card', () => {
  it('should render trip destination and image', () => {
    const { getByTestId } = render(<TripCard {...tripCardData} />);
    const destinationElement = getByTestId('trip-title');
    const imageElement = getByTestId('trip-destination-img');

    expect(destinationElement.children[0]).toBe(tripCardData.title);
    expect(imageElement.props.source[0].uri).toEqual(tripCardData.imgSrc);
  });

  it('should render trip date, travel size, and budget', () => {
    const { getByTestId } = render(<TripCard {...tripCardData} />);
    const bugdetElement = getByTestId('trip-budget');
    const dateElement = getByTestId('trip-date');
    const travelSizeElement = getByTestId('trip-travel-size');

    expect(bugdetElement.children[0]).toBe(
      amountFormatter(tripCardData.budget),
    );

    if (tripCardData.daysDifference > 1) {
      expect(dateElement.children[0]).toContain('Jun 9 - Jun 12, 2023');
    } else {
      expect(dateElement.children[0]).toContain('Jun 9, 2023');
    }

    expect(travelSizeElement.children[0]).toBe(
      toSentenceCase(tripCardData.travelSize) +
        ' (' +
        toSentenceCase(tripCardData.totalTravellers.toString()) +
        ') ',
    );
  });

  it('calls the modal open function when menu button is clicked', async () => {
    const { findByTestId } = render(
      <MockedProvider mocks={TripsQueryMock}>
        <TripCard {...tripCardData} />
      </MockedProvider>,
    );

    const menuBtn = await findByTestId('trip-menu-btn');
    expect(menuBtn).toBeDefined();

    act(() => {
      fireEvent.press(menuBtn);
    });

    const modalComponent = await findByTestId('modal');
    expect(modalComponent).toBeTruthy();

    const tripMenuList = await findByTestId('trip-menu-list');
    const tripMenuData = tripMenuList.props.data;

    expect(tripMenuData[0].title).toBe('View trip details');
    expect(tripMenuData[1].title).toBe('Regenerate trip');
    expect(tripMenuData[2].title).toBe('Delete trip');
  });
});
