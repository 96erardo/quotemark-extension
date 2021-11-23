import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import placeholder from '../assets/images/placeholder.png';

export const Placeholder: React.FC<Props> = ({ loading }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {loading ? (
        <CircularProgress 
          color="primary" 
          size={30}
          thickness={6}
        />
      ) : (
        <>
          <img 
            src={placeholder} 
            width={400} 
          />
          <Typography textAlign="center" variant="h4">
            Looks like there is nothing here
          </Typography>
          <Typography textAlign="center" variant="subtitle1">
            Save some content to start your journey.
          </Typography>
        </>
      )}
    </Box>
  );
}

type Props = {
  loading: boolean,
}