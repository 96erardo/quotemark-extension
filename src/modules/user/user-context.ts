import React, { SetStateAction } from 'react';
import { FetchUser } from '@shared/graphql-types';
import { Dispatch } from 'react';

type State = {
  user: FetchUser['user'] | null,
  setUser: Dispatch<SetStateAction<FetchUser['user'] | null>>
}

export const UserContext = React.createContext<State>({ user: null, setUser: () => {} });