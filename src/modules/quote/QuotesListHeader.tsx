import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { MenuItem } from '@shared/components/MenuItem';
import { RefreshIcon, MoreIcon } from '@shared/components/icons';
import { Search } from '@shared/components/Search';

export const QuotesListHeader: React.FC<Props> = ({ loading, onRefresh, onSearch, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <Box
      px={2}
      height={40}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottom={1}
      borderColor="grey.200"
    >
      <Search onSearch={onSearch} />
      <Stack direction="row" spacing={2}>
        <IconButton disabled={loading} onClick={onRefresh}>
          <RefreshIcon size={20} />
        </IconButton>
        <IconButton onClick={handleClick}>
          <MoreIcon size={20} />
        </IconButton>        
      </Stack> 
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem variant="danger" onClick={onDelete}>
          Delete Selected
        </MenuItem>
      </Menu>
    </Box>
  );
}

type Props = {
  loading: boolean,
  onRefresh: () => void,
  onDelete: () => void,
  onSearch: (value: string) => void,
}