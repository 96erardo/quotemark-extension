import { useContext } from 'react';
import { UserContext } from '../user-context';
import { FetchUserQuery } from '@shared/graphql-types';

/**
 * Returns the currently authenticated user
 * 
 * @returns The currently authenticated user
 */
export function useUser (): FetchUserQuery['user'] {
  const { user } = useContext(UserContext);

  return user;
}