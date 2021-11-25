import React, { useMemo, useEffect } from 'react';
import { Placeholder } from '@shared/components/Placeholder';
import { QuoteItem } from './QuoteItem';
import { QuoteDeleteModal, QuoteDeleteModalProps } from './QuoteDeleteModal';
import { useQuotes } from './hooks/useQuotes';
import { useUser } from '@modules/user/hooks/useUser';
import { QuotesListHeader } from './QuotesListHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useCallback } from 'react';
import { useState } from 'react';

export const QuotesView: React.FC = () => {
  const user = useUser();
  const { items, count, loading, refresh, next, update } = useQuotes(user !== null);
  const [modal, setModal] = useState<Omit<QuoteDeleteModalProps, 'onClose' | 'onDeleted'>>({ open: false });
  let content = null;

  useEffect(() => {
    document.title = 'QuoteMark | List';
  }, []);

  const onLoadMore = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    next();
  }, [next]);

  const onDelete = useCallback((id: string, title: string) => {
    setModal({
      open: true,
      id,
      title
    })
  }, []);

  const quotes = useMemo(() => (
    items.map(item => (
      <QuoteItem 
        key={item.id}
        quote={item}
        onUpdate={update}
        onDelete={onDelete}
      />
    ))
  ), [items, onDelete, update]);

  if (items.length === 0 && !loading) {  
    content = (
      <Box width="100%" height="calc(100% - 40px)" display="flex" alignItems="center" justifyContent="center">
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
        overflow="auto"
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
        <QuoteDeleteModal 
          {...modal} 
          onDeleted={refresh}
          onClose={() => setModal({ open: false })}
        />
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