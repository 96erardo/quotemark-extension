import { client } from '@shared/config/apollo';
import { ApolloError } from '@apollo/client';
import { Result } from '@shared/types';
import {
  CREATE_STORY,
  FETCH_MY_STORIES,
} from './story-queries';
import {
  CreateStory,
  CreateStoryVariables,
  FetchMyStories,
  FetchMyStoriesVariables,
  Typography,
} from '@shared/graphql-types';


/**
 * Creates a new story from the specified quote
 * 
 * @param id - The id of the quote
 * @param color - The color to assign to the story
 * @param typography - The typography to assign to the story
 * 
 * @returns The created story
 */
export async function createStory (
  id: string, 
  color: string, 
  typography: Typography,
): Result<CreateStory['storyCreate'], ApolloError> {
  let response = null;

  try {
    response = await client.mutate<CreateStory, CreateStoryVariables>({
      mutation: CREATE_STORY,
      variables: {
        quote: id,
        color,
        typography,
      }
    })
    
  } catch (e) {

    return [null, e as ApolloError];
  }

  const { data } = response;

  if (data?.storyCreate) {

    return [data.storyCreate, null];
  }

  return [null, new ApolloError({
    clientErrors: [
      new Error('Something happened')
    ]
  })]
}

/**
 * Fetches the stories of the currently authenticated user
 * 
 * @param page - The page to fetch from
 * 
 * @returns The list of stories
 */
export async function fetchMyStories (
  page: number = 1
): Result<FetchMyStories['myStoriesList'], ApolloError> {
  const first = 20;
  const skip = first * (page - 1);
  let response = null;

  try {
    response = await client.query<FetchMyStories, FetchMyStoriesVariables>({
      query: FETCH_MY_STORIES,
      fetchPolicy: 'network-only',
      variables: {
        first,
        skip
      }
    })

  } catch (e) {

    return [null, e as ApolloError];
  }

  const { data: { myStoriesList } } = response;

  return [myStoriesList, null];
}