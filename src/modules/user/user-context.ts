import React, { SetStateAction } from 'react';
import { FetchUserQuery } from '@shared/graphql-types';
import { Dispatch } from 'react';

type State = {
  user: FetchUserQuery['user'] | null,
  setUser: Dispatch<SetStateAction<FetchUserQuery['user'] | null>>
}

export const UserContext = React.createContext<State>({ user: null, setUser: () => {} });