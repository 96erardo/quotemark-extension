import React, { useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDialogParams, useDialogCloser } from 'react-dialog-handler';
import { useStoryViews } from './hooks/useStoryViews';

export const modalId = 'story-view';

export const StorySeenDialog: React.FC = () => {
  const { open, params } = useDialogParams<Params>(modalId);
  const closeDialog = useDialogCloser();
  const { items, count, loading, next } = useStoryViews(params?.id);

  const users = useMemo(() => items.map(user => (
    <Box 
      py={1} 
      px={2}
      display="flex" 
      flexDirection="row" 
      alignItems="center"
    >
      <Avatar
        src={user.avatar}
      />
      <Box marginLeft={1}>
        <Typography variant="h6" sx={{ color: '#1F1D36' }} fontSize="1rem">
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
    </Box>
  )), [items]);

  return (
    <Dialog open={open} maxWidth="sm">
      <Box
        p={2}
        minWidth={300}
        borderBottom={1}
        borderColor="grey.200"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {loading ? (
          <Skeleton variant="text" width="50%" />
        ) : (
          <Typography variant="h6">
            {count} views
          </Typography>
        )}
        <IconButton size="small" onClick={() => closeDialog(modalId)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        overflow="auto"
        height={250} 
        maxHeight={250}
      >
        {users}
        {(items.length < count && !loading) && (
          <Box py={0.5} textAlign="center">
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
        )}
      </Box>
    </Dialog>
  );
}

export type Params = {
  id: string,
}