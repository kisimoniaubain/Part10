import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'network-only',
  });

  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tabs}>
          <Link to="/" style={styles.tab}>
            <Text style={styles.text}>Repositories</Text>
          </Link>

          {data?.me ? (
            <Link
              to="/"
              style={styles.tab}
              onPress={handleSignOut}
            >
              <Text style={styles.text}>Sign out</Text>
            </Link>
          ) : (
            <Link to="/signin" style={styles.tab}>
              <Text style={styles.text}>Sign in</Text>
            </Link>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;