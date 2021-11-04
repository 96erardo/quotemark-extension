import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { format } from 'date-fns';

export const QuoteItemTitle: React.FC<Props> = ({ title, date, link, collapsed }) => {
  if (collapsed) {
    return null;
  }

  const label = format(new Date(date), 'MMM d, yyyy');

  return (
    <Stack py={2} direction="row" spacing={1} alignItems="flex-end">
      <Typography 
        variant="h6"
        sx={{ lineHeight: 1 }}
      >
        {title}
      </Typography>
      <Link
        href={link}
        target="_blank"
        underline="always"
        sx={{ fontSize: '0.75rem' }}
      >
        {label}
      </Link>
    </Stack>
  );
}

type Props = {
  title: string,
  link: string,
  date: string,
  collapsed: boolean
}