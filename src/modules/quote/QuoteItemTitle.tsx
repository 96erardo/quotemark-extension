import React, { useState, useRef, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { MenuItem } from '@shared/components/MenuItem';
import { MoreIcon } from '@shared/components/icons';
import { updateQuoteName } from './quote-actions';
import { UpdateQuote } from '@shared/graphql-types';
import { useSnackbar } from 'notistack';
import { useDialogOpener, useDialogCloser } from 'react-dialog-handler';
import { modalId, Params } from '@shared/components/DecisionDialog';
import { deleteQuote } from './quote-actions';
import { format } from 'date-fns';

export const QuoteItemTitle: React.FC<Props> = ({ 
  id, 
  title, 
  date, 
  link, 
  collapsed, 
  onUpdate, 
  onRefresh,
  onStory,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updating, setUpdating] = useState(false);
  const openDialog = useDialogOpener();
  const closeDialog = useDialogCloser();
  const { enqueueSnackbar } = useSnackbar();
  const open = Boolean(anchorEl);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const onFocus = async function (this: HTMLHeadingElement) {
        const innerText = this.innerText;

        if (innerText && innerText !== title) {
          setUpdating(true);

          const [data, err] = await updateQuoteName(id, innerText);
                  
          if (err) {
            enqueueSnackbar(
              chrome.i18n.getMessage('update_error'),
              { variant: 'error' }
            );
          }

          if (data) {
            onUpdate(data);
          }

          setUpdating(false);
        }
      }

      titleRef.current.addEventListener('focusout', onFocus);

      return () => titleRef.current?.removeEventListener('focusout', onFocus);
    }
  }, [id, title, onUpdate, enqueueSnackbar]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleDelete = useCallback(() => {
    openDialog<Params>(modalId, {
      title: chrome.i18n.getMessage('delete_title'),
      text: `${chrome.i18n.getMessage('delete_warning_1')} "${title}" ${chrome.i18n.getMessage('delete_warning_2')}`,
      yesText: chrome.i18n.getMessage('yes_delete'),
      noText: chrome.i18n.getMessage('cancel'),
      onYes: async () => {
        const [, err] = await deleteQuote(id);

        if (err) {
          enqueueSnackbar(
            chrome.i18n.getMessage('delete_error'),
            { variant: 'error' }
          )
        } else {
          enqueueSnackbar(
            chrome.i18n.getMessage('delete_success'),
            { variant: 'success' }
          )

          onRefresh();
        }

        closeDialog(modalId);
      },
      onNo: () => closeDialog(modalId)
    })
  }, [id, title, openDialog, closeDialog, onRefresh]);

  const label = format(new Date(date), 'MMM d, yyyy');

  return (
    <Box 
      display={collapsed ? 'none' : 'flex'}
      flexDirection="row" 
      alignItems="center" 
      justifyContent="space-between"
    >
      <Stack py={2} direction="row" spacing={1} alignItems="flex-end">
        <Typography 
          variant="h6"
          sx={{ lineHeight: 1.25 }}
          ref={titleRef}
          component={Title}
          contentEditable={updating ? 'false' : 'true'}
        >
          {title}
        </Typography>
        <Link
          href={link}
          target="_blank"
          underline="always"
          sx={{ fontSize: '0.75rem', flexShrink: 0 }}
        >
          {`${label}`}
        </Link>
      </Stack>
      <Box px={2}>
        <IconButton onClick={handleClick}>
          <MoreIcon />
        </IconButton>
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={onStory}>
          {chrome.i18n.getMessage('add_to_stories')}
        </MenuItem>
        <MenuItem variant="danger" onClick={handleDelete}>
          {chrome.i18n.getMessage('delete')}
        </MenuItem>
      </Menu>
    </Box>
  );
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(({ contentEditable, ...props}, ref) => (
  <h6 
    ref={ref} 
    contentEditable={contentEditable}
    suppressContentEditableWarning={true}
    {...props} 
  />
))

type TitleProps = {
  contentEditable: 'true' | 'false',
}

type Props = {
  id: string,
  title: string,
  link: string,
  date: string,
  collapsed: boolean,
  onUpdate: (quote: UpdateQuote['quoteUpdate']) => void,
  onRefresh: () => void,
  onStory: () => void,
}