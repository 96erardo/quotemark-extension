import React, { useMemo } from 'react';
import { Placeholder } from '@shared/components/Placeholder';
import { QuoteItem } from './QuoteItem';
import { useQuotes } from './hooks/useQuotes';
import { useUser } from '@modules/user/hooks/useUser';
import { QuotesListHeader } from './QuotesListHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useCallback } from 'react';

export const QuotesView: React.FC = () => {
  const user = useUser();
  const { items, count, loading, refresh, next } = useQuotes(user !== null);
  let content = null;

  const onLoadMore = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    next();
  }, [next]);

  const quotes = useMemo(() => (
    items.map(item => (
      <QuoteItem 
        key={item.id}
        quote={item}
      />
    ))
  ), [items]);

  if (items.length === 0 && !loading) {  
    content = (
      <Box width="100%" height="calc(100% - 40px)" alignItems="center" justifyContent="center">
        <Placeholder loading={loading} />
      </Box>
    );
  
  } else if (items.length === 0 && loading) {
    content = (
      <Box width="100%" height="calc(100% - 40px)" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress 
          color="primary" 
          size={30}
          thickness={6}
        />
      </Box>
    );
  
  } else {
    content = (
      <Box 
        width="100%" 
        height="calc(100% - 40px)"
        overflow="scroll"
      >
        {quotes}
        {items.length !== count && !loading && (
          <Box py={1} display="flex" alignItems="center" justifyContent="center">
            <Link
              onClick={onLoadMore}
              target="_blank"
              underline="none"
              sx={{ 
                cursor: 'pointer',
                fontSize: '0.75rem',
              }}
            >
              Load More
            </Link>
          </Box>
        )}
        {loading && (
          <Box py={1} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress 
              color="primary"
              size={20}
              thickness={6}
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box 
      width="100%" 
      height="100%"
    >
      <QuotesListHeader 
        loading={loading} 
        onRefresh={refresh}  
      />
      {content}
    </Box>
  );
};