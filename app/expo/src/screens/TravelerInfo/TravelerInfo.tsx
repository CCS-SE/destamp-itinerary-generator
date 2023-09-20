/* eslint-disable */

import React, { useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TravelerInfo: React.FC = () => {
  const steps = [
    'Travel Destination',
    'Departing Location',
    'Travel Buddy',
    'Travel Date',
    'Budget',
  ];

  const stepInput = [
    { text: 'Where do you want to Travel?' },
    { text: 'Where are you Departing from?' },
    {
      text: 'Whom are you traveling with?',
      // isMultiInput: true, // Indicates multiple input boxes
    },
    {
      text: 'Select Travel Date',
      // isCalendar: true, // Indicates a calendar component
    },
    { text: 'What is your Budget?' },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  function handleNextButtonPress(event: GestureResponderEvent): void {
    throw Error('Function not implemented.');
  }

  function isStepComplete(stepIndex: number) {
    return stepIndex < currentStep;
  }

  return (
    <>
      <View style={styles.container}>
        {steps?.map((step, i) => (
          <View
            key={i}
            style={[
              styles.stepItem,
              currentStep === i + 1,
              (i + 1 < currentStep || complete) && styles.complete,
            ]}
          >
            {i !== 0 && <View style={styles.lineSeparator} />}
            <View style={styles.step}>
              {i + 1 < currentStep || complete ? (
                <View style={styles.circle}>
                  <MaterialIcons name="check" size={24} color="green" />
                </View>
              ) : (
                <View style={styles.circle}>
                  <Text style={styles.stepText}>{i + 1}</Text>
                </View>
              )}
              {/* add */}
            </View>
            <TextInput style={styles.textInput} placeholder={step}></TextInput>
            <Text style={styles.stepText}></Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          currentStep === steps.length
            ? setComplete(true)
            : setCurrentStep((prev) => prev + 1);
        }}
      >
        <Text style={styles.buttonText}>
          {currentStep === steps.length ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  stepItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 10,
    position: 'relative',
    height: 120, // Adjust height to accommodate multiple input boxes
  },
  lineSeparator: {
    content: '',
    backgroundColor: '#FF8F45',
    position: 'absolute',
    width: 5,
    height: '100%',
    // top: '50%',
    transform: [{ translateX: 18 }],
    bottom: '85%',
  },
  stepText: {
    color: 'gray',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeStep: {
    // backgroundColor: 'skyblue',
    // borderRadius: 20,
  },
  circle: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'orange',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  complete: {
    // backgroundColor: 'green',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    marginLeft: 50, // Adjust margin to separate text input from circle
    color: 'orange',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 10,
    width: 300,
  },
  multiInput: {
    marginLeft: 50, // Adjust margin to separate text input from circle
    color: 'orange',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 10,
    width: 250,
    marginBottom: 10, // Add margin between multiple input boxes
  },
});

export default TravelerInfo;
