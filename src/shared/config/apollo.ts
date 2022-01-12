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

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors?.length) {
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
    max: 3
  }
})

export const client = new ApolloClient({
  link: from([retryLink, errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})