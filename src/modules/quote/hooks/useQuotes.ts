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
  const [list, setList] = useState<ListState>({ page: 1, filter: '' });

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

    const [quotesList, err] = await fetchQuotes(list.page, list.filter);

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
        items: list.page === 1 ? quotesList.items : [
          ...prevState.items,
          ...quotesList.items,
        ],
        loading: false,
        error: null,
      }))
    }
  }, [authenticated, list]);

  const next = useCallback(() => {
    if (state.items.length < state.count) {
      setList(prevState => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  }, [state]);

  const refresh = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      items: [],
      count: 0,
    }));

    if (list.page === 1) {
      fetch();
    } else {
      setList(prevState => ({
        ...prevState,
        page: 1,
      }));
    }
  }, [fetch, list.page]);

  const update = useCallback((quote: UpdateQuote['quoteUpdate']) => {
    setState(prevState => ({
      ...prevState,
      items: prevState.items.map((item) => item.id === quote.id ? quote : item)
    }))
  }, []);

  const filter = useCallback((value: string) => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      items: [],
      count: 0,
    }));

    setList({ page: 1, filter: value });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    ...state,
    page: list.page,
    refresh,
    next,
    update,
    filter,
  }
}

type State = Omit<FetchQuotes['quotesList'], '__typename'> & {
  loading: boolean,
  error: Error | null,
}

type ListState = {
  page: number,
  filter: string,
}

type HookState = State & {
  next: () => void,
  refresh: () => void,
  update: (quote: UpdateQuote['quoteUpdate']) => void,
  filter: (value: string) => void,
  page: number,
}