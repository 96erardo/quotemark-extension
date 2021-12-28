import React, { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { deleteQuote } from './quote-actions';
import { useSnackbar } from 'notistack';

export const DeleteManyModal: React.FC<DeleteManyModalProps> = ({ open, ids, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = useCallback(async () => {
    let deleted = 0;
    let errors = 0;
    
    setLoading(true);

    for (const id of ids) {
      const [, err] = await deleteQuote(id);

      if (err) {
        errors += 1;

      } else {
        deleted += 1;
      }
    }

    if (errors > 0) {
      enqueueSnackbar(
        chrome.i18n.getMessage('delete_many_error', [errors]),
        {
          variant: 'error'
        }
      )
    }

    if (deleted > 0) {
      enqueueSnackbar(
        chrome.i18n.getMessage('delete_many_success', [deleted]),
        {
          variant: 'success'
        }
      )
    }

    setLoading(false);
    onDeleted();
    onClose();
  }, [ids, onDeleted, onClose, enqueueSnackbar]);

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
          {chrome.i18n.getMessage('delete_many_warning_1')} <b>{ids.length}</b> {chrome.i18n.getMessage('delete_many_warning_2')}
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

export type DeleteManyModalProps = {
  open: boolean,
  ids: Array<string>,
  onDeleted: () => void,
  onClose: () => void
}