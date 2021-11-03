import React, { useCallback, useEffect, useState, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { GoogleIcon } from './icons';
import welcome from '../assets/images/welcome.png';
import { fetchUser } from '../../modules/user/user-actions';
import { UserContext } from '../../modules/user/user-context';

export function Onboarding  () {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    chrome.identity.clearAllCachedAuthTokens(async () => {
      const [user, err] = await fetchUser();

      if (err) {
        setLoading(false);
      
      } else {
        setUser(user);
        setOpen(false);
      }
    })
  }, [setUser]);

  const onSignIn = useCallback(() => {
    setSignIn(true);

    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      if (chrome.runtime.lastError && !token) {
        setSignIn(false);
      
      } else {
        const [user] = await fetchUser();

        setUser(user);
        setOpen(false);
      }
    })
  }, [setUser]);

  if (loading) {
    return (
      <Modal open={open}>
        <Box 
          width="100vw" 
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress 
            color="primary" 
            size={30}
            thickness={6}
          />
        </Box>
      </Modal>
    );
  }

  return (
    <Dialog 
      open={open} 
      fullWidth
      maxWidth="md"
      disableEscapeKeyDown={true}
    >
      <Box 
        p={2}
        pb={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <DialogTitle sx={{ fontSize: '2.5rem' }}>
          Welcome to QuoteMark
        </DialogTitle>
        <Box width={500} mb={2}>
          <img
            src={welcome}
            style={{ 
              width: '100%',
              height: 'auto'
            }}
          />
        </Box>
        <LoadingButton
          loading={signIn}
          color="secondary"
          variant="outlined" 
          disableElevation
          loadingPosition="start"
          startIcon={<GoogleIcon size={20}/>}
          onClick={onSignIn}
        >
          Sign in with Google
        </LoadingButton>
      </Box>
    </Dialog>
  );
}