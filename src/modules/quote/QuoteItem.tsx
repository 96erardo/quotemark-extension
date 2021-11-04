import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { QuoteItemDate } from './QuoteItemDate';
import { QuoteItemTitle } from './QuoteItemTitle';
import { QuoteItemContent } from './QuoteItemContent';
import { useTheme } from '@mui/material/styles';

export const QuoteItem: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const theme = useTheme();

  const handleClick = () => setCollapsed(prevState => !prevState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }

  return (
    <Box 
      display="flex" 
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottom={1}
      borderColor="grey.200"
      sx={{
        '&:hover': {
          background: collapsed ? theme.palette.action.hover : theme.palette.background.paper,
        }
      }}
    >
      <Box flexGrow={0} flexShrink={0} paddingRight={1}>
        <Checkbox 
          size="small" 
          checked={checked}
          onChange={handleChange}
        />
      </Box>
      <Box flexGrow={1} overflow="hidden" flexDirection="column">
        <QuoteItemTitle
          date="2021-10-20T02:04:40.000Z"
          title="Qui aliquip labore elit eiusmod"
          link="https://google.com"
          collapsed={collapsed}
        />
        <QuoteItemContent 
          text="Fugiat nisi dolore fugiat labore nostrud sunt esse id. Fugiat sint est ullamco amet incididunt proident cupidatat Lorem adipisicing fugiat incididunt laborum sunt do. Cupidatat ex sint incididunt adipisicing voluptate elit ut ad adipisicing. Dolor et proident dolore proident aliqua exercitation ex amet qui qui proident. Eiusmod elit exercitation qui laborum excepteur."
          collapsed={collapsed}
          checked={checked}
          onClick={handleClick}
        />
      </Box>
      <QuoteItemDate 
        date="2021-10-20T02:04:40.000Z" 
        collapsed={collapsed} 
      />
    </Box>
  );
}
