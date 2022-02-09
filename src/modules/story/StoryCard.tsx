import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FetchMyStories, Typography as TypographyNames } from '@shared/graphql-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useDialogOpener, useDialogCloser } from 'react-dialog-handler';
import { deleteStory } from './story-actions';
import { useSnackbar } from 'notistack';
import { 
  modalId as decisionModalId,
  Params as DecisionParams
} from '@shared/components/DecisionDialog';
import { modalId, Params } from './StorySeenDialog';
import {
  TrashIcon,
  EyeIcon,
  LinkIcon
} from '@shared/components/icons';
import { useCallback } from 'react';

export const StoryCard: React.FC<Props> = ({ story, onRefresh }) => {
  const openDialog = useDialogOpener();
  const closeDialog = useDialogCloser();
  const { enqueueSnackbar } = useSnackbar();
  const handleLinkClick = () => window.open(story.link, '_blank')
  const handleEyeClick = () => openDialog<Params>(modalId, { id: story.id });

  const handleDelete = useCallback(() => {
    openDialog<DecisionParams>(decisionModalId, {
      title: chrome.i18n.getMessage('story_delete_title'),
      text: chrome.i18n.getMessage('story_delete_text'),
      yesText: chrome.i18n.getMessage('yes_delete'),
      noText: chrome.i18n.getMessage('cancel'),
      onYes: async () => {
        const [, err] = await deleteStory(story.id);

        if (err) {
          enqueueSnackbar(
            chrome.i18n.getMessage('story_delete_error'),
            { variant: 'error' }
          )
        } else {
          enqueueSnackbar(
            chrome.i18n.getMessage('story_delete_success'),
            { variant: 'success' }
          )

          onRefresh();
        }

        closeDialog(decisionModalId);
      },
      onNo: () => closeDialog(decisionModalId)
    })
  }, [story, enqueueSnackbar, closeDialog, onRefresh]);

  const date = formatDistanceToNowStrict(new Date(story.createdAt))
    .replace(/ seconds?/, 's')
    .replace(/ minutes?/, 'm')
    .replace(/ hours?/, 'h')
    .replace(/ days?/, 'd')

  return (
    <Paper 
      elevation={6} 
      sx={{ 
        overflow: 'hidden',
        marginBottom: '8px',
      }}
    >
      <Box
        py={6}
        px={4}
        position="relative"
        minHeight="160px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: story.color }}
      >
        <Typography sx={{
          color: 'rgba(255, 255, 255, .8)',
          fontSize: '0.8rem',
          fontFamily: 'Poppins',
          position: 'absolute',
          top: 10,
          right: 10
        }}>
          {date}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: '#fff',
            ...styles[story.typography]
          }}
        >
          {story.content}
        </Typography>
      </Box>
      <Stack
        px={2}
        py={.5}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        borderTop={1}
        borderColor="grey.200"
      >
        <IconButton size="small" onClick={handleLinkClick}>
          <LinkIcon size={25} />
        </IconButton>
        <IconButton size="small" onClick={handleEyeClick}>      
          <EyeIcon size={25} />
        </IconButton>
        <IconButton size="small" onClick={handleDelete}>
          <TrashIcon size={25} />
        </IconButton>
      </Stack>
    </Paper>
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
  story: FetchMyStories['myStoriesList']['items'][0],
  onRefresh: () => void,
}