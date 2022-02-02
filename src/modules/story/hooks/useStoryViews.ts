import { useCallback, useState, useEffect } from 'react';
import { FetchStoryViews } from '@shared/graphql-types';
import { fetchStoryViews } from '../story-actions';
import { ApolloError } from '@apollo/client';

const initialState = {
  items: [],
  count: 0,
  loading: false,
  error: null
}

export function useStoryViews (id: string | undefined) {
  const [state, setState] = useState<Omit<State, 'next' | 'refresh'>>(initialState);
  const [page, setPage] = useState(1);

  const fetch = useCallback(async () => {
    if (id) {
      setState(prevState => ({ ...prevState, loading: true }));

      const [data, err] = await fetchStoryViews(id, page);

      if (err) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: err
        }))
      }

      if (data) {
        setState(prevState => ({
          ...prevState,
          items: page === 1 ? data.items : [...prevState.items, ...data.items],
          count: data.count,
          loading: false,
          error: null
        }))
      }
    } else {
      setState(initialState)
    }
  }, [id, page]);

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
  }, [fetch])

  return {
    ...state,
    next,
    refresh
  }
}

type State = {
  items: Array<FetchStoryViews['viewsList']['items'][0]>,
  count: number,
  loading: boolean,
  error: ApolloError | null,
  next: () => void,
  refresh: () => void,
}