import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Onboarding } from '@shared/components/Onboarding';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@shared/config/theme';
import { UserContext } from '@modules/user/user-context';
import { FetchUserQuery } from '@shared/graphql-types';
import Box from '@mui/material/Box';
import { client } from '@shared/config/apollo';
import { ApolloProvider } from '@apollo/client';

function Options () {
  const [user, setUser] = useState<FetchUserQuery['user'] | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box 
        width="100vw" 
        height="100vh"
        bgcolor="background.default"
      >
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
