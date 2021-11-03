import { FETCH_USER } from './user-queries';
import { client } from '../../shared/config/apollo';
import { Result } from '../../shared/types';
import { FetchUserQuery } from '../../shared/graphql-types';
import { ApolloError, ApolloQueryResult } from '@apollo/client';

/**
 * Fetches the currently authenticated user, if any
 * 
 * @param token - The access token of the current user
 * 
 * @returns The use object
 */
export async function fetchUser (): Result<FetchUserQuery['user'], ApolloError> {
  let response: ApolloQueryResult<FetchUserQuery>;

  try {
    response = await client.query<FetchUserQuery>({
      query: FETCH_USER,
      fetchPolicy: 'network-only',
    });

  } catch (e) {
    return [null, e as ApolloError];
  }

  const { user } = response.data;

  return [user, null];
}