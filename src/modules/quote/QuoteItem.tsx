import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { QuoteItemDate } from './QuoteItemDate';
import { QuoteItemTitle } from './QuoteItemTitle';
import { QuoteItemContent } from './QuoteItemContent';
import { FetchQuotes } from '@shared/graphql-types';
import { useTheme } from '@mui/material/styles';

export const QuoteItem: React.FC<Props> = ({ quote }) => {
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
          date={quote.createdAt}
          title={quote.name}
          link={quote.link}
          collapsed={collapsed}
        />
        <QuoteItemContent 
          text={quote.content}
          collapsed={collapsed}
          checked={checked}
          onClick={handleClick}
        />
      </Box>
      <QuoteItemDate 
        date={quote.createdAt} 
        collapsed={collapsed} 
      />
    </Box>
  );
}

type Props = {
  quote: FetchQuotes['quotesList']['items'][0]
}