import React, { useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Questions from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CustomButton from '~/components/Button/CustomButtom';
import EstablishmentTypeButton from '~/components/Button/EstablishmentTypeButton';
import Tag from '~/components/Container/Tag';
import RightSlideModal from '~/components/Modal/CustomModal';

interface Category {
  id: string;
  name: string;
}

interface GetCategoryListQueryResult {
  categories: Category[];
}
const fakeCategories: Record<string, { id: string; name: string }[]> = {
  Accommodation: [
    { id: '1', name: 'Hotel' },
    { id: '2', name: 'Motel' },
    { id: '3', name: 'Inn' },
  ],
  Attraction: [
    { id: '4', name: 'Museum' },
    { id: '5', name: 'Park' },
    { id: '6', name: 'Zoo' },
  ],
  Restaurant: [
    { id: '7', name: 'Italian' },
    { id: '8', name: 'Mexican' },
    { id: '9', name: 'Sushi' },
  ],
};

const EstablishmentType = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    setShowCategories(false); // Reset the flag when a new type is selected
  };

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategory(category);
    setShowCategories(true); // Set the flag to show the categories
  };

  const handleContinue = () => {
    if (!selectedType) {
      return;
    }

    if (!selectedCategory) {
      // Display an alert if no category is selected
      Alert.alert('Select Category', 'Please choose at least one category.');
      return;
    }

    // Continue with the navigation or any other logic
    if (selectedType === 'Accommodation') {
      router.push('/business/create/accommodationFacilities');
      console.log('Redirect to accommodation facilities');
    } else if (selectedType === 'Attraction') {
      router.push('/business/create/attractionActivities');
      console.log('Redirect to attraction activities');
    } else if (selectedType === 'Restaurant') {
      router.push('/business/create/restaurantFacilities');
      console.log('Redirect to restaurant facilities');
    }
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Establishment Type'} />
      <SafeAreaView>
        <View style={{ marginBottom: 30 }}>
          <Questions question={'What type of place is this?'} />
          <EstablishmentTypeButton
            label="Accommodation"
            onSelect={() => handleTypeSelection('Accommodation')}
            isSelected={selectedType === 'Accommodation'}
          />
          <EstablishmentTypeButton
            label="Attraction"
            onSelect={() => handleTypeSelection('Attraction')}
            isSelected={selectedType === 'Attraction'}
          />
          <EstablishmentTypeButton
            label="Restaurant"
            onSelect={() => handleTypeSelection('Restaurant')}
            isSelected={selectedType === 'Restaurant'}
          />
        </View>

        {selectedType ? (
          <>
            <View style={{ marginBottom: 50 }}>
              <Questions question={`Select Categories`} />
              <CustomButton
                content={'Select Category'}
                height={30}
                width={150}
                buttonColor={'#B8B8B8'}
                buttonBorderColor={'transparent'}
                onClickColor={'#B8B8B8'}
                hasShadow={true}
                textSize={14}
                textColor={'white'}
                onPressTextColor={'white'}
                onPress={toggleModal}
              />
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  margin: 5,
                  marginLeft: 10,
                }}
              >
                {showCategories && selectedCategory && (
                  <Tag
                    key={selectedCategory.id}
                    content={selectedCategory.name}
                    tagColor={'#FF7DB0'}
                    textSize={13}
                    fontColor="white"
                    closeButton={() => setSelectedCategory(null)}
                  />
                )}
              </View>
            </View>

            <RightSlideModal
              isVisible={isModalVisible}
              onClose={handleModalClose}
            >
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 18,
                  color: '#EB4586',
                  fontWeight: 'bold',
                }}
              >
                {` ${selectedType} Categories`}{' '}
              </Text>
              <FlatList
                data={fakeCategories[selectedType || ''] || []}
                numColumns={2} // Display two items per row
                contentContainerStyle={{ paddingVertical: 15 }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      paddingLeft: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleCategoryToggle(item)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
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
                          fontSize: 15,
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <CustomButton
                content={'Done'}
                height={50}
                width={100}
                buttonBorderColor="transparent"
                buttonColor="#EB4586"
                onPress={handleModalClose}
                onClickColor={'#EB4586'}
                textColor="white"
                hasShadow={true}
              />
            </RightSlideModal>
          </>
        ) : (
          <Text style={{ marginTop: 20, fontFamily: 'Poppins', fontSize: 13 }}>
            Please choose an establishment type.
          </Text>
        )}

        <BasicButton title={'Continue'} onPress={handleContinue} />
      </SafeAreaView>
    </View>
  );
};

export default EstablishmentType;
