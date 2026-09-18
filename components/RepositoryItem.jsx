import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 10,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: '#ffffff',
    padding: 5,
    borderRadius: 4,
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#666666',
    fontSize: 12,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{item.fullName}</Text>

      <Text style={styles.description}>
        {item.description}
      </Text>

      <Text style={styles.language}>
        {item.language}
      </Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.stargazersCount}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.forksCount}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;