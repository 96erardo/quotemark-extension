import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { QuoteItemDate } from './QuoteItemDate';
import { QuoteItemTitle } from './QuoteItemTitle';
import { QuoteItemContent } from './QuoteItemContent';
import { FetchQuotes, UpdateQuote } from '@shared/graphql-types';
import { modalId, Params } from '@modules/story/CreateStoryDialog';
import { useDialogOpener } from 'react-dialog-handler';
import { useTheme } from '@mui/material/styles';

export const QuoteItem: React.FC<Props> = ({ index, quote, onUpdate, onDelete }) => {
  const [checked, setChecked] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const openDialog = useDialogOpener();
  const theme = useTheme();

  const handleClick = () => setCollapsed(prevState => !prevState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }

  const handleNewStory = () => {
    openDialog<Params>(modalId, {
      id: quote.id,
      content: quote.content,
    })
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
          name={`quote_${index}`}
          size="small" 
          checked={checked}
          onChange={handleChange}
        />
      </Box>
      <Box flexGrow={1} overflow="hidden" flexDirection="column">
        <QuoteItemTitle
          id={quote.id}
          date={quote.createdAt}
          title={quote.name}
          link={quote.link}
          collapsed={collapsed}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onStory={handleNewStory}
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
  index: number,
  quote: FetchQuotes['quotesList']['items'][0],
  onDelete: (id: string, title: string) => void,
  onUpdate: (quote: UpdateQuote['quoteUpdate']) => void
}