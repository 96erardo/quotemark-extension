import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack'; 
import { ThemeProvider } from '@mui/material/styles';
import { Onboarding } from '@shared/components/Onboarding';
import { MainCard } from '@shared/components/MainCard';
import CssBaseline from '@mui/material/CssBaseline';
import { UserContext } from '@modules/user/user-context';
import { FetchUser } from '@shared/graphql-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { client } from '@shared/config/apollo';
import { ApolloProvider } from '@apollo/client';
import { useSnackbarStyle } from '@shared/config/snackbar';
import { DialogHandler } from 'react-dialog-handler';
import theme from '@shared/config/theme';

function Options () {
  const [user, setUser] = useState<FetchUser['user'] | null>(null);
  const snackStyles = useSnackbarStyle();

  return (
    <SnackbarProvider 
      maxSnack={3} 
      autoHideDuration={3000}
      hideIconVariant 
      classes={{
        variantError: snackStyles.error,
        variantSuccess: snackStyles.success,
      }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <Box 
          width="100vw" 
          height="100vh"
          bgcolor="background.default"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Container maxWidth="lg" sx={{ height: '80vh' }}>
            <MainCard />
          </Container>
          <Onboarding />
        </Box>
      </UserContext.Provider>
    </SnackbarProvider>
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <DialogHandler>
      <ThemeProvider theme={theme}>
        <Options />
        <CssBaseline />
      </ThemeProvider>
    </DialogHandler>
  </ApolloProvider>
  , document.getElementById('root')
);
