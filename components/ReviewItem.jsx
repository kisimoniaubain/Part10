import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rating: {
    color: '#0366d6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(
    new Date(review.createdAt),
    'dd MMM yyyy',
  );

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.username}>
          {review.user.username}
        </Text>

        <Text style={styles.date}>{formattedDate}</Text>

        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;