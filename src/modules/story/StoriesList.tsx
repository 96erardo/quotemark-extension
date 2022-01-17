import React, { useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { StoriesErrorPlaceholder } from './StoriesErrorPlaceholder';
import { StoryListItem } from './StoryListItem';
import { useStories } from './StoriesContext';
import { ErrorCodes } from '@shared/types';

export const StoriesList: React.FC = () => {
  const { items, count, loading, error, next, refresh } = useStories();
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

  if (error && !loading) {
    justify = 'center';

    if (error.graphQLErrors.length) {
      const [{ extensions }] = error.graphQLErrors;
      const { code } = extensions;

      content = (
        <StoriesErrorPlaceholder 
          code={code as ErrorCodes}
          onRefresh={refresh}
        />
      );
    } else if (error.networkError) {
      content = (
        <StoriesErrorPlaceholder 
          code={ErrorCodes.ServerException}
          onRefresh={refresh}
        />
      )
    }
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
