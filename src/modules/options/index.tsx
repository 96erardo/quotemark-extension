import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Onboarding } from '../../shared/components/Onboarding';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../shared/config/theme';
import Box from '@mui/material/Box';

function Options () {
  // window.onload = () => {
  //   const button = document.querySelector('button');
  
  //   button?.addEventListener('click', () => {
  //     // .getAuthToken({ interactive: true }, token => console.log('token', token));
  //   })
  // }

  return (
    <ThemeProvider theme={theme}>
      <Box 
        width="100vw" 
        height="100vh"
        bgcolor="background.default"
      >
        <Onboarding />
      </Box>
      <CssBaseline />
    </ThemeProvider>
    // <div>
    //   <h1>Options Page</h1>
    //   <button>
    //     Log in
    //   </button>
    // </div>
  );
}

ReactDOM.render(<Options />, document.getElementById('root'));
