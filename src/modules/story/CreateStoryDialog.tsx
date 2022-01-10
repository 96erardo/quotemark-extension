import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useDialogParams, useDialogCloser } from 'react-dialog-handler';
import { ColorPicker } from '@shared/components/ColorPicker';
import { colors } from './story-constants';
import { Typography as TypographyNames } from '@shared/graphql-types';
import { createStory } from './story-actions';
import { useSnackbar } from 'notistack';

export const modalId = 'create-story-dialog';

export const CreateStoryDialog: React.FC = () => {
  const { open, params } = useDialogParams<Params>(modalId);
  const closeDialog = useDialogCloser();
  const [typography, setTypography] = useState<TypographyNames>(TypographyNames.Arial);
  const [color, setColor] = useState<string>(colors[0]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleTypographyChange = (e: SelectChangeEvent) => {
    setTypography(e.target.value as TypographyNames);
  }

  const handleCreate = async () => {    
    if (params) {
      setLoading(true);

      const [data, err] = await createStory(
        params.id,
        color,
        typography,
      );

      setLoading(false);

      if (err) {
        enqueueSnackbar(
          chrome.i18n.getMessage('story_create_error'),
          { variant: 'error' }
        );
      }

      if (data) {
        enqueueSnackbar(
          chrome.i18n.getMessage('story_create_success'),
          { variant: 'success' }
        );

        closeDialog(modalId);
      }
    }
  }

  return (
    <Dialog 
      fullWidth
      open={open}
      maxWidth="sm"
    >
      <Box 
        px={2}
        py={1}
        borderBottom={1}
        borderColor="grey.200"
      >
        <Typography variant="h6">
          {chrome.i18n.getMessage('create_story_title')}
        </Typography>
      </Box>
      <Box 
        p={4} 
        height="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: color }}
      >
        <Typography
          variant="body1"
          align="center"
          sx={{
            ...styles[typography],
            color: '#fff',
            fontSize: '1.8rem'
          }}
        >
          {params?.content}
        </Typography>
      </Box>
      <Stack py={1} px={2} spacing={2} direction="row" alignItems="center">
        <ColorPicker value={color} onChange={setColor} />
        <FormControl size="small">
          <Select 
            value={typography} 
            onChange={handleTypographyChange}
            sx={styles[typography]}
          >
            <MenuItem value={TypographyNames.Arial} sx={styles.Arial}>
              Arial
            </MenuItem>
            <MenuItem value={TypographyNames.Poppins} sx={styles.Poppins}>
              Poppins
            </MenuItem>
            <MenuItem value={TypographyNames.Barlow} sx={styles.Barlow}>
              Barlow
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack
        px={2}
        py={1}
        spacing={2}
        borderTop={1}
        direction="row"
        borderColor="grey.200"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          disabled={loading}
          onClick={() => closeDialog(modalId)}
          variant="outlined" 
          color="secondary"
          disableElevation
        >
          {chrome.i18n.getMessage('cancel')}
        </Button>
        <LoadingButton
          loading={loading} 
          variant="contained" 
          onClick={handleCreate}
          disableElevation 
        >
          {chrome.i18n.getMessage('add_to_stories')}
        </LoadingButton>
      </Stack>
    </Dialog>
  )
}

const styles: Record<TypographyNames, object>= {
  Arial: {
    fontFamily: TypographyNames.Arial,
  },
  Poppins: {
    fontFamily: TypographyNames.Poppins,
    fontWeight: 700,
  },
  Barlow: {
    fontFamily: TypographyNames.Barlow,
  }
}

export type Params = {
  id: string,
  content: string,
}