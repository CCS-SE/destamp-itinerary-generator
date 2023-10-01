import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useQuery } from '@apollo/client';
import { Moment } from 'moment';

import StepperButton from '~/components/Button/StepperButton';
import AmountTextInput from '~/components/FormField/AmountTextInput';
import BudgetCategorySelection from '~/components/FormField/BudgetCategorySelection';
import DateRangePicker from '~/components/FormField/DateRangePicker';
import GeocoderSearch from '~/components/FormField/MapboxGeocoder';
import PreferedTimeSelection from '~/components/FormField/PreferedTimeSelection';
import SearchableTextInput from '~/components/FormField/SearchableTextInput';
import TravelGroupCategorySelection from '~/components/FormField/TravelGroupCategorySelection';
import Stepper from '~/components/Stepper/Stepper';
import {
  ExpenseCategory,
  GetDestinationsQueryDocument,
  TravelSize,
} from '~/graphql/generated';
import { tripDuration } from '~/utils/dates';
import { confirmationAlert } from '~/utils/utils';
import Back from '../../../assets/images/back-btn.svg';

type Coordinate = [number, number];

interface SectionProps {
  title: string;
}

interface LocationProps {
  id: number | string;
  name: string;
  place_name: string;
  center: Coordinate;
}

interface TripDataProps {
  travelDestination: string;
  departureLocation: string;
  travelGroup: TravelSize;
  startDate: Moment | null;
  preferredTime: Array<[number, number]>;
  budgetInclusions: [ExpenseCategory];
  budget: string;
  endDate: Moment | null;
  adultCount: number;
  childCount: number;
  groupCount: number;
}

export const GetDestinationsQuery = gql(
  `query GetDestinationsQuery {
    destinations {
      id
      name
    }
  }`,
);

const initialTripData: TripDataProps = {
  travelDestination: '',
  departureLocation: '',
  travelGroup: TravelSize.Solo,
  startDate: null,
  endDate: null,
  preferredTime: [[10, 18]],
  budgetInclusions: [ExpenseCategory.Accommodation],
  budget: '',
  adultCount: 2,
  childCount: 1,
  groupCount: 2,
};

const initialLocationDate: LocationProps = {
  id: '',
  name: '',
  center: [0, 0],
  place_name: '',
};

