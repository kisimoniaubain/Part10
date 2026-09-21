import { View, Text, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flex: 1,
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

const RepositoryView = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(REPOSITORY, {
    variables: {
      id,
    },
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

  return (
    <View style={styles.container}>
      <RepositoryItem
        item={data.repository}
        showGitHubButton
      />
    </View>
  );
};

export default RepositoryView;