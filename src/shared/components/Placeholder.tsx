import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import placeholder from '../assets/images/placeholder.png';

export const Placeholder: React.FC = () => {
  return (
    <Box 
      py={2}
      height="100%"
      width="100%"
      overflow="auto"
    >
      <Box display="flex" justifyContent="center">
        <img 
          src={placeholder} 
          width={350} 
        />
      </Box>
      <Typography textAlign="center" variant="h4">
        {chrome.i18n.getMessage('placeholder_title')}
      </Typography>
      <Typography textAlign="center" variant="subtitle1">
        {chrome.i18n.getMessage('placeholder_subtitle')}
      </Typography>
    </Box>
  );
}
