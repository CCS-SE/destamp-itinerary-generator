import { Text, View } from 'react-native';

import TravelGroupCard from '~/components/Card/traveler/TravelGroupCard';
import { TravelSize } from '~/graphql/generated';
import Couple from '../../../assets/images/couple.svg';
import Family from '../../../assets/images/family.svg';
import Group from '../../../assets/images/group.svg';
import Solo from '../../../assets/images/solo.svg';
import Counter from '../Counter/Counter';

interface TravelGroupCategorySelectionProps {
  initialTravelSize: TravelSize;
  initialGroupCount: number;
  initialAdultCount: number;
  initialChildCount: number;
  onTravelSizeChange: (value: TravelSize) => void;
  onGroupCountChange: (value: number) => void;
  onAdultCountChange: (value: number) => void;
  onChildCountChange: (value: number) => void;
}

export default function TravelSizeCategorySelection({
  initialTravelSize,
  initialGroupCount,
  initialAdultCount,
  initialChildCount,
  onTravelSizeChange,
  onGroupCountChange,
  onAdultCountChange,
  onChildCountChange,
}: TravelGroupCategorySelectionProps) {
  const incrementCount = (count: number, onChange: (count: number) => void) => {
    onChange(count + 1);
  };

  const decrementCount = (
    count: number,
    onChange: (count: number) => void,
    minCount: number = 0,
  ) => {
    if (count > minCount) {
      onChange(count - 1);
    }
  };

  const handleValueChange = (value: TravelSize) => {
    onTravelSizeChange(value);
  };

  const travelers = {
    SOLO: `${initialAdultCount} traveler`,
    COUPLE: `${initialAdultCount} travelers`,
    GROUP: `${initialGroupCount} ${
      initialGroupCount > 1 ? 'travelers' : 'traveler'
    }`,
    FAMILY: `${initialAdultCount + initialChildCount} ${
      initialAdultCount + initialChildCount > 1 ? 'travelers' : 'traveler'
    } `,
  };

  return (
    <View>
      <View className="flex-row">
        <TravelGroupCard
          icon={<Solo height={25} width={25} />}
          title="Just me"
          onPress={() => {
            handleValueChange(TravelSize.Solo);
          }}
          isSelected={initialTravelSize === TravelSize.Solo}
        />
        <TravelGroupCard
          icon={<Couple height={25} width={25} />}
          title="A partner"
          onPress={() => handleValueChange(TravelSize.Couple)}
          isSelected={initialTravelSize === TravelSize.Couple}
        />
      </View>
      <View className="flex-row">
        <TravelGroupCard
          icon={<Group height={25} width={30} />}
          title="Group"
          onPress={() => handleValueChange(TravelSize.Group)}
          isSelected={initialTravelSize === TravelSize.Group}
        />
        <TravelGroupCard
          icon={<Family height={25} width={25} />}
          title="Family"
          onPress={() => handleValueChange(TravelSize.Family)}
          isSelected={initialTravelSize === TravelSize.Family}
        />
      </View>
      {initialTravelSize === TravelSize.Group ? (
        <Counter
          label="People"
          count={initialGroupCount}
          onIncrement={() =>
            incrementCount(initialGroupCount, onGroupCountChange)
          }
          onDecrement={() =>
            decrementCount(initialGroupCount, onGroupCountChange, 1)
          }
        />
      ) : initialTravelSize === TravelSize.Family ? (
        <View>
          <Counter
            label="Adults"
            count={initialAdultCount}
            onIncrement={() =>
              incrementCount(initialAdultCount, onAdultCountChange)
            }
            onDecrement={() =>
              decrementCount(initialAdultCount, onAdultCountChange, 1)
            }
          />
          <Counter
            label="Children"
            count={initialChildCount}
            onIncrement={() =>
              incrementCount(initialChildCount, onChildCountChange)
            }
            onDecrement={() =>
              decrementCount(initialChildCount, onChildCountChange, 0)
            }
          />
        </View>
      ) : (
        <></>
      )}
      <Text className="ml-4 font-poppins text-gray-500">
        {travelers[initialTravelSize]}
      </Text>
    </View>
  );
}
