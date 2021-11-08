import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { useUser } from '@modules/user/hooks/useUser';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@shared/components/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTheme } from '@mui/material/styles';
import { QuotesView } from '@modules/quote/QuotesView';
import {
  GlassesIcon,
  ConfigIcon,
  InfoIcon
} from '@shared/components/icons';

export function MainCard () {
  const user = useUser();
  const { 0: firstLetter } = user?.firstName.toUpperCase() || 'A';
  const [screen, setScreen] = useState<Screen>('quote');
  const theme = useTheme();

  const avatar = user?.avatar ? (
    <Avatar 
      alt={`${user?.firstName} ${user?.lastName}`}
      src={user.avatar}
    />
  ) : (
    <Avatar alt={`${user?.firstName} ${user?.lastName}`}>
      {firstLetter}
    </Avatar>
  );

  const primary = theme.palette.primary.main;
  const grey = theme.palette.grey.A400;
  let view = null;

  if (screen === 'quote') {
    view = (
      <QuotesView />
    )
  }

  return (
    <Paper elevation={20} sx={{ width: '100%', height: '100%' }}>
      <Box
        px={2}
        height={64} 
        display="flex"
        borderBottom={1}
        borderColor="grey.200"
        alignItems="center"
        justifyContent="space-between"
      >
        {avatar}
        <Avatar>
          QM
        </Avatar>
      </Box>
      <Box
        width="100%"
        height="calc(100% - 64px)"
        display="flex"
        flexDirection="row"
      >
        <Box
          width={220}
          height="100%"
          borderRight={1}
          borderColor="grey.200"
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setScreen('quote')}>
                <ListItemIcon>
                  <GlassesIcon 
                    size={30}
                    color={screen === 'quote' ? primary : grey} 
                  />
                </ListItemIcon>
                <ListItemText selected={screen === 'quote'} primary="Quotes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setScreen('settings')}>
                <ListItemIcon>
                  <ConfigIcon 
                    size={30}
                    color={screen === 'settings' ? primary : grey} 
                  />
                </ListItemIcon>
                <ListItemText selected={screen === 'settings'} primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setScreen('about-us')}>
                <ListItemIcon>
                  <InfoIcon 
                    size={30}
                    color={screen === 'about-us' ? primary : grey} 
                  />
                </ListItemIcon>
                <ListItemText selected={screen === 'about-us'} primary="About us" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box 
          width="calc(100% - 220px)" 
          height="100%"
          maxHeight="100%"
        >
          {view}
        </Box>
      </Box>
    </Paper>
  );
}

type Screen = 'quote' | 'settings' | 'about-us';