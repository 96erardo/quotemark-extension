import { 
  ApolloClient, 
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})