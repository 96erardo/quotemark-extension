import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import logo from '@shared/assets/images/logo-disabled.png';

export const OnboardingError: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      >
      <Box 
        width="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img 
          src={logo} 
          style={{ width: '55%' }}
        />
      </Box>
      <Box width="50%">
        <Box component="p" fontFamily="Poppins" mb={2} >
          {chrome.i18n.getMessage('auth_error_1')}
        </Box>
        <Box component="p" fontFamily="Poppins">
          {chrome.i18n.getMessage('auth_error_2')}
          <Link href="https://chrome.google.com/webstore/detail/quotemark/bdlgcilidibgbenjdggjdppfdfckoloi" target="_blank">
            {` ${chrome.i18n.getMessage('extension_page')} `}
          </Link>
          {chrome.i18n.getMessage('auth_error_3')}
        </Box>
      </Box>
    </Box>
  );
}