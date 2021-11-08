import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { RefreshIcon } from '@shared/components/icons';

export const QuotesListHeader: React.FC<Props> = ({ loading, onRefresh }) => {
  return (
    <Stack
      px={2}
      height={40}
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      borderBottom={1}
      borderColor="grey.200"
    >
      <IconButton disabled={loading} onClick={onRefresh}>
        <RefreshIcon size={20} />
      </IconButton>
    </Stack>
  );
}

type Props = {
  loading: boolean,
  onRefresh: () => void,
}