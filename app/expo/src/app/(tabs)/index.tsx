import { ScrollView, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import AbsoluteButton from "~/components/Button/AbsoluteButton";
import TripCard from "~/components/Card/TripCard";
import { trips } from "assets/data/tripData";

export default function MyTripScreen() {
  return (
    <View className="flex-1 items-center">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <View>
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                imgSrc={trip.imgSrc}
                destination={trip.destination}
                startDate={trip.startDate}
                endDate={trip.endDate}
                budget={trip.budget}
                travelSize={trip.travelSize}
              />
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView>
      <AbsoluteButton title="+" />
    </View>
  );
}
