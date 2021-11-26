import React, { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { deleteQuote } from './quote-actions';

export const DeleteManyModal: React.FC<DeleteManyModalProps> = ({ open, ids, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    let deleted = 0;
    let errors = 0;
    
    setLoading(true);

    for (const id of ids) {
      const [err] = await deleteQuote(id);

      if (err) {
        errors += 1;

      } else {
        deleted += 1;
      }
    }

    if (errors > 0) {
      // Notification
    }

    if (deleted > 0) {
      // Notification
    }

    setLoading(false);
    onDeleted();
    onClose();

  }, [ids, onDeleted, onClose]);

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
          You are about to delete <b>{ids.length}</b> quotes,
          are you sure you want to continue performing this action?
          After deleted, it is impossible to access this information again.
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

export type DeleteManyModalProps = {
  open: boolean,
  ids: Array<string>,
  onDeleted: () => void,
  onClose: () => void
}