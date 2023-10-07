import React from 'react';
import { FlatList, View } from 'react-native';
import DashedLine from 'react-native-dashed-line';

import DayExpenseCard from '~/components/Card/traveler/DayExpenseCard';
import DepartingFromCard from '~/components/Card/traveler/DepartingFromCard';
import DirectionCard from '~/components/Card/traveler/DirectionCard';
import { PlaceType } from '~/graphql/generated';
import {
  calculateAveragePrice,
  calculateTravelExpense,
  getTravelDistance,
  getTravelDuration,
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

interface Destination {
  type: PlaceType;
  visitDuration: number;
  name: string;
  price: string;
  images: Image[];
}

interface ItineraryCardProps {
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
}

export default function ItineraryCard({
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
}: ItineraryCardProps) {
  const hour = getStartTime(preferredTime, 0);
  const min = getStartTime(preferredTime, 1);
  const displayTime = (index: number) => {
    const firstPlaceTime = destinations[0]?.visitDuration || 0; // Ensure it's a number

    let startHour;
    let starMin;
    let endHour: number = 0;
    let endMin: number = 0;

    if (index === 0) {
      startHour = hour;
      starMin = min;
      endHour += Math.floor(firstPlaceTime / 60);
      endMin += firstPlaceTime % 60;

      return `${formatTime(startHour!, starMin!)} - ${formatTime(
        endHour,
        endMin,
      )}`;
    }
  };

  return (
    <View>
      <DayExpenseCard
        attractionCost={attractionCost!}
        foodCost={foodCost!}
        transportationCost={transportationCost!}
        totalCost={
          attractionCost! +
          transportationCost! +
          calculateAveragePrice(foodCost) +
          accommodationCost
        }
      />
      <View className="w-[350] flex-row">
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
                      time={displayTime(index)!}
                      title={item.name}
                      price={item.price}
                      imageList={item.images.map((image) => image.url)}
                    />
                  </View>
                  {index === travelDurations.length - 1 ? (
                    <></>
                  ) : (
                    <DirectionCard
                      icon={
                        <Driving
                          height={22}
                          width={22}
                          style={{ marginLeft: 8 }}
                        />
                      }
                      duration={`${getTravelDuration(travelDurations[index]!)}`}
                      distance={`${getTravelDistance(
                        travelDistances[index]!,
                      )} km`}
                      isTransportationIncluded={isTransportationIncluded}
                      transportationPrice={`${calculateTravelExpense(
                        travelDistances[index]!,
                      )}`}
                    />
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

const formatTime = (hour: number, min: number) => {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for noon/midnight
  const formattedMinute = min < 10 ? `0${min}` : min; // Add leading zero for single-digit minutes

  return `${formattedHour}:${formattedMinute} ${ampm}`;
};
