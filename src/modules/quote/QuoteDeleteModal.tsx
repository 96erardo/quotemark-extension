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
          chrome.i18n.getMessage('delete_error'),
          {
            variant: 'error'
          }
        )

      } else {
        enqueueSnackbar(
          chrome.i18n.getMessage('delete_success'),
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
          {chrome.i18n.getMessage('delete_title')}
        </Typography>
      </Box>
      <Box p={2}>
        <Typography variant="body1">
          {chrome.i18n.getMessage('delete_warning_1')} <b>"{title}"</b> {chrome.i18n.getMessage('delete_warning_2')}
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
          {chrome.i18n.getMessage('cancel')}
        </Button>
        <LoadingButton
          loading={loading} 
          color="error"
          variant="contained" 
          onClick={handleDelete}
          disableElevation 
        >
          {chrome.i18n.getMessage('yes_delete')}
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