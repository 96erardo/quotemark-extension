import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';
import LoginIcon from '@mui/icons-material/Login';
import { ErrorCodes } from '@shared/types';
import logo from '@shared/assets/images/logo-disabled.png';

export const StoriesErrorPlaceholder: React.FC<Props> = ({ code, onRefresh }) => {
  const onLogin = () => chrome.runtime.openOptionsPage();
  let text = chrome.i18n.getMessage('general_error');

  if (code === ErrorCodes.Authentication) {
    text = chrome.i18n.getMessage('story_auth_error');
  }

  return (
    <Box
      px={4} 
      display="flex"
      flexDirection="column" 
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `url(${logo}) center 50px 60px no-repeat`,
      }}
    >
      <Box mb={2}>
        <ErrorIcon color="primary" />
      </Box>
      <Typography 
        variant="h6" 
        align="center"
        color="primary"
      >
        {text}.
      </Typography>
      <Box mt={2}>
        {code === ErrorCodes.Authentication ? (
          <IconButton 
            color="primary"
            aria-label="refresh"
            onClick={onLogin}
          >
            <LoginIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton 
            color="primary"
            aria-label="refresh"
            onClick={onRefresh}
          >
            <RefreshIcon fontSize="inherit" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

type Props = {
  code: ErrorCodes,
  onRefresh: () => void
}