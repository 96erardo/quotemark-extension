import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { formatDistanceToNowStrict } from 'date-fns';

export const QuoteItemDate: React.FC<Props> = ({ date, collapsed }) => {
  if (!collapsed) {
    return null;
  }

  const label = formatDistanceToNowStrict(new Date(date));

  return (
    <Box flexGrow={0} flexShrink={0} width={120} px={2}>
      <Typography variant="body2" textAlign="right">
        {`${label} ago`}
      </Typography>
    </Box>
  );
}

type Props = {
  date: string,
  collapsed: boolean
}