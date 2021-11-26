import { client } from '@shared/config/apollo';
import { ApolloError } from '@apollo/client';
import { Result } from '@shared/types';
import { 
  FETCH_QUOTES,
  DELETE_QUOTE,
  UPDATE_QUOTE
} from './quote-queries';
import { 
  FetchQuotes, 
  FetchQuotesVariables,
  DeleteQuote,
  DeleteQuoteVariables,
  UpdateQuote,
  UpdateQuoteVariables
} from '@shared/graphql-types';

/**
 * Fetches the list of quotes
 * 
 * @param page - The page to fetch from
 * 
 * @returns The list of quotes
 */
export async function fetchQuotes (
  page: number = 1,
  search?: string,
): Result<FetchQuotes['quotesList'], ApolloError> {
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
        ...(search ? (
          {
            filter: {
              OR: [
                { name: { contains: search } },
                { content: { contains: search } },
                { link: { contains: search } },
              ]
            }
          }
        ) : ({}))
      }
    })
    
  } catch (e) {

    return [null, e as ApolloError]
  }

  const { data: { quotesList } } = response;

  return [quotesList, null];
}

export async function updateQuoteName (id: string, name: string): Result<UpdateQuote['quoteUpdate']> {
  let response = null;

  try {
    response = await client.mutate<UpdateQuote, UpdateQuoteVariables>({
      mutation: UPDATE_QUOTE,
      variables: {
        id,
        name
      }
    })
    
  } catch (e) {

    return [null, e as ApolloError];
  }

  if (!response.data?.quoteUpdate) {
    return [null, new Error("Something hapened and we couldn't update the quote")]
  }

  const { data: { quoteUpdate } } = response;

  return [quoteUpdate, null];
}

/**
 * Deletes the specified quote
 * 
 * @param id - The id of the quote to delete
 * 
 * @returns If the operation was successful or not
 */
export async function deleteQuote (id: string): Result<boolean> {
  let response = null;

  try {
    response = await client.mutate<DeleteQuote, DeleteQuoteVariables>({
      mutation: DELETE_QUOTE,
      variables: {
        id
      }
    })

  } catch (e) {

    return [null, e as ApolloError];
  }
  
  const { data } = response;

  if (!data?.quoteDelete || !data.quoteDelete.success) {
    const err = data?.quoteDelete.message || 'Something hapened';

    return [null, new Error(err)]
  }

  return [true, null];
}