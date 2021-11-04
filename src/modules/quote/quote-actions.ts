import { client } from '@shared/config/apollo';
import { FETCH_QUOTES } from './quote-queries';
import { ApolloError } from '@apollo/client';
import { Result } from '@shared/types';
import { 
  FetchQuotes, 
  FetchQuotesVariables 
} from '@shared/graphql-types';

/**
 * Fetches the list of quotes
 * 
 * @param page - The page to fetch from
 * 
 * @returns The list of quotes
 */
export async function fetchQuotes (page: number = 1): Result<FetchQuotes['quotesList'], ApolloError> {
  const first = 20;
  const skip = first * (page - 1);
  let response = null;

  try {
    response = await client.query<FetchQuotes, FetchQuotesVariables>({
      query: FETCH_QUOTES,
      fetchPolicy: 'network-only',
      variables: {
        first,
        skip,
      }
    })
    
  } catch (e) {

    return [null, e as ApolloError]
  }

  const { data: { quotesList } } = response;

  return [quotesList, null];
}