export default function CreateTripScreen() {
  const router = useRouter();
  const { section, title } = useLocalSearchParams();
  const { data } = useQuery(GetDestinationsQueryDocument);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [activeSections, setActiveSections] = useState<number[]>([0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);
  const [tripDurationDays, setTripDurationDays] = useState<number>(1);

  const [tripData, setTripData] = useState<TripDataProps>(initialTripData);
  const [selectedDepartureLocation, setSelectedDepartureLocation] =
    useState<LocationProps>(initialLocationDate);

  const [preferredTimeValues, setPreferredTimeValues] = useState<
    Array<[number, number]>
  >([]);

  const handleTripDataChange = (name: string, newValue: unknown) => {
    setTripData({
      ...tripData,
      [name]: newValue,
    });

    if (name === 'departureLocation' && newValue) {
      setSelectedDepartureLocation(newValue as LocationProps);
    }
  };

  const handleDateChange = (
    startDate: Moment | null,
    endDate: Moment | null,
  ) => {
    setTripData((prevData) => ({
      ...prevData,
      startDate: startDate,
      endDate: endDate,
    }));

    if (startDate && endDate) {
      const numberOfDays = endDate.diff(startDate, 'days') + 1;

      // Ensure numberOfDays is a valid positive integer, default to 1 if not.
      const validNumberOfDays = numberOfDays > 0 ? numberOfDays : 1;

      setTripDurationDays(validNumberOfDays); // Update the number of days
    }
  };

  const setSections = (sections: number[]) => {
    setActiveSection(sections[0]!);
    setActiveSections(sections);
  };

  const handleBackButtonPress = () => {
    const hasChanged =
      JSON.stringify(tripData) !== JSON.stringify(initialTripData);

    if (hasChanged) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      confirmationAlert(
        'Discard changes',
        'Are you sure you want to discard your changes?',
        'Discard',
        'Cancel',
        () => {
          router.back();
        },
      );
    } else {
      router.back();
    }
  };

  const handleStepPress = (step: number) => {
    if (!visitedSteps.includes(step)) {
      setVisitedSteps([...visitedSteps, step]);
    }
    setSections([step]);
  };

  const handleNextStep = () => {
    if (!visitedSteps.includes(activeSection)) {
      // Add the current section to the visited sections
      setVisitedSteps([...visitedSteps, activeSection]);
    }

    const currentStepIndex = stepperProperty[
      activeSection
    ] as keyof typeof tripData;

    if (tripData[currentStepIndex]) {
      // Mark the current step as completed
      setCompletedSteps([...completedSteps, activeSection]);

      const nextStep = activeSection + 1;
      setSections([nextStep]);

      if (!visitedSteps.includes(nextStep)) {
        setVisitedSteps([...visitedSteps, nextStep]);
      }
    }
  };

  const handleSaveTrip = () => {
    const currentStepIndex = stepperProperty[
      activeSection
    ] as keyof typeof tripData;

    const missingDataSection = !tripData[currentStepIndex];

    const startDateString = tripData.startDate
      ? tripData.startDate.format('YYYY-MM-DD')
      : '';
    const endDateString = tripData.endDate
      ? tripData.endDate.format('YYYY-MM-DD')
      : '';

    if (!missingDataSection) {
      setCompletedSteps([...completedSteps, activeSection]);
      router.push({
        pathname: '/trip/review',
        params: {
          departingLocation: selectedDepartureLocation.name,
          travelGroup: tripData.travelGroup,
          groupCount: tripData.groupCount,
          adultCount:
            tripData.travelGroup === TravelSize.Solo
              ? 1
              : tripData.travelGroup == TravelSize.Couple
              ? 2
              : tripData.adultCount,
          childCount:
            tripData.travelGroup === TravelSize.Family
              ? tripData.childCount
              : 0,
          startDate: startDateString,
          endDate: endDateString,
          budget: tripData.budget,
          budgetInclusions: tripData.budgetInclusions,
          preferredTime: preferredTimeValues.map(
            ([start, end]) => `${start}:00-${end}:00`,
          ),
          title: title ? title : `${tripData.travelDestination} Trip`,
          locationName: selectedDepartureLocation.name,
          locationAddress: selectedDepartureLocation.place_name || '',
          locationLng: selectedDepartureLocation.center[0] || 0,
          locationLat: selectedDepartureLocation.center[1] || 0,
          destinationId: data
            ? data.destinations.find(
                (a) => a.name === tripData.travelDestination,
              )!.id
            : '',
        },
      });
    }
  };

  const isLastStep = activeSection === Sections.length - 1;

  const renderNextButton = () => {
    if (section) {
      return <StepperButton onPress={handleSaveTrip} label="Save" />;
    }

    if (isLastStep) {
      return <StepperButton onPress={handleSaveTrip} label="Save" />;
    } else {
      return <StepperButton onPress={handleNextStep} label="Next" />;
    }
  };

  const renderHeader = (
    section: SectionProps,
    index: number,
    isActive: boolean,
  ) => {
    const isCompleted = completedSteps.includes(index);

    return (
      <Stepper
        key={index}
        isActive={isActive}
        isCompleted={isCompleted}
        onStepPress={handleStepPress}
        index={index}
        section={section}
      />
    );
  };

  const renderContent = (_: unknown, index: number) => {
    return (
      <View className="ml-9 mt-2" collapsable>
        {fields[index]}
      </View>
    );
  };

  const fields = [
    <SearchableTextInput
      key={1}
      placeholder="Search Destination"
      data={data ? data.destinations : []}
      onChange={(value) => handleTripDataChange('travelDestination', value)}
    />,
    <GeocoderSearch
      key={2}
      placeholder="Search Departing Location"
      onChange={(value) => handleTripDataChange('departureLocation', value)}
    />,
    <TravelGroupCategorySelection
      key={3}
      onTravelGroupChange={(value) =>
        handleTripDataChange('travelGroup', value)
      }
      onGroupCountChange={(value) => handleTripDataChange('groupCount', value)}
      onAdultCountChange={(value) => handleTripDataChange('adultCount', value)}
      onChildCountChange={(value) => handleTripDataChange('childCount', value)}
    />,
    <DateRangePicker
      key={4}
      onDateChange={(sd, ed) => handleDateChange(sd, ed)}
    />,
    <PreferedTimeSelection
      onValueChange={(values) => setPreferredTimeValues(values)}
      tripDuration={tripDurationDays}
    />,
    <BudgetCategorySelection
      key={6}
      onOptionChange={(value) =>
        handleTripDataChange('budgetInclusions', value)
      }
    />,
    <AmountTextInput
      key={5}
      onChangeText={(value) => handleTripDataChange('budget', value)}
    />,
  ];

  useEffect(() => {
    setSections([section ? parseInt(section as string) : 0]);
  }, [section]);

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={['right', 'left', 'bottom']}
    >
      <Stack.Screen
        options={{
          title: 'Create Trip',
          headerTitleStyle: {
            color: '#504D4D',
            fontSize: 22,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackButtonPress}>
              <Back height={25} width={25} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView>
        <View className="p-4">
          <Accordion
            activeSections={activeSections}
            sections={Sections.filter((_, index) =>
              visitedSteps.includes(index),
            )}
            touchableComponent={TouchableOpacity}
            expandMultiple={false}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={500}
            onChange={setSections}
            expandFromBottom={false}
            containerStyle={{ height: 500 }}
          />
        </View>
      </ScrollView>
      <View>
        {renderNextButton()}
        <Text className="mt-2 self-center font-poppins-medium text-lg text-gray-400">
          {activeSection !== -1 ? visitedSteps.length : 0} of {Sections.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const stepperProperty: (keyof TripDataProps)[] = [
  'travelDestination',
  'departureLocation',
  'travelGroup',
  'startDate',
  'preferredTime',
  'budgetInclusions',
  'budget',
];

const Sections = [
  {
    title: 'Where do you want to travel?',
  },
  {
    title: 'Where are you departing from?',
  },
  {
    title: 'Whom are you traveling with?',
  },
  {
    title: 'When is your trip?',
  },
  {
    title: 'When is your free time?',
  },
  {
    title: 'What should be included in your budget?',
  },
  {
    title: 'How much is your budget?',
  },
];
