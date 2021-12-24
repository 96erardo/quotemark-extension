import { FETCH_USER } from './user-queries';
import { client } from '@shared/config/apollo';
import { Result } from '@shared/types';
import { FetchUser } from '@shared/graphql-types';
import { ApolloError, ApolloQueryResult } from '@apollo/client';

/**
 * Fetches the currently authenticated user, if any
 * 
 * @param token - The access token of the current user
 * 
 * @returns The use object
 */
export async function fetchUser (): Result<FetchUser['user'], ApolloError> {
  let response: ApolloQueryResult<FetchUser>;

  try {
    response = await client.query<FetchUser>({
      query: FETCH_USER,
      fetchPolicy: 'network-only',
    });

  } catch (e) {
    return [null, e as ApolloError];
  }

  const { user } = response.data;

  return [user, null];
}