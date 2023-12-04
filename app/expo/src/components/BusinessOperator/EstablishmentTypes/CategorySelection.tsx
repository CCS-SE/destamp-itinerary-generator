// CategorySelection.js
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import BottomHalfModal from '~/components/Modal/BottomHalfModal';
// import { Category } from '~/graphql/generated'; // Make sure this import is correct
import { Category as GraphQLCategory } from '~/graphql/generated';

interface CategorySelectionProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCategory: (category: GraphQLCategory) => void;
  selectedCategory: GraphQLCategory | null;
  categories: GraphQLCategory[];
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  isVisible,
  onClose,
  onSelectCategory,
  selectedCategory,
  categories,
}) => {
  return (
    <BottomHalfModal isVisible={isVisible} onClose={onClose}>
      <FlatList
        data={categories}
        numColumns={3}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectCategory(item)}
            style={{
              width: 100,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              margin: 3,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor:
                  selectedCategory?.id === item.id
                    ? '#EB4586' // Selected color
                    : '#5A5A5A', // Unselected color
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {selectedCategory?.id === item.id && (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#EB4586',
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontFamily: 'Poppins',
                width: 70,
                fontSize: 10,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </BottomHalfModal>
  );
};

export default CategorySelection;
