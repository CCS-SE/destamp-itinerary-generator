import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { useRouter } from 'expo-router';

import DayExpenseCard from '~/components/Card/traveler/DayExpenseCard';
import DirectionCard from '~/components/Card/traveler/DirectionCard';
import StartingLocationCard from '~/components/Card/traveler/StartingLocationCard';
import { ExpenseCategory } from '~/graphql/generated';
import {
  calculateAveragePrice,
  calculateTravelExpense,
  getTravelDistance,
  getTravelDuration,
} from '~/utils/utils';
import Attraction from '../../../../assets/images/attraction-icon.svg';
import Driving from '../../../../assets/images/driving.svg';
import Location from '../../../../assets/images/location-icon.svg';
import Restaurant from '../../../../assets/images/restaurant-icon.svg';
import DestinationCard from './DestinationCard';

export interface Image {
  url: string;
}

export interface Category {
  name: string;
}

export interface OperatingHour {
  openTime?: string;
  closeTime?: string;
  day: number;
}

export interface Poi {
  id: string;
  visitDuration: number;
  longitude: number;
  latitude: number;
  isAttraction: boolean;
  restaurant?: {
    id: number;
  } | null;
  accommodation?: {
    id: number;
  } | null;
  name: string;
  price: string;
  images: {
    image: Image;
  }[];
}

interface ItineraryCardProps {
  date: Date;
  tripId: number;
  isAccommodationIncluded: boolean;
  isTransportationIncluded: boolean;
  startingLocation: string;
  timeslots: [number, number][];
  travelerCount: number;
  dailyItinerary: {
    dayIndex: number;
    attractionCost: number;
    foodCost: string;
    transportationCost: number;
    accommodationCost: number;
    dailyItineraryPois: {
      order: number;
      distance: number;
      duration: number;
      poi: Poi;
    }[];
  };
}

interface TimeSlot {
  start: string;
  end: string;
}

