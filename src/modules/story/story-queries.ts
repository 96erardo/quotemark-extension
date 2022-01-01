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
`