import { useCallback, useEffect, useState } from 'react';
import { FetchQuotes, UpdateQuote } from '@shared/graphql-types';
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
export function useQuotes (authenticated: boolean):HookState {
  const [state, setState] = useState<State>(initialState);
  const [page, setPage] = useState(1);

  const fetch = useCallback(async () => {
    if (!authenticated) {
      return setState(prevState => ({
        ...prevState,
        loading: false,
        error: null,
      }));
    }

    setState(prevState => ({
      ...prevState,
      loading: true,
      error: null
    }));

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
  }, [authenticated, page]);

  const next = useCallback(() => {
    if (state.items.length < state.count) {
      setPage(prevPage => prevPage + 1);
    }
  }, [state]);

  const refresh = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      items: [],
      count: 0,
    }));

    if (page === 1) {
      fetch();
    } else {
      setPage(1);
    }
  }, [fetch, page]);

  const update = useCallback((quote: UpdateQuote['quoteUpdate']) => {
    setState(prevState => ({
      ...prevState,
      items: prevState.items.map((item) => item.id === quote.id ? quote : item)
    }))
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  console.log('items', state.items);

  return {
    ...state,
    page,
    refresh,
    next,
    update,
  }
}

type State = Omit<FetchQuotes['quotesList'], '__typename'> & {
  loading: boolean,
  error: Error | null,
}

type HookState = State & {
  next: () => void,
  refresh: () => void,
  update: (quote: UpdateQuote['quoteUpdate']) => void,
  page: number,
}