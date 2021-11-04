import { gql } from '@apollo/client';

export const FETCH_QUOTES = gql`
  query FetchQuotes ($filter: QuoteFilter, $first: Int, $skip: Int) {
    quotesList (filter: $filter, first: $first, skip: $skip) {
      __typename
      count
      items {
        id
        name
        content
        link
        createdAt
        __typename
      }
    }
  }
`;