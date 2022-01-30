import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { FetchPublicStories } from '@shared/graphql-types';
import { palette } from '@shared/config/theme-popup';

export const StoryAvatar: React.FC<Props> = ({ user, seen }) => {
  return (
    <Box 
      width={60} 
      height={60}
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: seen ? (
          'rgba(190, 190, 190, .35)'
          ) : (
          `linear-gradient(135deg, ${palette.purpleDark_1}, ${palette.purpleLight_1})`
        )
      }}
    >
      <Avatar 
        alt={user.firstName + ' ' + user.lastName}
        src={user.avatar}
        sx={{
          width: 52,
          height: 52,
          border: `3px solid ${palette.dark}`
        }}
      />
    </Box>
  );
}

type Props = {
  user: FetchPublicStories['storiesList']['items'][0]['user'],
  seen: boolean,
}