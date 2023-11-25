import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';

import Questions from '~/components/BusinessOperator/Question';
import CustomButtom from '~/components/Button/CustomButtom';

interface Category {
  id: string;
  name: string;
}

interface GetCategoryListQueryResult {
  categories: Category[];
}

const GetCategoryListQuery = gql`
  query GetAllCategories {
    categories {
      id
      name
    }
  }
`;

const EstablishmentType = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data } = useQuery<GetCategoryListQueryResult>(GetCategoryListQuery);

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
    <View style={{ alignItems: 'center' }}>
      <SafeAreaView>
        <Questions question={'What type of place is this?'} />
        <CustomButtom
          content={'Accommodation'}
          height={50}
          width={300}
          onClickColor={'#EB4586'}
        />
        <CustomButtom
          content={'Attraction'}
          height={50}
          width={300}
          onClickColor={'#EB4586'}
        />
        <CustomButtom
          content={'Restaurant'}
          height={50}
          width={300}
          onClickColor={'#EB4586'}
        />

        <Questions question={'Select Category'} />
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View
            style={{
              height: 300,
              width: 300,
              borderWidth: 1,
              borderColor: '#5A5A5A',
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
          >
            {selectedCategories.map((category) => (
              <View
                key={category.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 5,
                }}
              >
                <Text>{category.name}</Text>
              </View>
            ))}
            <Text>Press to select category</Text>
          </View>
        </TouchableWithoutFeedback>

        <Modal visible={isModalVisible} animationType="slide">
          <View>
            <FlatList
              data={data?.categories || []}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
                  }}
                >
                  <Switch
                    value={selectedCategories.some((cat) => cat.id === item.id)}
                    onValueChange={() => handleCategoryToggle(item)}
                  />
                  <Text>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity onPress={handleModalClose}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default EstablishmentType;
