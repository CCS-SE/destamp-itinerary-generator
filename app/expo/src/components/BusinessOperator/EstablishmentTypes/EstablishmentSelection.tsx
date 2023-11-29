// EstablishmentSelection.js
import React from 'react';
import { ScrollView } from 'react-native';

import EstablishmentTypeButton from '~/components/Button/EstablishmentTypeButton';

const EstablishmentSelection = ({
  onSelect,
  selectedType,
}: {
  onSelect: (type: string) => void;
  selectedType: string | null;
}) => {
  return (
    <ScrollView>
      <EstablishmentTypeButton
        label="Accommodation"
        onSelect={() => onSelect('Accommodation')}
        isSelected={selectedType === 'Accommodation'}
      />
      <EstablishmentTypeButton
        label="Attraction"
        onSelect={() => onSelect('Attraction')}
        isSelected={selectedType === 'Attraction'}
      />
      <EstablishmentTypeButton
        label="Restaurant"
        onSelect={() => onSelect('Restaurant')}
        isSelected={selectedType === 'Restaurant'}
      />
    </ScrollView>
  );
};

export default EstablishmentSelection;
