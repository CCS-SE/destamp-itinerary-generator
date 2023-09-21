import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import { amountFormatter } from '~/utils/utils';
import TripCard from '../TripCard';
import { tripCardData } from './mock/tripCardData';

describe('Trip Card', () => {
  it('should render trip destination and image', () => {
    const { getByTestId } = render(<TripCard {...tripCardData} />);
    const destinationElement = getByTestId('trip-destination');
    const imageElement = getByTestId('trip-destination-img');

    expect(destinationElement.children[0]).toBe(tripCardData.destination);
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
    expect(dateElement.children[0]).toBe('Jun 9, 2023  •  3 days');
    expect(travelSizeElement.children[0]).toBe(tripCardData.travelSize);
  });

  it('calls the modal open function when menu button is clicked', async () => {
    const { getByTestId, findByTestId } = render(
      <TripCard {...tripCardData} />,
    );

    const menuBtn = getByTestId('trip-menu-btn');
    expect(menuBtn).toBeDefined();

    act(() => {
      fireEvent.press(menuBtn);
    });

    const modalComponent = findByTestId('modal');
    expect(modalComponent).toBeTruthy();

    const tripMenuList = await findByTestId('trip-menu-list');
    const tripMenuData = tripMenuList.props.data;

    expect(tripMenuData[0].title).toBe('View trip details');
    expect(tripMenuData[1].title).toBe('Share trip');
    expect(tripMenuData[2].title).toBe('Regenerate trip');
    expect(tripMenuData[3].title).toBe('Delete trip');
  });
});