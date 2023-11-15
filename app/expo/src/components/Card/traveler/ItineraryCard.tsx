import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { useRouter } from 'expo-router';

import DayExpenseCard from '~/components/Card/traveler/DayExpenseCard';
import DepartingFromCard from '~/components/Card/traveler/DepartingFromCard';
import DirectionCard from '~/components/Card/traveler/DirectionCard';
import { ExpenseCategory, PlaceType } from '~/graphql/generated';
import {
  calculateAveragePrice,
  calculateTravelExpense,
  getTravelDistance,
  getTravelDuration,
  taxisNeeded,
} from '~/utils/utils';
import Accommodation from '../../../../assets/images/accommodation-itinerary.svg';
import Attraction from '../../../../assets/images/attraction-icon.svg';
import Driving from '../../../../assets/images/driving.svg';
import Location from '../../../../assets/images/location-icon.svg';
import Restaurant from '../../../../assets/images/restaurant-icon.svg';
import DestinationCard from './DestinationCard';

interface Image {
  url: string;
}

interface OpeningHour {
  openTime?: string;
  closeTime?: string;
  day: number;
}

interface Destination {
  id: string;
  type: PlaceType;
  visitDuration: number;
  contactNumber?: string | null;
  address: string;
  isClaimed: boolean;
  openingHours: OpeningHour[];
  name: string;
  price: string;
  images: Image[];
}

interface ItineraryCardProps {
  date: Date;
  itineraryId: number;
  attractionCost: number;
  foodCost: string;
  transportationCost: number;
  accommodationCost: number;
  departingLocation: string | undefined;
  isAccommodationIncluded: boolean;
  isTransportationIncluded: boolean;
  travelDistances: number[];
  travelDurations: number[];
  preferredTime: string[];
  destinations: Destination[] | [];
  adultCount: number;
  childCount: number;
}

interface TimeSlot {
  start: string;
  end: string;
}

