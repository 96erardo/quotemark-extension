import React, { useState } from 'react';
import { Placeholder } from '@shared/components/Placeholder';
import Box from '@mui/material/Box';

export const QuotesView: React.FC = () => {
  const [quotes, setQuotes] = useState([]);
  let content = null;
  let containerProps = {};

  if (quotes.length > 0) {

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