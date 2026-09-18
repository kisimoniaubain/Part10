import { useQuery } from '@apollo/client';
import { REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return {
    repositories,
    loading,
    error,
  };
};

export default useRepositories;