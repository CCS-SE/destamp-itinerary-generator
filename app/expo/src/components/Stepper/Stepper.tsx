import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StepperProps {
  isActive: boolean;
  onStepPress: (step: number) => void;
  index: number;
  isCompleted: boolean;
}

interface SectionProps {
  title: string;
}

interface FieldTitleProps {
  title: string;
}

export default function Stepper({
  isActive,
  onStepPress,
  section,
  index,
  isCompleted,
}: StepperProps & { section: SectionProps }) {
  return (
    <View className="mt-4 flex-row items-center">
      <TouchableOpacity
        key={index}
        onPress={() => onStepPress(index)}
        style={[
          stepperStyles.step,
          isActive && stepperStyles.activeStep,
          isCompleted && stepperStyles.completedStep,
        ]}
      ></TouchableOpacity>
      <TouchableOpacity activeOpacity={1} onPress={() => onStepPress(index)}>
        <FieldTitle title={section.title} />
      </TouchableOpacity>
    </View>
  );
}

const FieldTitle = ({ title }: FieldTitleProps) => {
  return (
    <Text className="ml-4 font-poppins-medium text-lg text-[#FC8040]">
      {title}
    </Text>
  );
};

const stepperStyles = StyleSheet.create({
  step: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  activeStep: {
    borderColor: '#ccc',
  },
  completedStep: {
    borderColor: '#FC8040',
    backgroundColor: '#FC8040',
  },
});
