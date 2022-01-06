import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { HouseIcon } from '@shared/components/icons';
import theme, { palette } from '@shared/config/theme-popup';

const StoriesPopup: React.FC = () => {
  return (
    <Box 
      width={300} 
      height={500}
      bgcolor="background.paper"
    >
      <Box 
        p={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography sx={styles.label}>
          Stories
        </Typography>
        <IconButton 
          size="small"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          <HouseIcon size={20} color={palette.whiteLight} />
        </IconButton>
      </Box>
    </Box>
  );
}

const styles = {
  label: {
    fontFamily: 'Poppins',
    fontWeight: 300,
    color: palette.whiteLight,
    fontSize: '0.9rem'
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StoriesPopup />
    <CssBaseline />
  </ThemeProvider>,
  document.getElementById('root'),
)