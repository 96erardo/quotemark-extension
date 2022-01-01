import React, { useState, useCallback, useMemo, useEffect, useRef, FormEvent } from 'react';
import { Placeholder } from '@shared/components/Placeholder';
import { QuoteItem } from './QuoteItem';
import { QuoteDeleteModal, QuoteDeleteModalProps } from './QuoteDeleteModal';
import { DeleteManyModal, DeleteManyModalProps } from './DeleteManyModal';
import { useQuotes } from './hooks/useQuotes';
import { useUser } from '@modules/user/hooks/useUser';
import { useSnackbar } from 'notistack';
import { QuotesListHeader } from './QuotesListHeader';
import CircularProgress from '@mui/material/CircularProgress';
import { CreateStoryDialog } from '@modules/story/CreateStoryDialog';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export const QuotesView: React.FC = () => {
  const user = useUser();
  const { items, count, loading, refresh, next, update, filter } = useQuotes(user !== null);
  const [modal, setModal] = useState<Omit<QuoteDeleteModalProps, 'onClose' | 'onDeleted'>>({ open: false });
  const [delMany, setDelMany] = useState<Omit<DeleteManyModalProps, 'onClose' | 'onDeleted'>>({ open: false, ids: [] });
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<HTMLFormElement>(null);
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

  const onDeleteMany = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const del = items
      .filter((_, i) => e.currentTarget[`quote_${i}`].checked)
      .map(item => item.id);

    if (del.length === 0) {
      enqueueSnackbar(
        chrome.i18n.getMessage('select_error'),
        {
          variant: 'error',
        }
      )

    } else {
      setDelMany({
        open: true,
        ids: del
      })
    }
  }, [items]);

  const quotes = useMemo(() => (
    items.map((item, i) => (
      <QuoteItem 
        index={i}
        key={item.id}
        quote={item}
        onUpdate={update}
        onDelete={onDelete}
      />
    ))
  ), [items, onDelete, update]);

  if (items.length === 0 && !loading) {  
    content = (
      <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
        <Placeholder loading={loading} />
      </Box>
    );
  
  } else if (items.length === 0 && loading) {
    content = (
      <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
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
        height="100%"
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
        <CreateStoryDialog />
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
        onDelete={() => ref.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
        onRefresh={refresh}
        onSearch={filter}
      />
      <Box 
        ref={ref}
        width="100%" 
        height="calc(100% - 40px)"
        component={Form}
        onSubmit={onDeleteMany}
      >
        {content}
      </Box> 
      <DeleteManyModal 
        ids={delMany.ids}
        open={delMany.open}
        onClose={() => setDelMany({ open: false, ids: [] })}
        onDeleted={refresh}
      />
    </Box>
  );
};

const Form = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => (
  <form 
    ref={ref}
    {...props}
  />
))

type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;