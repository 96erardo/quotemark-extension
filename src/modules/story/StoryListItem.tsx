import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatDistanceToNow } from 'date-fns';
import { StoryAvatar } from './StoryAvatar';
import { FetchPublicStories } from '@shared/graphql-types';
import { useSetStoryView } from './StoryView';

export const StoryListItem: React.FC<Props> = ({ story, index }) => {
  const setStoryView = useSetStoryView();

  const date = formatDistanceToNow(new Date(story.createdAt), {
    addSuffix: true,
  })
  
  return (
    <Stack
      px={2}
      py={1}
      spacing={1}
      width="100%"
      direction="row"
      alignItems="stretch"
      onClick={() => setStoryView(index)}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: story.seen ? 'rgba(190, 190, 190, .35)' : 'rgb(46, 43, 80)',
        }
      }}
    >
      <StoryAvatar 
        user={story.user} 
        seen={story.seen} 
      />
      <Box 
        display="flex"
        flexDirection="column" 
        alignItems="flex-start" 
        justifyContent="center"
      >
        <Typography variant="h6" sx={{ color: '#fff' }}>
          {story.user.firstName} {story.user.lastName}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, .5)' }}>
          {date}
        </Typography>
      </Box>
    </Stack>
  );
}

type Props = {
  story: FetchPublicStories['storiesList']['items'][0],
  index: number,
}