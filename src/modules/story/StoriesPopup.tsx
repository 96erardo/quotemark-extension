import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { StoriesList } from './StoriesList';
import { Stories } from './StoriesContext';
import { StoryView } from './StoryView';
import { HouseIcon } from '@shared/components/icons';
import theme, { palette } from '@shared/config/theme-popup';
import '@shared/config/scrollbar.css';

const StoriesPopup: React.FC = () => {
  useEffect(() => {
    chrome.action.setIcon({
      path: {
        16: '../assets/icon16.png',
        32: '../assets/icon32.png',
        48: '../assets/icon48.png',
        128: '../assets/icon128.png',
      }
    })
  }, []);

  return (
    <Box 
      width={350} 
      height={477}
      bgcolor="background.paper"
    >
      <Box 
        px={2}
        py={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography sx={styles.label}>
          {chrome.i18n.getMessage('story_popup_title')}
        </Typography>
        <IconButton 
          size="small"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          <HouseIcon size={20} color={palette.whiteLight} />
        </IconButton>
      </Box>
      <StoriesList />
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
    <Stories>
      <StoryView>
        <StoriesPopup />
      </StoryView>
    </Stories>
    <CssBaseline />
  </ThemeProvider>,
  document.getElementById('root'),
)