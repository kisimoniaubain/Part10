import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  review: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 1,
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#666666',
  },
});

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  if (error) {
    console.log(
      'MY REVIEWS ERROR:',
      JSON.stringify(error, null, 2),
    );

    return (
      <View style={styles.container}>
        <Text>Error loading reviews.</Text>
      </View>
    );
  }

  console.log(
    'MY REVIEWS DATA:',
    JSON.stringify(data, null, 2),
  );

  const reviews = data?.me?.reviews?.edges?.map(
    (edge) => edge.node,
  ) || [];

  const renderReview = ({ item }) => (
    <View style={styles.review}>
      <Text style={styles.repositoryName}>
        {item.repository.fullName}
      </Text>

      <Text style={styles.rating}>
        Rating: {item.rating}/100
      </Text>

      <Text style={styles.text}>
        {item.text}
      </Text>

      <Text style={styles.date}>
        {item.createdAt}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderReview}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;