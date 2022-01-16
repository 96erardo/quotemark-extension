import React, { useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { StoryListItem } from './StoryListItem';
import { useStories } from './StoriesContext';

export const StoriesList: React.FC = () => {
  const { items, count, loading, error, next } = useStories();
  let content = null;
  let justify = 'flex-start';

  const onLoad = useCallback(() => {
    next();
  }, [next]);

  const stories = useMemo(() => items.map((story, index) => (
    <StoryListItem 
      key={story.id}
      story={story}
      index={index}
    />
  )), [items]);

  content = stories;

  if (items.length === 0 && loading) {
    justify = 'center';

    content = (
      <CircularProgress size={20} />
    );
  }

  if (items.length > 0 && loading) {
    content =(
      <>
        {stories}
        <Box py={1} width="100%" display="flex" justifyContent="center">
          <CircularProgress size={20} />
        </Box>
      </>
    )
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column"
      height="calc(100% - 46px)"
      maxHeight="calc(100% - 46px)"
      overflow="auto"
      alignItems="center"
      justifyContent={justify}
    >
      {content}
      {(!loading && items.length < count) && (
        <Box
          py={1} 
          display="flex" 
          justifyContent="center"
        >
          <Link
            onClick={onLoad}
            underline="none"
            sx={{
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {chrome.i18n.getMessage('load_more')}
          </Link>
        </Box>
      )}
    </Box>
  );
}
