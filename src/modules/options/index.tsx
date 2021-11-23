import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
import theme from '@shared/config/theme';

function Options () {
  const [user, setUser] = useState<FetchUser['user'] | null>(null);

  useEffect(() => {
    document.title = 'QuoteMark | Options';
  }, []);

  return (
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
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Options />
      <CssBaseline />
    </ThemeProvider>
  </ApolloProvider>
  , document.getElementById('root')
);
