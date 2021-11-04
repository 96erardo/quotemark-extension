import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { FetchQuotes, Quote } from '@shared/graphql-types';
import { fetchQuotes } from '../quote-actions';

const initialState = {
  items: [],
  count: 0,
  loading: true,
  error: null,
}

/**
 * Hook that returns the list of quotes
 * of the currently authenticated user
 * 
 * @returns The hook state
 */
export function useQuotes ():HookState {
  const [state, setState] = useState<State>(initialState);
  const [page, setPage] = useState(1);

  const fetch = useCallback(async () => {
    const [quotesList, err] = await fetchQuotes(page);

    if (err) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: err
      }))
    }

    if (quotesList) {
      setState(prevState => ({
        ...prevState,
        count: quotesList.count,
        items: page === 1 ? quotesList.items : [
          ...prevState.items,
          ...quotesList.items,
        ],
        loading: false,
        error: null,
      }))
    }
  }, [page]);

  const next = useCallback(() => {
    if (state.items.length < state.count) {
      setPage(prevPage => prevPage + 1);
    }
  }, [state]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    ...state,
    next,
    page,
  }
}

type State = Omit<FetchQuotes['quotesList'], '__typename'> & {
  loading: boolean,
  error: Error | null,
}

type HookState = State & {
  next: () => void,
  page: number,
}