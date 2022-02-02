import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { StoryCard } from './StoryCard';
import { useMyStories } from './hooks/useMyStories';
import { StorySeenDialog } from './StorySeenDialog';

export const MyStoriesView: React.FC = () => {
  const { items, count, loading, next } = useMyStories();

  const stories = useMemo(() => {
    return items.reduce<Array<Array<JSX.Element>>>((acum, item, i) => {
      const col = i % 4;
      
      acum[col].push(
        <StoryCard key={item.id} story={item} />
      )

      return acum;
    }, [[], [], [], []]);
  }, [items]);

  const more = (!loading && items.length < count) ? (
    <Box 
      py={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Link
        onClick={next}
        target="_blank"
        underline="none"
        sx={{ 
          cursor: 'pointer',
          fontSize: '0.75rem',
        }}
      >
        {chrome.i18n.getMessage('load_more')}
      </Link>
    </Box>
  ) : null;

  const load = loading ? (
    <Box 
      py={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress 
        color="primary"
        size={20}
        thickness={6}
      />
    </Box>
  ) : null;

  return (
    <Box
      padding={2}
      width="100%"
      height="100%"
      overflow="auto"
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {stories[0]}
        </Grid>
        <Grid item xs={3}>
          {stories[1]}
        </Grid>
        <Grid item xs={3}>
          {stories[2]}
        </Grid>
        <Grid item xs={3}>
          {stories[3]}
        </Grid>
      </Grid>
      {load}
      {more}
      <StorySeenDialog />
    </Box>
  );
}