import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  topRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  content: {
    flex: 1,
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
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginTop: 2,
  },
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  githubButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return count.toString();
};

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  const openRepository = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topRow}>
        <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl }}
        />

        <View style={styles.content}>
          <Text style={styles.fullName}>{item.fullName}</Text>

          <Text style={styles.description}>
            {item.description}
          </Text>

          <Text style={styles.language}>
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {formatCount(item.forksCount)}
          </Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {formatCount(item.reviewCount)}
          </Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {formatCount(item.ratingAverage)}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {showGitHubButton && (
        <Pressable
          style={styles.githubButton}
          onPress={openRepository}
        >
          <Text style={styles.githubButtonText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;