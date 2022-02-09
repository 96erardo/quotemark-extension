import { client } from '@shared/config/apollo';
import { ApolloError } from '@apollo/client';
import { Result } from '@shared/types';
import {
  CREATE_STORY,
  FETCH_MY_STORIES,
  FETCH_PUBLIC_STORIES,
  MARK_STORY_AS_SEEN,
  FETCH_STORY_VIEWS,
  DELETE_STORY,
} from './story-queries';
import {
  CreateStory,
  CreateStoryVariables,
  FetchMyStories,
  FetchMyStoriesVariables,
  FetchPublicStories,
  FetchPublicStoriesVariables,
  MarkStoryAsSeen,
  MarkStoryAsSeenVariables,
  FetchStoryViews,
  FetchStoryViewsVariables,
  DeleteStory,
  DeleteStoryVariables,
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

/**
 * Fetches the list of available stories from all users
 * 
 * @param page - The number of page to fetch 
 * 
 * @returns The list of stories
 */
export async function fetchPublicStories (
  page: number = 1,
): Result<FetchPublicStories['storiesList'], ApolloError> {
  const first = 8;
  const skip = first * (page - 1);
  let response = null;

  try {
    response = await client.query<FetchPublicStories, FetchPublicStoriesVariables>({
      query: FETCH_PUBLIC_STORIES,
      fetchPolicy: 'network-only',
      variables: {
        first,
        skip
      }
    });

  } catch (e) {

    return [null, e as ApolloError];
  }

  const { data: { storiesList } } = response;

  return [storiesList, null];
}

/**
 * Marks the specified story as seen
 * 
 * @param id - The id of the story
 * 
 * @returns The updated story
 */
export async function markAsSeen (id: string): Result<MarkStoryAsSeen['markAsSeen'], ApolloError> {
  let response = null;

  try {
    response = await client.mutate<MarkStoryAsSeen, MarkStoryAsSeenVariables>({
      mutation: MARK_STORY_AS_SEEN,
      variables: {
        id
      }
    });

  } catch (e) {
    return [null, e as ApolloError];
  }

  const { data } = response;

  if (data?.markAsSeen) {

    return [data.markAsSeen, null];
  }

  return [null, new ApolloError({
    clientErrors: [
      new Error('Something happened')
    ]
  })]
}

/**
 * 
 * @param id - The id of the story to fetch views from
 * @param page - The page number of results
 *  
 * @returns The list of users that have already seen the story
 */
export async function fetchStoryViews (
  id: string, 
  page: number
): Result<FetchStoryViews['viewsList'], ApolloError> {
  let response = null;
  const first = 12;
  const skip = first * (page - 1);

  try {
    response = await client.query<FetchStoryViews, FetchStoryViewsVariables>({
      query: FETCH_STORY_VIEWS,
      fetchPolicy: 'network-only',
      variables: {
        id,
        first,
        skip,
      }
    })
    
  } catch (e) {
    return [null, e as ApolloError];
  }

  const { data: { viewsList } } = response;

  return [viewsList, null];
}

/**
 * Deletes the specified story
 * 
 * @param id - The story id
 * 
 * @returns if the request succeeded or not
 */
export async function deleteStory (id: string): Result<boolean, ApolloError> {
  let response = null;

  try {
    response = await client.mutate<DeleteStory, DeleteStoryVariables>({
      mutation: DELETE_STORY,
      variables: {
        id
      }
    })

  } catch (e) {

    return [null, e as ApolloError];
  }
  
  const { data } = response;

  if (!data?.storyDelete || !data.storyDelete.success) {
    const err = data?.storyDelete.message || 'Something hapened';

    return [null, new ApolloError({
      clientErrors: [
        new Error(err)
      ]
    })]
  }

  return [true, null];

}