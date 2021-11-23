import { gql } from '@apollo/client';

export const FETCH_USER = gql`
  query FetchUser {
    user {
      id
      firstName
      lastName
      email
      avatar
      role
      status
      createdAt
      updatedAt
      deletedAt
      __typename
    }
  }
`