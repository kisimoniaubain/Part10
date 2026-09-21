import { View, StyleSheet } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import RepositoryView from './components/RepositoryView';
import SignIn from './components/SignIn';
import CreateReview from './components/CreateReview';
import SignUp from './components/SignUp';
import MyReviews from './components/MyReviews';

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

          <Route
            path="/create-review"
            element={<CreateReview />}
          />

          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/my-reviews"
            element={<MyReviews />}
          />
        </Routes>
      </View>
    </NativeRouter>
  );
};

export default Main;