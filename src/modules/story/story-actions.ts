import { client } from '@shared/config/apollo';
import { ApolloError } from '@apollo/client';
import { Result } from '@shared/types';
import {
  CREATE_STORY
} from './story-queries';
import {
  CreateStory,
  CreateStoryVariables,
  Typography,
} from '@shared/graphql-types';


/**
 * Creates a new story from the specified quote
 * 
 * @param id 
 * @param color 
 * @param typography 
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