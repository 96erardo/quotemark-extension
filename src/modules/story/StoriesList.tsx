import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import { StoryListItem } from './StoryListItem';
import { useStories } from './StoriesContext';

export const StoriesList: React.FC = () => {
  const { items, count, loading, error, next, refresh } = useStories();

  const stories = useMemo(() => items.map((story, index) => (
    <StoryListItem 
      key={story.id}
      story={story}
      index={index}
    />
  )), [items]);

  return (
    <Box 
      display="flex" 
      flexDirection="column"
      height="calc(100% - 46px)"
      maxHeight="calc(100% - 46px)"
      overflow="auto"
    >
      {stories}
    </Box>
  );
}
