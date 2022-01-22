import React, { useCallback, useEffect, useState, useContext } from 'react';
import { fetchPublicStories } from './story-actions';
import { FetchPublicStories } from '@shared/graphql-types';
import { ApolloError } from '@apollo/client';

const initialState = {
  items: [],
  count: 0,
  loading: true,
  error: null
}

const StoryListContext = React.createContext<State>({
  ...initialState,
  next: () => {},
  refresh: () => {},
});

export const Stories: React.FC = ({ children }) => {
  const [state, setState] = useState<Omit<State, 'next' | 'refresh'>>(initialState);
  const [page, setPage] = useState(1);

  const fetch = useCallback(async () => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }))

    const [data, err] = await fetchPublicStories(page);

    if (err) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: err
      }))
    }

    if (data) {
      setState(prevState => ({
        ...prevState,
        count: data.count,
        items: page === 1 ? data.items : [...prevState.items, ...data.items],
        loading: false,
        error: null
      }));
    }
  }, [page]);

  const next = useCallback(() => {
    if (state.count > state.items.length) {
      setPage(prevPage => prevPage + 1);
    }
  }, [state.count, state.items]);

  const refresh = useCallback(() => {
    if (page === 1) {
      fetch();

    } else {
      setPage(1);
    }
  }, [page, fetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  
  return (
    <StoryListContext.Provider value={{
      items: state.items,
      count: state.count,
      loading: state.loading,
      error: state.error,
      next,
      refresh
    }}>
      {children}
    </StoryListContext.Provider>
  );
}

export function useStories (): State {
  return useContext(StoryListContext);
}

export type State = {
  items: FetchPublicStories['storiesList']['items'],
  count: number,
  loading: boolean,
  error: ApolloError | null,
  next: () => void,
  refresh: () => void
}