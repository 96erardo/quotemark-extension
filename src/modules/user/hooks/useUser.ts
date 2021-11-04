import { useContext } from 'react';
import { UserContext } from '../user-context';
import { FetchUser } from '@shared/graphql-types';

/**
 * Returns the currently authenticated user
 * 
 * @returns The currently authenticated user
 */
export function useUser (): FetchUser['user'] {
  const { user } = useContext(UserContext);

  return user;
}