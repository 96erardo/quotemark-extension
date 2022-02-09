import React, { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LinkIcon from '@mui/icons-material/Link';
import { palette } from '@shared/config/theme-popup';
import { FetchPublicStories, Typography as TypographyNames } from '@shared/graphql-types';
import { markAsSeen } from './story-actions';
import { useSetStoryView } from './StoryView';
import { formatDistanceToNow } from 'date-fns';

export const Story: React.FC<Props> = ({ story, index, total, loading, onSeen, onNext, onPrev }) => {
  const setStoryView = useSetStoryView();

  const markStoryAsSeen = useCallback(async () => {
    if (!story.seen) {
      onSeen(story.id);
      
      try {
        await markAsSeen(story.id);

      } catch (e) {
        console.log('Somethig failed:', e);
      }
    }
  }, [story, onSeen]);

  useEffect(() => {
    markStoryAsSeen();
  }, [markStoryAsSeen])

  const onBack = useCallback(() => {
    setStoryView(-1);
  }, [setStoryView]);

  const onLink = useCallback(() => {
    if (story) {
      window.open(story.link, '__blank')
    }
  }, [story]);

  if (!story || loading) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={0}
        left={0}
        sx={{
          backgroundColor: palette.grayDark
        }}
      >
        <CircularProgress size={20} />
      </Box>      
    )
  }

  const { user } = story;
  const date = formatDistanceToNow(new Date(story.createdAt), {
    addSuffix: true,
  })
  
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      position="absolute"
      top={0}
      left={0}
      sx={{
        backgroundColor: story.color,
      }}
    >
      <Stack 
        px={1}
        paddingTop={2}
        paddingBottom={1} 
        spacing={1}
        direction="row"
        alignItems="stretch"
      >
        <Box display="flex" alignItems="center">
          <IconButton size="small" onClick={onBack}>
            <ArrowBackIcon fontSize="inherit" sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
        <Avatar
          src={user.avatar}
          alt={user.firstName + ' ' + user.lastName}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h5" style={{ color: '#fff', fontSize: '1rem' }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="caption" style={{ color: 'rgba(255, 255, 255, .5)' }}>
            {date}
          </Typography>
        </Box>
      </Stack>
      <Box
        height="calc(100% - 109px)"
        maxHeight="calc(100% - 109px)"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box 
          height="100%" 
          maxHeight="100%" 
          display="-webkit-box" 
          alignItems="center"
          position="sticky"
          top={0}
        >
          {index > 0 && (
            <IconButton size="small" onClick={onPrev}>
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
        <Box maxHeight="100%" px={1} overflow="auto">
          <Typography
            variant="body1"
            align="center"
            sx={{
              ...styles[story.typography],
              color: '#fff',
              fontSize: '1rem'
            }}
          >
            {story.content}
          </Typography>
        </Box>
        <Box
          height="100%" 
          maxHeight="100%" 
          display="flex" 
          alignItems="center"
          position="sticky"
          top={0}
        >
          {index < total && (
            <IconButton size="small" onClick={onNext}>
              <ArrowForwardIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box
        py={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton 
          size="small" 
          onClick={onLink}
          title={story.link}
        >
          <LinkIcon fontSize="inherit" style={{ color: '#fff' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

const styles: Record<TypographyNames, object>= {
  Arial: {
    fontFamily: TypographyNames.Arial,
  },
  Poppins: {
    fontFamily: TypographyNames.Poppins,
    fontWeight: 700,
  },
  Barlow: {
    fontFamily: TypographyNames.Barlow,
  }
}

type Props = {
  story: FetchPublicStories['storiesList']['items'][0],
  total: number,
  index: number,
  loading: boolean,
  onSeen: (id: string) => void
  onNext: () => void,
  onPrev: () => void,
}