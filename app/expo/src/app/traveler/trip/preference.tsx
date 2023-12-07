import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@apollo/client';

import StepperButton from '~/components/Button/StepperButton';
import AccommodationSelection from '~/components/FormField/AccommodationSelection';
import ActivitiesSelection from '~/components/FormField/ActivitiesSelection';
import CuisineSelection from '~/components/FormField/CuisineSelection';
import DiningStyleSelection from '~/components/FormField/DiningStyleSelection';
import MultiSelection from '~/components/FormField/MultiSelection';
import Stepper from '~/components/Stepper/Stepper';
import { ExpenseCategory, GetPoiFeaturesDocument } from '~/graphql/generated';
import { TripPreferenceData } from '~/store/types';
import useFormstore from '~/store/useFormStore';
import Back from '../../../../assets/images/back-btn.svg';

interface SectionProps {
  title: string;
}

export default function TripPreferenceScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    preferenceData,
    activeSection,
    activeSections,
    completedSteps,
    visitedSteps,
    tripData,
    setData,
    setActiveSection,
    setActiveSections,
    setCompletedSteps,
    setVisitedSteps,
  } = useFormstore();

  const Sections = [
    ...(tripData.budgetInclusions &&
    tripData.budgetInclusions.includes(ExpenseCategory.Accommodation)
      ? [
          {
            title: 'Choose accommodation type',
          },
        ]
      : []),
    ...(tripData.budgetInclusions &&
    tripData.budgetInclusions.includes(ExpenseCategory.Accommodation)
      ? [
          {
            title: 'Choose amenities',
          },
        ]
      : []),
    {
      title: 'Choose activities you like',
    },
    ...(tripData.budgetInclusions &&
    tripData.budgetInclusions.includes(ExpenseCategory.Food)
      ? [
          {
            title: 'Choose dining styles',
          },
          {
            title: 'Choose cuisines you like',
          },
        ]
      : []),
  ];

  const [amenities, setAmenities] = useState<{ key: number; value: string }[]>(
    [],
  );

  const screenHeight = Dimensions.get('window').height;

  const [cuisines, setCuisines] = useState<{ id: number; name: string }[]>([]);

  const { data } = useQuery(GetPoiFeaturesDocument);

  useEffect(() => {
    if (data) {
      setAmenities(
        data.amenities.map((amenity) => ({
          key: amenity.id,
          value: amenity.name,
        })),
      );
      setCuisines(
        data.restaurantCategoriesMoreThanFive.map((category) => ({
          id: category.id,
          name: category.name.replace('restaurant', '').trim(),
        })),
      );
    }
  }, [data]);

  const isAmenitiesSelected = () => {
    return (
      (preferenceData.amenities && preferenceData.amenities.length > 0) ||
      amenities.length > 0
    );
  };

  const isActivitiesSelected = () => {
    return Object.values(preferenceData.activities).some((value) => value > 0);
  };

  const isDiningStylesSelected = () => {
    return preferenceData.diningStyles.length > 0;
  };

  const isCuisinesSelected = () => {
    return preferenceData.cuisines.length > 0;
  };

  const getSelectedActivities = () => {
    return Object.fromEntries(
      Object.entries(preferenceData.activities).filter(
        ([, value]) => value !== 0,
      ),
    );
  };

  const handleBackButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleTripPreferenceChange = (
    name: string,
    newValue: unknown,
    isActivities?: boolean,
  ) => {
    if (isActivities) {
      setData({
        step: 2,
        data: {
          ...preferenceData,
          activities: {
            ...preferenceData.activities,
            [name]: newValue,
          },
        },
      });
    } else {
      setData({
        step: 2,
        data: {
          ...preferenceData,
          [name]: newValue,
        },
      });
    }
  };

  const setSections = (sections: number[]) => {
    setActiveSection(sections[0]!);
    setActiveSections(sections);
  };

  const handleStepPress = (step: number) => {
    if (!visitedSteps.includes(step)) {
      setVisitedSteps([...visitedSteps, step]);
    }
    setActiveSection(step);
    setSections([step]);
  };

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!visitedSteps.includes(activeSection)) {
      // Add the current section to the visited sections
      setVisitedSteps([...visitedSteps, activeSection]);
    }

    const currentStepIndex = stepperProperty[
      activeSection
    ] as keyof typeof preferenceData;

    if (activeSection === 1) {
      if (!isAmenitiesSelected()) {
        alert('Please select at least one amenity.');
        return;
      }
    }

    if (activeSection === 2) {
      if (!isActivitiesSelected()) {
        alert('Please select at least one activity.');
        return;
      }
    }

    if (activeSection === 3) {
      if (!isDiningStylesSelected()) {
        alert('Please select at least one dining style.');
        return;
      }
    }

    if (activeSection === 4) {
      if (!isCuisinesSelected()) {
        alert('Please select at least one cuisine.');
        return;
      }
    }

    if (preferenceData[currentStepIndex]) {
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const currentStepIndex = stepperProperty[
      activeSection
    ] as keyof typeof preferenceData;

    const missingDataSection = !preferenceData[currentStepIndex];

    if (!isAmenitiesSelected()) {
      setActiveSection(1);
      setSections([1]);
      alert('Please select at least one amenity.');
      return;
    }

    if (!isActivitiesSelected()) {
      setActiveSection(2);
      setSections([2]);
      alert('Please select at least one activity.');
      return;
    }

    if (!isDiningStylesSelected()) {
      setActiveSection(3);
      setSections([3]);
      alert('Please select at least one dining style.');
      return;
    }

    if (!isCuisinesSelected()) {
      alert('Please select at least one cuisine.');
      return;
    }

    if (!missingDataSection) {
      setCompletedSteps([...completedSteps, activeSection]);
      setData({
        step: 2,
        data: {
          ...preferenceData,
          activities: getSelectedActivities(),
        },
      });
      router.push('/traveler/trip/review');
    }
  };

  const isLastStep = activeSection === Sections.length - 1;

  const renderNextButton = () => {
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
    // Accommodation Selection
    ...(tripData.budgetInclusions &&
    tripData.budgetInclusions.includes(ExpenseCategory.Accommodation)
      ? [
          <AccommodationSelection
            initialSelectedOption={preferenceData.accommodationType}
            onOptionChange={(value) =>
              handleTripPreferenceChange('accommodationType', value)
            }
            key={1}
          />,
        ]
      : []),
    // Amenities Selection
    ...(tripData.budgetInclusions &&
    tripData.budgetInclusions.includes(ExpenseCategory.Accommodation)
      ? [
          <MultiSelection
            data={amenities}
            initialSelectedOptions={preferenceData.amenities}
            key={2}
            onOptionChange={(value) =>
              handleTripPreferenceChange('amenities', value)
            }
            placeholder="Amenities"
          />,
        ]
      : []),
    // Activities Selection
    <ActivitiesSelection
      initialActivityValues={preferenceData.activities}
      onActivitiesSliderValueChange={(name, value) =>
        handleTripPreferenceChange(name, value, true)
      }
      key={3}
    />,
    // Dining Style Selection
    ...(tripData.budgetInclusions &&
    tripData.budgetInclusions.includes(ExpenseCategory.Food)
      ? [
          <DiningStyleSelection
            initialSelectedOptions={preferenceData.diningStyles}
            onOptionChange={(value) =>
              handleTripPreferenceChange('diningStyles', value)
            }
            key={4}
          />,
        ]
      : []),
    // Cuisine Selection
    ...(tripData.budgetInclusions &&
    tripData.budgetInclusions.includes(ExpenseCategory.Food)
      ? [
          <CuisineSelection
            data={cuisines}
            initialSelectedOptions={preferenceData.cuisines}
            onOptionChange={(value) =>
              handleTripPreferenceChange('cuisines', value)
            }
            key={5}
          />,
        ]
      : []),
  ];
  useEffect(() => {
    setActiveSection(section ? parseInt(section as string) : 0);
    setSections([section ? parseInt(section as string) : activeSection]);
  }, [section]);

  return (
    <SafeAreaView
      className="flex-grow bg-white"
      edges={['right', 'left', 'bottom']}
    >
      <Stack.Screen
        options={{
          title: 'Trip preference',
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
        <View className="p-3.5">
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
            containerStyle={{ height: screenHeight * 0.7 }}
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

const stepperProperty: (keyof TripPreferenceData)[] = [
  'accommodationType',
  'amenities',
  'activities',
  'diningStyles',
  'cuisines',
];
