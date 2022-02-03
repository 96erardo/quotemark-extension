import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';
import { deleteQuote } from '../../modules/quote/quote-actions';
import { useDialogParams, useDialogCloser } from 'react-dialog-handler';
import { useSnackbar } from 'notistack';

export const modalId = 'decision-dialog';

export const DecisionDialog: React.FC = () => {
  const { open, params } = useDialogParams<Params>(modalId);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(() => {
    setLoading(true);

    if (params) {
      params.onYes();
    }
  }, [params]);

  useEffect(() => {
    if (open) {
      setLoading(false)
    }
  }, [open]);

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
          {params?.title}
        </Typography>
      </Box>
      <Box p={2}>
        <Typography variant="body1">
          {params?.text}
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
          onClick={params?.onNo}
          variant="outlined" 
          color="secondary"
          disableElevation
        >
          {params?.noText}
        </Button>
        <LoadingButton
          loading={loading} 
          color="error"
          variant="contained" 
          onClick={onSubmit}
          disableElevation 
        >
          {params?.yesText}
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}

export type Params = {
  title: string,
  text: string,
  yesText: string,
  noText: string,
  onYes: () => void,
  onNo: () => void,
}
