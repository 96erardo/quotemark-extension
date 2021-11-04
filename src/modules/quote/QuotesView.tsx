import React, { useState } from 'react';
import { Placeholder } from '@shared/components/Placeholder';
import { QuoteItem } from './QuoteItem';
import Box from '@mui/material/Box';

export const QuotesView: React.FC = () => {
  const [quotes, setQuotes] = useState([1]);
  let content = null;
  let containerProps = {};

  if (quotes.length > 0) {
    content = (
      <QuoteItem />
    );
  } else {
    containerProps = { 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    content = (
      <Placeholder />
    );
  }

  return (
    <Box 
      width="100%" 
      height="100%"
      {...containerProps}
    >
      {content}
    </Box>
  );
};