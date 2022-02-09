import { gql } from '@apollo/client';

export const CREATE_STORY = gql`
  mutation CreateStory ($quote: ID!, $color: String, $typography: Typography) {
    storyCreate (
      quote: {
        connect: {
          id: $quote
        }
      },
      color: $color,
      typography: $typography
    ) {
      id
    }
  }
`;

export const FETCH_MY_STORIES = gql`
  query FetchMyStories ($first: Int, $skip: Int) {
    myStoriesList (first: $first, skip: $skip) {
      count
      items {
        id
        color
        typography
        content
        link
        createdAt
      }
    }
  }
`;

export const FETCH_PUBLIC_STORIES = gql`
  query FetchPublicStories ($first: Int, $skip: Int) {
    storiesList (first: $first, skip: $skip) {
      count
      items {
        id
        color
        typography
        content
        link
        seen
        user {
          id
          firstName
          lastName
          avatar
        }
        createdAt
      }
    }
  }
`

export const MARK_STORY_AS_SEEN = gql`
  mutation MarkStoryAsSeen ($id: ID) {
    markAsSeen (
      story: {
        connect: {
          id: $id
        }
      }
    ) {
      id
    }
  }
`;

export const FETCH_STORY_VIEWS = gql`
  query FetchStoryViews ($id: ID!, $first: Int, $skip: Int) {
    viewsList (id: $id, first: $first, skip: $skip) {
      count
      items {
        id
        firstName
        lastName
        avatar
      }
    }
  }
`;

export const DELETE_STORY = gql`
  mutation DeleteStory ($id: ID!) {
    storyDelete (id: $id) {
      success
      message
    }
  }
`;