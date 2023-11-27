import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';

import Questions from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CustomButton from '~/components/Button/CustomButtom';
import Tag from '~/components/Container/Tag';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import { GetAllCategoriesDocument } from '~/graphql/generated';
import CreateBusinessHeader from '.';

interface Category {
  id: string;
  name: string;
}

interface GetCategoryListQueryResult {
  categories: Category[];
}

const EstablishmentType = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data } = useQuery<GetCategoryListQueryResult>(
    GetAllCategoriesDocument,
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCategoryToggle = (category: Category) => {
    const isSelected = selectedCategories.some((cat) => cat.id === category.id);

    if (isSelected) {
      const updatedCategories = selectedCategories.filter(
        (cat) => cat.id !== category.id,
      );
      setSelectedCategories(updatedCategories);
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader />
      <SafeAreaView>
        <Questions question={'What type of place is this?'} />
        <CustomButton
          content={'Accommodation'}
          height={50}
          width={300}
          buttonColor={'white'}
          buttonBorderColor={'transparent'}
          onClickColor={'#EB4586'}
          hasShadow={true}
          textSize={15}
          textColor="black"
          onPressTextColor="white"
          onPress={() => {
            console.log('Not yet implemented');
          }}
        />
        <CustomButton
          content={'Attraction'}
          height={50}
          width={300}
          buttonColor={'white'}
          buttonBorderColor={'transparent'}
          onClickColor={'#EB4586'}
          hasShadow={true}
          textSize={15}
          textColor="black"
          onPressTextColor="white"
          onPress={() => {
            console.log('Not yet implemented');
          }}
        />
        <CustomButton
          content={'Restaurant'}
          height={50}
          width={300}
          buttonColor={'white'}
          buttonBorderColor={'transparent'}
          onClickColor={'#EB4586'}
          hasShadow={true}
          textSize={15}
          textColor="black"
          onPressTextColor="white"
          onPress={() => {
            console.log('Not yet implemented');
          }}
        />
        <Questions question={'Select Category'} />

        <CustomButton
          content={'Select Category'}
          height={30}
          width={160}
          buttonColor={'#FFBD59'}
          buttonBorderColor={'transparent'}
          onClickColor={'#FFBD59'}
          hasShadow={true}
          textSize={15}
          textColor={'white'}
          onPressTextColor={'white'}
          onPress={toggleModal}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: 5,
          }}
        >
          {selectedCategories.map((category) => (
            <Tag
              key={category.id}
              content={category.name}
              tagColor={'#EB4586'}
              textSize={13}
              fontColor="white"
              closeButton={() => {
                const updatedCategories = selectedCategories.filter(
                  (cat) => cat.id !== category.id,
                );
                setSelectedCategories(updatedCategories);
              }}
            />
          ))}
        </View>
        <BottomHalfModal isVisible={isModalVisible} onClose={handleModalClose}>
          <FlatList
            data={data?.categories || []}
            numColumns={3}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 100,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 3,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleCategoryToggle(item)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: selectedCategories.some(
                      (cat) => cat.id === item.id,
                    )
                      ? '#EB4586' // Selected color
                      : '#5A5A5A', // Unselected color
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {selectedCategories.some((cat) => cat.id === item.id) && (
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: '#EB4586',
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    width: 70,
                    fontSize: 10,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </BottomHalfModal>
        <BasicButton
          title={'Next'}
          onPress={() => {
            router.push('/business/create/basicInformation');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default EstablishmentType;
