import { 
  ApolloClient, 
  InMemoryCache,
  createHttpLink,
  from
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from "@apollo/client/link/error";
import { ErrorCodes } from '../types';

const httpLink = createHttpLink({
  uri: process.env.API_ENDPOINT
});

const authLink = setContext((_, prevContext) => {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive: false }, (token) => {
      if (chrome.runtime.lastError && !token) {
        return resolve({
          headers: {
            ...prevContext.headers,
            Authorization: `Bearer ${token}`
          }
        })
      }

      return resolve({
        headers: {
          ...prevContext.headers,
          Authorization: `Bearer ${token}`
        }
      })
    })
  })
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  console.log('error')
  if (graphQLErrors) {
    const [error] = graphQLErrors;
    const context = operation.getContext();
    
    if (
      error.extensions?.code === ErrorCodes.ServerException &&
      context.retry !== true
    ) {
      operation.setContext({ retry: true });

      return forward(operation);
    }
  }
})

const retryLink = new RetryLink({
  attempts: {
    max: 2,
    retryIf: (response: RetryResponse, operation) => {
      console.log('response', JSON.stringify(response));
      console.log('operation', JSON.stringify(operation));

      if (response?.result?.errors) {
        return response.result.errors.some(error => {
          return error.extensions.code === ErrorCodes.ServerException;
        })
      }

      return false;
    }
  }
})

type RetryResponse = {
  name: string,
  statusCode: 500,
  result?: {
    errors?: Array<{
      message: string,
      extensions: {
        code: number
      }
    }>
  }
}

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})