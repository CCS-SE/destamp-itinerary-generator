import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import StepperButton from '~/components/Button/StepperButton';
import AmountTextInput from '~/components/FormField/AmountTextInput';
import BudgetCategorySelection from '~/components/FormField/BudgetCategorySelection';
import DateRangePicker from '~/components/FormField/DateRangePicker';
import SearchableTextInput from '~/components/FormField/SearchableTextInput';
import TravelGroupCategorySelection from '~/components/FormField/TravelGroupCategorySelection';
import Stepper from '~/components/Stepper/Stepper';
import {
  ExpenseCategory,
  GetDestinationsQueryDocument,
  TravelSize,
} from '~/graphql/generated';
import { confirmationAlert } from '~/utils/utils';
import Back from '../../../assets/images/back-btn.svg';

interface SectionProps {
  title: string;
}

interface TripDataProps {
  travelDestination: string;
  departureLocation: string;
  travelGroup: TravelSize;
  startDate: string | null;
  endDate: string | null;
  budget: string;
  budgetInclusions: [ExpenseCategory];
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
  budget: '',
  budgetInclusions: [ExpenseCategory.Accommodation],
  adultCount: 2,
  childCount: 1,
  groupCount: 2,
};

export default function CreateTripScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams();
  const { data } = useQuery(GetDestinationsQueryDocument);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [activeSections, setActiveSections] = useState<number[]>([0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);

  const [tripData, setTripData] = useState<TripDataProps>(initialTripData);

  const handleTripDataChange = (propertyName: string, newValue: any) => {
    setTripData({
      ...tripData,
      [propertyName]: newValue,
    });
  };

  const handleDateChange = (
    startDate: string | null,
    endDate: string | null,
  ) => {
    setTripData((prevData) => ({
      ...prevData,
      startDate: startDate,
      endDate: endDate,
    }));
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

    if (!missingDataSection) {
      setCompletedSteps([...completedSteps, activeSection]);
      router.push({
        pathname: '/trip/review',
        params: {
          travelDestination: tripData.travelDestination,
          departingLocation: tripData.departureLocation,
          travelGroup: tripData.travelGroup,
          groupCount: tripData.groupCount,
          adultCount: tripData.adultCount,
          childCount: tripData.childCount,
          startDate: tripData.startDate || '',
          endDate: tripData.endDate || '',
          budget: tripData.budget,
          budgetInclusions: tripData.budgetInclusions,
          title: `${tripData.travelDestination} Trip`,
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
      placeholder="Search Destination"
      data={data ? data.destinations : []}
      onChange={(value) => handleTripDataChange('travelDestination', value)}
    />,
    <SearchableTextInput
      placeholder="Search Departing Location"
      data={data ? data.destinations : []}
      onChange={(value) => handleTripDataChange('departureLocation', value)}
    />,
    <TravelGroupCategorySelection
      onTravelGroupChange={(value) =>
        handleTripDataChange('travelGroup', value)
      }
      onGroupCountChange={(value) => handleTripDataChange('groupCount', value)}
      onAdultCountChange={(value) => handleTripDataChange('adultCount', value)}
      onChildCountChange={(value) => handleTripDataChange('childCount', value)}
    />,
    <DateRangePicker onDateChange={(sd, ed) => handleDateChange(sd, ed)} />,
    <AmountTextInput
      onChangeText={(value) => handleTripDataChange('budget', value)}
    />,
    <BudgetCategorySelection
      onOptionChange={(value) =>
        handleTripDataChange('budgetInclusions', value)
      }
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
            fontSize: 20,
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
  'budget',
  'budgetInclusions',
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
    title: 'How much is your budget?',
  },
  {
    title: 'What should be included in your budget?',
  },
];
