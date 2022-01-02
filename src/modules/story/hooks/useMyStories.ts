import { useState, useEffect, useCallback } from 'react';
import { fetchMyStories } from '../story-actions';
import { FetchMyStories } from '@shared/graphql-types';
import { ApolloError } from '@apollo/client';

const initialState = {
  items: [],
  count: 0,
  loading: true,
  error: null
}

/**
 * Hook that fetches the stories from the currently authenticated user
 * 
 * @returns The hook's state
 */
export function useMyStories (): HookState {
  const [state, setState] = useState<State>(initialState);
  const [page, setPage] = useState(1);

  const fetch = useCallback(async () => {
    setState(prevState => ({...prevState, loading: true }));

    const [data, err] = await fetchMyStories(page);

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
      }))
    }
  }, [page]);

  const next = useCallback(() => {
    if (state.items.length < state.count) {
      setPage(prevPage => prevPage + 1);
    }
  }, [state]);

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

  return {
    ...state,
    next,
    refresh,
  }
}

type State = {
  items: FetchMyStories['myStoriesList']['items'],
  count: number,
  loading: boolean,
  error: ApolloError | null
}

type HookState = State & {
  next: () => void,
  refresh: () => void
}