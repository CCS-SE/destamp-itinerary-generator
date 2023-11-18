import { useState } from 'react';
import { Text, View } from 'react-native';

import TravelGroupCard from '~/components/Card/traveler/TravelGroupCard';
import { TravelSize } from '~/graphql/generated';
import Couple from '../../../assets/images/couple.svg';
import Family from '../../../assets/images/family.svg';
import Group from '../../../assets/images/group.svg';
import Solo from '../../../assets/images/solo.svg';
import Counter from '../Counter/Counter';

interface TravelGroupCategorySelectionProps {
  onTravelGroupChange: (value: TravelSize) => void;
  onGroupCountChange: (value: number) => void;
  onAdultCountChange: (value: number) => void;
  onChildCountChange: (value: number) => void;
  onTravelerCountChange: (value: number) => void;
}

export default function TravelSizeCategorySelection({
  onTravelGroupChange: onTravelCompanionValueChange,
  onGroupCountChange,
  onAdultCountChange,
  onChildCountChange,
  onTravelerCountChange,
}: TravelGroupCategorySelectionProps) {
  const [selectedValue, setSelectedValue] = useState<TravelSize>(
    TravelSize.Solo,
  );
  const [childCount, setChildCount] = useState(1);
  const [adultCount, setAdultCount] = useState(2);
  const [groupCount, setGroupCount] = useState(3);
  const [travelerCount, setTravelerCount] = useState(0);

  const incrementCount = (
    count: number,
    setCount: (count: number) => void,
    onChange: (count: number) => void,
  ) => {
    setCount(count + 1);
    onChange(count + 1);
    setTravelerCount(travelerCount + 1);
  };

  const decrementCount = (
    count: number,
    setCount: (count: number) => void,
    onChange: (count: number) => void,
    minCount: number = 0,
  ) => {
    if (count > minCount) {
      setCount(count - 1);
      onChange(count - 1);

      setTravelerCount(travelerCount - 1);
    }
  };

  const handleValueChange = (value: TravelSize) => {
    setSelectedValue(value);
    onTravelCompanionValueChange(value);
  };

  const travelers = {
    SOLO: '1 traveler',
    COUPLE: '2 travelers',
    GROUP: `${travelerCount} ${travelerCount > 1 ? 'travelers' : 'traveler'}`,
    FAMILY: `${travelerCount} ${travelerCount > 1 ? 'travelers' : 'traveler'} `,
  };

  return (
    <View>
      <View className="flex-row">
        <TravelGroupCard
          icon={<Solo height={25} width={25} />}
          title="Just me"
          onPress={() => {
            handleValueChange(TravelSize.Solo);
            setTravelerCount(1);
          }}
          isSelected={selectedValue === TravelSize.Solo}
        />
        <TravelGroupCard
          icon={<Couple height={25} width={25} />}
          title="A partner"
          onPress={() => {
            handleValueChange(TravelSize.Couple);
            setTravelerCount(2);
          }}
          isSelected={selectedValue === TravelSize.Couple}
        />
      </View>
      <View className="flex-row">
        <TravelGroupCard
          icon={<Group height={25} width={30} />}
          title="Group"
          onPress={() => {
            handleValueChange(TravelSize.Group);
            setTravelerCount(groupCount);
          }}
          isSelected={selectedValue === TravelSize.Group}
        />
        <TravelGroupCard
          icon={<Family height={25} width={25} />}
          title="Family"
          onPress={() => {
            handleValueChange(TravelSize.Family);
            setTravelerCount(adultCount + childCount);
          }}
          isSelected={selectedValue === TravelSize.Family}
        />
      </View>
      {selectedValue === TravelSize.Group ? (
        <Counter
          label="People"
          count={groupCount}
          onIncrement={() => {
            incrementCount(groupCount, setGroupCount, onGroupCountChange);
          }}
          onDecrement={() => {
            decrementCount(groupCount, setGroupCount, onGroupCountChange, 2);
          }}
        />
      ) : selectedValue === TravelSize.Family ? (
        <View>
          <Counter
            label="Adults"
            count={adultCount}
            onIncrement={() => {
              incrementCount(adultCount, setAdultCount, onAdultCountChange);
            }}
            onDecrement={() => {
              decrementCount(adultCount, setAdultCount, onAdultCountChange, 2);
            }}
          />
          <Counter
            label="Children"
            count={childCount}
            onIncrement={() => {
              incrementCount(childCount, setChildCount, onChildCountChange);
            }}
            onDecrement={() => {
              decrementCount(childCount, setChildCount, onChildCountChange, 1);
            }}
          />
        </View>
      ) : (
        <></>
      )}
      <Text className="ml-4 font-poppins text-gray-500">
        {travelers[selectedValue]}
      </Text>
    </View>
  );
}
