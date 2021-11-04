import React from 'react';
import { Placeholder } from '@shared/components/Placeholder';
import { QuoteItem } from './QuoteItem';
import { useQuotes } from './hooks/useQuotes';
import Box from '@mui/material/Box';

export const QuotesView: React.FC = () => {
  const { items, loading } = useQuotes();
  let content = null;
  let containerProps = {};

  if (items.length === 0 || loading) {
    containerProps = { 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  
    content = (
      <Placeholder loading={loading} />
    );

  } else {
    content = items.map(item => (
      <QuoteItem 
        key={item.id}
        quote={item}
      />
    ));
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