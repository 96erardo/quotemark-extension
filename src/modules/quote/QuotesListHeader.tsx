import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { RefreshIcon } from '@shared/components/icons';
import { Search } from '@shared/components/Search';

export const QuotesListHeader: React.FC<Props> = ({ loading, onRefresh, onSearch }) => {
  return (
    <Stack
      px={2}
      height={40}
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottom={1}
      borderColor="grey.200"
    >
      <Search onSearch={onSearch} />
      <IconButton disabled={loading} onClick={onRefresh}>
        <RefreshIcon size={20} />
      </IconButton>
    </Stack>
  );
}

type Props = {
  loading: boolean,
  onRefresh: () => void,
  onSearch: (value: string) => void,
}