import React from 'react';
import { View } from 'react-native';
import DashedLine from 'react-native-dashed-line';

import DayExpenseCard from '~/components/Card/DayExpenseCard';
import DepartingFromCard from '~/components/Card/DepartingFromCard';
import DirectionCard from '~/components/Card/DirectionCard';
import { PlaceType } from '~/graphql/generated';
import Attraction from '../../../assets/images/attraction-icon.svg';
import Location from '../../../assets/images/location-icon.svg';
import Restaurant from '../../../assets/images/restaurant-icon.svg';
import Walking from '../../../assets/images/walking.svg';
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
  foodCost: number;
  transportationCost: number;
  departingLocation: string | undefined;
  destinations: Destination[] | [];
}
export default function ItineraryCard({
  attractionCost,
  foodCost,
  transportationCost,
  departingLocation,
  destinations,
}: ItineraryCardProps) {
  return (
    <>
      <DayExpenseCard
        attractionCost={attractionCost!}
        foodCost={foodCost!}
        transportationCost={transportationCost!}
        totalCost={attractionCost! + foodCost! + transportationCost!}
      />
      <View className="w-[370] flex-row">
        <DashedLine
          dashLength={4}
          dashThickness={2}
          dashGap={5}
          dashColor="#DE4D6C"
          dashStyle={{ borderRadius: 8 }}
          axis="vertical"
          style={{ marginLeft: 12, marginTop: 37 }}
        />
        <View>
          <View className="flex-row">
            <Location
              height={33}
              width={33}
              style={{
                position: 'absolute',
                marginTop: 20,
                marginLeft: -18,
              }}
            />
            <DepartingFromCard locationName={departingLocation!} />
          </View>
          {destinations?.map((destination, i) => (
            <>
              <View className="flex-row" key={i}>
                {destination.type === PlaceType.Attraction ? (
                  <Attraction
                    height={33}
                    width={33}
                    style={{
                      position: 'absolute',
                      marginTop: 20,
                      marginLeft: -18,
                    }}
                  />
                ) : (
                  <Restaurant
                    height={33}
                    width={33}
                    style={{
                      position: 'absolute',
                      marginTop: 20,
                      marginLeft: -18,
                    }}
                  />
                )}
                <DestinationCard
                  time="9:00 AM"
                  title={destination.name}
                  price={destination.price}
                  imageList={destination.images.map((image) => image.url)}
                />
              </View>
              <DirectionCard
                icon={
                  <Walking height={22} width={22} style={{ marginLeft: 8 }} />
                }
                duration="3 min"
              />
            </>
          ))}
        </View>
      </View>
    </>
  );
}