export default function ItineraryCard({
  date,
  tripId,
  dailyItinerary,
  isAccommodationIncluded,
  startingLocation,
  timeslots,
  isTransportationIncluded,
  travelerCount,
}: ItineraryCardProps) {
  const { push } = useRouter();

  const hour = getStartTime(timeslots, 0);
  const min = 0;

  // function moveAccommodationToFront() {
  //   const itemToMove = destinations.find(
  //     (item) => item?.type === PlaceType.Accommodation,
  //   ) as never;
  //   if (destinations.includes(itemToMove)) {
  //     destinations = destinations.filter((item) => item !== itemToMove);

  //     destinations = [itemToMove as Destination, ...destinations];
  //   }
  //   return destinations;
  // }

  // const arrangedDestinations = (): Destination[] => {
  //   // moveAccommodationToFront();
  //   const restaurants = destinations.filter(
  //     (dest) => dest.type === PlaceType.Restaurant,
  //   ) as Destination[];
  //   const otherDestinations = destinations.filter(
  //     (dest) => dest.type !== PlaceType.Restaurant,
  //   ) as Destination[];

  //   const arrangedDestinations: Destination[] = [];
  //   let i = 0;
  //   let j = 0;

  //   while (i < otherDestinations.length || j < restaurants.length) {
  //     if (i < otherDestinations.length) {
  //       arrangedDestinations.push(otherDestinations[i]!);
  //       i++;
  //     }
  //     if (j < restaurants.length) {
  //       arrangedDestinations.push(restaurants[j]!);
  //       j++;
  //     }
  //   }

  //   return arrangedDestinations;
  // };

  const visitDurations = dailyItinerary.dailyItineraryPois.map(
    (item) => item.poi.visitDuration,
  );

  const poiVisitDurations = dailyItinerary.dailyItineraryPois.map(
    (item) => item.duration / 60,
  );

  function calculateTimeSlots(): TimeSlot[] {
    const startTime = `${hour}:${min}`;
    const timeSlots: TimeSlot[] = [];
    const currentTime = new Date(`1970-01-01T${startTime}:00Z`);

    for (let i = 0; i < visitDurations.length; i++) {
      const start = currentTime.toISOString().substr(11, 5);
      currentTime.setMinutes(currentTime.getMinutes() + visitDurations[i]!);
      const end = currentTime.toISOString().substr(11, 5);

      timeSlots.push({ start, end });

      if (poiVisitDurations[i]) {
        currentTime.setMinutes(
          currentTime.getMinutes() + poiVisitDurations[i]!,
        );
      }
    }

    return timeSlots;
  }

  const handleViewDestinationDetail = (id: string, imageList: string[]) => {
    push({
      pathname: `/traveler/trip/itinerary/destinationDetail/${id}`,
      params: {
        id: id,
        imageList: JSON.stringify(imageList),
      },
    });
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <DayExpenseCard
        accommodationCost={dailyItinerary.accommodationCost}
        attractionCost={dailyItinerary.attractionCost}
        foodCost={dailyItinerary.foodCost}
        transportationCost={dailyItinerary.transportationCost}
        totalCost={
          dailyItinerary.accommodationCost +
          dailyItinerary.transportationCost +
          calculateAveragePrice(dailyItinerary.foodCost) +
          dailyItinerary.accommodationCost
        }
        travelerCount={travelerCount}
      />
      <View className="flex-row" style={{ width: screenWidth }}>
        <DashedLine
          dashLength={4}
          dashThickness={2}
          dashGap={5}
          dashColor="#F65A82"
          dashStyle={{ borderRadius: 8 }}
          axis="vertical"
          style={{ marginLeft: 14, marginTop: 37 }}
        />
        <View>
          {!isAccommodationIncluded ? (
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
              <StartingLocationCard locationName={startingLocation} />
            </View>
          ) : (
            <></>
          )}
          <FlatList
            data={dailyItinerary.dailyItineraryPois}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View className="flex-row">
                    {item.poi.isAttraction ? (
                      <Attraction
                        height={30}
                        width={30}
                        style={{
                          position: 'absolute',
                          marginTop: 20,
                          marginLeft: -16,
                        }}
                      />
                    ) : item.poi.restaurant ? (
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
                      <Location
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
                      accommodation={item.poi.accommodation}
                      isAttraction={item.poi.isAttraction}
                      categoryType={
                        item.poi.isAttraction
                          ? ExpenseCategory.Sightseeing
                          : item.poi.restaurant
                          ? ExpenseCategory.Food
                          : ExpenseCategory.Accommodation
                      }
                      tripId={tripId}
                      timeSlot={
                        formatTime(
                          calculateTimeSlots()[index] as TimeSlot,
                        ) as TimeSlot
                      }
                      title={item.poi.name}
                      price={item.poi.price}
                      imageList={item.poi.images.map((item) => item.image.url)}
                      onPress={() =>
                        handleViewDestinationDetail(
                          item.poi.id,
                          item.poi.images.map((item) => item.image.url),
                        )
                      }
                      travelerCount={travelerCount}
                    />
                  </View>
                  {index === poiVisitDurations.length - 1 ? (
                    <></>
                  ) : (
                    <View className="mt-5 flex-row">
                      <DirectionCard
                        date={date}
                        categoryType={ExpenseCategory.Transportation}
                        tripId={tripId}
                        icon={
                          <Driving
                            height={20}
                            width={20}
                            style={{ marginLeft: 8 }}
                          />
                        }
                        duration={`${getTravelDuration(item.duration)}`}
                        distance={`${getTravelDistance(item.distance)} km`}
                        isTransportationIncluded={isTransportationIncluded}
                        transportationPrice={`${calculateTravelExpense(
                          item.distance,
                          item.duration,
                          travelerCount,
                        )}`}
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

const getStartTime = (timeslot: [number, number][], index: number) => {
  return timeslot[0]![index]!;
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
