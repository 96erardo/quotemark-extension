import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';
import { deleteQuote } from './quote-actions';
import { useSnackbar } from 'notistack';

export const QuoteDeleteModal: React.FC<QuoteDeleteModalProps> = ({ open, id, title, onDeleted, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = useCallback(async () => {
    if (id) {
      setLoading(true);
  
      const [, err] = await deleteQuote(id);

      if (err) {
        setLoading(false);

        enqueueSnackbar(
          'Something happened, the quote could not be deleted',
          {
            variant: 'error'
          }
        )

      } else {
        enqueueSnackbar(
          'Quote deleted successfully',
          {
            variant: 'success'
          }
        )

        onDeleted();
        onClose();
      }
    }
  }, [id, onClose, onDeleted, enqueueSnackbar])

  return (
    <Dialog 
      fullWidth
      open={open}
      maxWidth="sm"
    >
      <Box 
        p={2}
        borderBottom={1}
        borderColor="grey.200"
      >
        <Typography variant="h5">
          Delete quote
        </Typography>
      </Box>
      <Box p={2}>
        <Typography variant="body1">
          You are about to delete the <b>"{title}"</b> quote,
          are you sure you want to continue performing this action?
          After deleted, it is impossible to access this quote again.
        </Typography>
      </Box>
      <Stack
        p={2}
        spacing={2}
        borderTop={1}
        direction="row"
        borderColor="grey.200"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          disabled={loading}
          onClick={onClose}
          variant="outlined" 
          color="secondary"
          disableElevation
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loading} 
          color="error"
          variant="contained" 
          onClick={handleDelete}
          disableElevation 
        >
          Yes, Delete
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}

export type QuoteDeleteModalProps = {
  open: boolean,
  id?: string,
  title?: string,
  onDeleted: () => void,
  onClose: () => void
}