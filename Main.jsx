import { View, StyleSheet } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import RepositoryView from './components/RepositoryView';
import SignIn from './components/SignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <AppBar />

        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route
            path="/repository/:id"
            element={<RepositoryView />}
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </View>
    </NativeRouter>
  );
};

export default Main;