import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Moment } from 'moment';

import StepperButton from '~/components/Button/StepperButton';
import AmountTextInput from '~/components/FormField/AmountTextInput';
import AutoComplete from '~/components/FormField/Autocomplete';
import BudgetCategorySelection from '~/components/FormField/BudgetCategorySelection';
import DateRangePicker from '~/components/FormField/DateRangePicker';
import GeocoderSearch from '~/components/FormField/MapboxGeocoder';
import TimeslotSelection from '~/components/FormField/TimeslotSelection';
import TravelSizeCategorySelection from '~/components/FormField/TravelSizeCategorySelection';
import Stepper from '~/components/Stepper/Stepper';
import { TravelSize } from '~/graphql/generated';
import { CreateTripData } from '~/store/types';
import useFormstore, { initialFormState } from '~/store/useFormStore';
import {
  confirmationAlert,
  formatDateToString,
  tripDuration,
} from '~/utils/utils';
import Back from '../../../../assets/images/back-btn.svg';

interface Section {
  title: string;
}

export default function CreateTripScreen() {
  const router = useRouter();
  const { tripData, setData, reset } = useFormstore();
  const { section } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView | null>(null);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [activeSections, setActiveSections] = useState<number[]>([0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);
  const [tripDurationDays, setTripDurationDays] = useState<number>(1);
  const [budgetError, setBudgetError] = useState('');

  const isStartingDateSelected = () => {
    return tripData.startDate !== null;
  };

  const handleTripDataChange = (name: string, newValue: unknown) => {
    setData({
      step: 1,
      data: {
        ...tripData,
        [name]: newValue,
      },
    });
  };

  const handleDateChange = (
    startDate: Moment | null,
    endDate: Moment | null,
  ) => {
    setData({
      step: 1,
      data: {
        ...tripData,
        startDate: startDate,
        endDate: endDate,
      },
    });

    if (startDate && endDate) {
      const numberOfDays = endDate.diff(startDate, 'days') + 1;

      // Ensure numberOfDays is a valid positive integer, default to 1 if not.
      const validNumberOfDays = numberOfDays > 0 ? numberOfDays : 1;

      setTripDurationDays(validNumberOfDays); // Update the number of days
    }
  };

  const handleTravelSizeChange = (value: TravelSize) => {
    if (value === TravelSize.Solo) {
      setData({
        step: 1,
        data: {
          ...tripData,
          travelSize: value,
          adultCount: 1,
          childCount: 0,
        },
      });
    } else if (value === TravelSize.Couple) {
      setData({
        step: 1,
        data: {
          ...tripData,
          travelSize: value,
          adultCount: 2,
          childCount: 0,
        },
      });
    } else {
      setData({
        step: 1,
        data: {
          ...tripData,
          travelSize: value,
        },
      });
    }
  };

  const setSections = (sections: number[]) => {
    setActiveSection(sections[0]!);
    setActiveSections(sections);
  };

  const handleBackButtonPress = () => {
    const hasChanged =
      JSON.stringify(initialFormState.tripData) !== JSON.stringify(tripData);

    if (hasChanged) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      confirmationAlert(
        'Discard changes',
        'Are you sure you want to discard your changes?',
        'Discard',
        'Cancel',
        () => {
          reset();
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!visitedSteps.includes(activeSection)) {
      // Add the current section to the visited sections
      setVisitedSteps([...visitedSteps, activeSection]);
    }

    if (activeSection === 3) {
      if (!isStartingDateSelected()) {
        alert('Please select date.');
        return;
      }
    }

    const currentStepIndex = stepperProperty[
      activeSection
    ] as keyof typeof tripData;

    if (tripData[currentStepIndex]) {
      if (
        currentStepIndex === 'startingLocation' &&
        !tripData.startingLocation?.name
      ) {
        return;
      }

      // Mark the current step as completed
      setCompletedSteps([...completedSteps, activeSection]);

      const nextStep = activeSection + 1;
      setSections([nextStep]);

      if (!visitedSteps.includes(nextStep)) {
        setVisitedSteps([...visitedSteps, nextStep]);
      }
    }

    scrollViewRef.current?.scrollTo({
      x: 0,
      y: 54 * (activeSection + 1) - activeSection * 10,
      animated: true,
    });
  };

  const handleSaveTrip = () => {
    const currentStepIndex = stepperProperty[
      activeSection
    ] as keyof typeof tripData;

    const missingDataSection = !tripData[currentStepIndex];

    if (tripData.startingLocation?.name === '') {
      setActiveSection(1);
      setSections([1]);
      alert('Please select starting location.');
      return;
    }

    if (!isStartingDateSelected()) {
      setActiveSection(3);
      setSections([3]);
      alert('Please select date.');
      return;
    }

    if (!tripData.budget) {
      alert('Please enter your budget.');
      return;
    }

    if (!missingDataSection && budgetError == '') {
      setCompletedSteps([...completedSteps, activeSection]);
      setData({
        step: 1,
        data: {
          ...tripData,
        },
      });
      router.push('/traveler/trip/preference');
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

  const renderHeader = (section: Section, index: number, isActive: boolean) => {
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
    <AutoComplete
      key={1}
      initialValue={tripData.destination}
      data={destinations}
      onChange={(value) => handleTripDataChange('destination', value)}
    />,
    <GeocoderSearch
      key={2}
      placeholder="Search Starting Location"
      onChange={(value) => handleTripDataChange('startingLocation', value)}
    />,
    <TravelSizeCategorySelection
      key={3}
      initialTravelSize={tripData.travelSize}
      initialAdultCount={tripData.adultCount}
      initialChildCount={tripData.childCount}
      initialGroupCount={tripData.groupCount}
      onTravelSizeChange={(value) => handleTravelSizeChange(value)}
      onGroupCountChange={(value) => handleTripDataChange('groupCount', value)}
      onAdultCountChange={(value) => handleTripDataChange('adultCount', value)}
      onChildCountChange={(value) => handleTripDataChange('childCount', value)}
    />,
    <DateRangePicker
      key={4}
      onDateChange={(sd, ed) => handleDateChange(sd, ed)}
    />,
    <TimeslotSelection
      key={5}
      onValueChange={(values) => handleTripDataChange('timeslots', values)}
      tripDuration={tripDurationDays}
    />,
    <BudgetCategorySelection
      key={6}
      onOptionChange={(value) =>
        handleTripDataChange('budgetInclusions', value)
      }
    />,
    <AmountTextInput
      key={7}
      budgetInlusions={tripData.budgetInclusions}
      duration={tripDuration(
        formatDateToString(tripData.startDate),
        formatDateToString(tripData.endDate),
      )}
      totalTraveler={
        tripData.travelSize === TravelSize.Group
          ? tripData.groupCount
          : tripData.adultCount + tripData.childCount
      }
      onChangeText={(value) => handleTripDataChange('budget', value)}
      onBudgetError={(value) => setBudgetError(value)}
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
            fontSize: 21,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackButtonPress}>
              <Back height={25} width={25} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView ref={scrollViewRef} scrollToOverflowEnabled>
        <View className="flex-1 overflow-hidden p-3.5">
          <Accordion
            activeSections={activeSections}
            sections={Sections.filter((_, index) =>
              visitedSteps.includes(index),
            )}
            touchableComponent={TouchableOpacity}
            touchableProps={{ activeOpacity: 0.9 }}
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

const stepperProperty: (keyof CreateTripData)[] = [
  'destination',
  'startingLocation',
  'travelSize',
  'startDate',
  'timeslots',
  'budgetInclusions',
  'budget',
];

const Sections = [
  {
    title: 'Where do you want to travel?',
  },
  {
    title: 'Where do you want to start your trip?',
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

const destinations = [
  {
    id: '1',
    title: 'Iloilo City',
  },
];
