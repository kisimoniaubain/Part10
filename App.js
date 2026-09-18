import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import Main from './Main';

const client = new ApolloClient({
  uri: 'http://192.168.1.225:4000',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;