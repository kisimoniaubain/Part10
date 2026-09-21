import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {
  useQuery,
  useMutation,
} from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

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
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a49',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const MyReviews = () => {
  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
    refetch,
  } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'network-only',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({
                variables: {
                  id: reviewId,
                },
              });

              await refetch();
            } catch (deleteError) {
              console.log(
                'DELETE REVIEW ERROR:',
                JSON.stringify(deleteError, null, 2),
              );

              Alert.alert(
                'Error',
                'Failed to delete the review.',
              );
            }
          },
        },
      ],
    );
  };

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

  const reviews =
    data?.me?.reviews?.edges?.map(
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

      <View style={styles.actions}>
        <Pressable
          style={[
            styles.button,
            styles.viewButton,
          ]}
          onPress={() =>
            navigate(`/repository/${item.repository.id}`)
          }
        >
          <Text style={styles.buttonText}>
            View repository
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.deleteButton,
          ]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>
            Delete review
          </Text>
        </Pressable>
      </View>
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
