import { useState } from 'react';
import { Text, View } from 'react-native';

import TravelGroupCard from '~/components/Card/TravelGroupCard';
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
}

export default function TravelGroupCategorySelection({
  onTravelGroupChange: onTravelCompanionValueChange,
  onGroupCountChange,
  onAdultCountChange,
  onChildCountChange,
}: TravelGroupCategorySelectionProps) {
  const [selectedValue, setSelectedValue] = useState<TravelSize>(
    TravelSize.Solo,
  );
  const [childCount, setChildCount] = useState(1);
  const [adultCount, setAdultCount] = useState(2);
  const [groupCount, setGroupCount] = useState(2);

  const incrementCount = (
    count: number,
    setCount: (count: number) => void,
    onChange: (count: number) => void,
  ) => {
    setCount(count + 1);
    onChange(count + 1);
  };

  const decrementCount = (
    count: number,
    setCount: (count: number) => void,
    onChange: (count: number) => void,
  ) => {
    if (count > 0) {
      setCount(count - 1);
      onChange(count - 1);
    }
  };

  const handleValueChange = (value: TravelSize) => {
    setSelectedValue(value);
    onTravelCompanionValueChange(value);
  };

  const travelers = {
    SOLO: '1 traveler',
    COUPLE: '2 travelers',
    GROUP: `${groupCount} ${groupCount > 1 ? `travelers` : `traveler`}`,
    FAMILY: `${adultCount + childCount} ${
      adultCount + childCount > 1 ? `travelers` : `traveler`
    } `,
  };

  return (
    <View>
      <View className="flex-row">
        <TravelGroupCard
          icon={<Solo height={30} width={30} />}
          title="Just me"
          onPress={() => handleValueChange(TravelSize.Solo)}
          isSelected={selectedValue === TravelSize.Solo}
        />
        <TravelGroupCard
          icon={<Couple height={30} width={30} />}
          title="A partner"
          onPress={() => handleValueChange(TravelSize.Couple)}
          isSelected={selectedValue === TravelSize.Couple}
        />
      </View>
      <View className="flex-row">
        <TravelGroupCard
          icon={<Group height={30} width={30} />}
          title="Group"
          onPress={() => handleValueChange(TravelSize.Group)}
          isSelected={selectedValue === TravelSize.Group}
        />
        <TravelGroupCard
          icon={<Family height={30} width={30} />}
          title="Family"
          onPress={() => handleValueChange(TravelSize.Family)}
          isSelected={selectedValue === TravelSize.Family}
        />
      </View>
      {selectedValue === TravelSize.Group ? (
        <Counter
          label="People"
          count={groupCount}
          onIncrement={() =>
            incrementCount(groupCount, setGroupCount, onGroupCountChange)
          }
          onDecrement={() =>
            decrementCount(groupCount, setGroupCount, onGroupCountChange)
          }
        />
      ) : selectedValue === TravelSize.Family ? (
        <View>
          <Counter
            label="Adults"
            count={adultCount}
            onIncrement={() =>
              incrementCount(adultCount, setAdultCount, onAdultCountChange)
            }
            onDecrement={() =>
              decrementCount(adultCount, setAdultCount, onAdultCountChange)
            }
          />
          <Counter
            label="Children"
            count={childCount}
            onIncrement={() =>
              incrementCount(childCount, setChildCount, onChildCountChange)
            }
            onDecrement={() =>
              decrementCount(childCount, setChildCount, onChildCountChange)
            }
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
