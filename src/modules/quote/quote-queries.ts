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

export const DELETE_QUOTE = gql`
  mutation DeleteQuote ($id: ID!) {
    quoteDelete (id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_QUOTE = gql`
  mutation UpdateQuote ($id: ID!, $name: String!) {
    quoteUpdate (id: $id, name: $name) {
      id
      name
      content
      link
      createdAt
      __typename
    }
  }
`;