export default function ItineraryCard({
  date,
  itineraryId,
  attractionCost,
  foodCost,
  transportationCost,
  accommodationCost,
  departingLocation,
  destinations,
  travelDistances,
  preferredTime,
  travelDurations,
  isTransportationIncluded,
  adultCount,
  childCount,
}: ItineraryCardProps) {
  const { push } = useRouter();

  const hour = getStartTime(preferredTime, 0);
  const min = getStartTime(preferredTime, 1);

  function moveAccommodationToFront() {
    const itemToMove = destinations.find(
      (item) => item?.type === PlaceType.Accommodation,
    ) as never;
    if (destinations.includes(itemToMove)) {
      destinations = destinations.filter((item) => item !== itemToMove);

      destinations = [itemToMove as Destination, ...destinations];
    }
    return destinations;
  }

  const arrangedDestinations = (): Destination[] => {
    // moveAccommodationToFront();
    const restaurants = destinations.filter(
      (dest) => dest.type === PlaceType.Restaurant,
    ) as Destination[];
    const otherDestinations = destinations.filter(
      (dest) => dest.type !== PlaceType.Restaurant,
    ) as Destination[];

    const arrangedDestinations: Destination[] = [];
    let i = 0;
    let j = 0;

    while (i < otherDestinations.length || j < restaurants.length) {
      if (i < otherDestinations.length) {
        arrangedDestinations.push(otherDestinations[i]!);
        i++;
      }
      if (j < restaurants.length) {
        arrangedDestinations.push(restaurants[j]!);
        j++;
      }
    }

    return arrangedDestinations;
  };

  // destinations = arrangedDestinations();

  const visitDurations = destinations.map(
    (destination) => destination.visitDuration,
  );
  const travelDurationsMins = travelDurations.map((duration) => duration / 60);

  function calculateTimeSlots(): TimeSlot[] {
    let startTime = `${hour}:${min}`;
    let timeSlots: TimeSlot[] = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00Z`);

    for (let i = 0; i < visitDurations.length; i++) {
      let start = currentTime.toISOString().substr(11, 5);
      currentTime.setMinutes(currentTime.getMinutes() + visitDurations[i]!);
      let end = currentTime.toISOString().substr(11, 5);

      timeSlots.push({ start, end });

      if (travelDurationsMins[i]) {
        currentTime.setMinutes(
          currentTime.getMinutes() + travelDurationsMins[i]!,
        );
      }
    }

    return timeSlots;
  }

  const handleViewDestinationDetail = (
    id: string,
    name: string,
    address: string,
    contactNumber: string,
    openingHours: OpeningHour[],
    images: Image[],
  ) => {
    push({
      pathname: `/itinerary/destinationDetail/${id}`,
      params: {
        name: name,
        address: address,
        contactNumber: contactNumber,
        openingHours: JSON.stringify(openingHours),
        images: JSON.stringify(images),
      },
    });
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <DayExpenseCard
        accommodationCost={accommodationCost}
        attractionCost={attractionCost!}
        foodCost={foodCost!}
        transportationCost={transportationCost!}
        totalCost={
          attractionCost! +
          transportationCost! * taxisNeeded(adultCount, childCount) +
          calculateAveragePrice(foodCost) +
          accommodationCost
        }
        adultCount={adultCount}
        childCount={childCount}
      />
      <View className="flex-row" style={{ width: screenWidth }}>
        <DashedLine
          dashLength={4}
          dashThickness={2}
          dashGap={5}
          dashColor="#FA8E56"
          dashStyle={{ borderRadius: 8 }}
          axis="vertical"
          style={{ marginLeft: 14, marginTop: 37 }}
        />
        <View>
          <View className="flex-row">
            <Location
              height={30}
              width={30}
              style={{
                position: 'absolute',
                marginTop: 20,
                marginLeft: -16,
              }}
            />
            <DepartingFromCard locationName={departingLocation!} />
          </View>
          <FlatList
            data={destinations}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View className="flex-row">
                    {item.type === PlaceType.Attraction ? (
                      <Attraction
                        height={30}
                        width={30}
                        style={{
                          position: 'absolute',
                          marginTop: 20,
                          marginLeft: -16,
                        }}
                      />
                    ) : item.type === PlaceType.Restaurant ? (
                      <Restaurant
                        height={30}
                        width={30}
                        style={{
                          position: 'absolute',
                          marginTop: 20,
                          marginLeft: -16,
                        }}
                      />
                    ) : (
                      <Accommodation
                        height={30}
                        width={30}
                        style={{
                          position: 'absolute',
                          marginTop: 20,
                          marginLeft: -16,
                        }}
                      />
                    )}
                    <DestinationCard
                      date={date}
                      categoryType={item.type}
                      itineraryId={itineraryId}
                      timeSlot={
                        formatTime(
                          calculateTimeSlots()[index] as TimeSlot,
                        ) as TimeSlot
                      }
                      title={item.name}
                      price={item.price}
                      imageList={item.images.map((image) => image.url)}
                      onPress={() =>
                        handleViewDestinationDetail(
                          item.id,
                          item.name,
                          item.address,
                          item.contactNumber ?? '',
                          item.openingHours,
                          item.images,
                        )
                      }
                      adultCount={adultCount}
                      childCount={childCount}
                    />
                  </View>

                  {index === travelDurations.length - 1 ? (
                    <></>
                  ) : (
                    <View className="mt-5 flex-row">
                      <DirectionCard
                        date={date}
                        categoryType={ExpenseCategory.Transportation}
                        itineraryId={itineraryId}
                        icon={
                          <Driving
                            height={22}
                            width={22}
                            style={{ marginLeft: 8 }}
                          />
                        }
                        duration={`${getTravelDuration(
                          travelDurations[index]!,
                        )}`}
                        distance={`${getTravelDistance(
                          travelDistances[index]!,
                        )} km`}
                        isTransportationIncluded={isTransportationIncluded}
                        transportationPrice={`${calculateTravelExpense(
                          travelDistances[index]!,
                          travelDurations[index]!,
                        )}`}
                        adultCount={adultCount}
                        childCount={childCount}
                      />
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const getStartTime = (time: string[], index: number) => {
  return parseInt(time[0]!.split(':')[index]!);
};

function formatTime(timeSlot: TimeSlot): TimeSlot {
  const splitStart = timeSlot.start.split(':');
  const splitEnd = timeSlot.end.split(':');
  const startHour = splitStart[0] as string;
  const endHour = splitEnd[0] as string;
  const startMin = splitStart[1] as string;
  const endMin = splitEnd[1] as string;

  const newStartTime =
    parseInt(startHour) <= 12
      ? timeSlot.start + ' AM'
      : parseInt(startHour) - 12 + ':' + startMin + ' PM';
  const newEndTime =
    parseInt(endHour) <= 12
      ? timeSlot.end + ' AM'
      : parseInt(endHour) - 12 + ':' + endMin + ' PM';

  return { start: newStartTime, end: newEndTime };
}
