import {
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flex: 1,
  },
  separator: {
    height: 10,
  },
  loading: {
    padding: 15,
    fontSize: 16,
  },
  error: {
    padding: 15,
    color: '#d73a4a',
    fontSize: 16,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const RepositoryView = () => {
  const { id } = useParams();

const { data, loading, error } = useQuery(REPOSITORY, {
  variables: {
    id,
  },
  fetchPolicy: 'cache-and-network',
});

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Something went wrong.
        </Text>
      </View>
    );
  }

  if (!data?.repository) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Repository not found.
        </Text>
      </View>
    );
  }

  const repository = data.repository;

  const reviews = repository.reviews.edges.map(
    (edge) => edge.node,
  );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
      keyExtractor={({ id: reviewId }) => reviewId}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem
          item={repository}
          showGitHubButton
        />
      )}
    />
  );
};

export default RepositoryView;