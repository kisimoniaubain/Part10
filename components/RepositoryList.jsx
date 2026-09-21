import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
  });

  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  const handleOrderChange = (value) => {
    if (value === 'latest') {
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    }

    if (value === 'highest') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    }

    if (value === 'lowest') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    }
  };

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.label}>Sort repositories</Text>

          <Picker
            selectedValue={
              orderBy === 'CREATED_AT'
                ? 'latest'
                : orderDirection === 'DESC'
                  ? 'highest'
                  : 'lowest'
            }
            onValueChange={handleOrderChange}
          >
            <Picker.Item
              label="Latest repositories"
              value="latest"
            />
            <Picker.Item
              label="Highest rated repositories"
              value="highest"
            />
            <Picker.Item
              label="Lowest rated repositories"
              value="lowest"
            />
          </Picker>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;