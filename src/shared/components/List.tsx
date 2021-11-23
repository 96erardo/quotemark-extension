import { styled } from '@mui/material/styles';
import MuiListItemText from '@mui/material/ListItemText';

export const ListItemText = styled(
  MuiListItemText, 
  { 
    shouldForwardProp: (prop) => prop !== 'selected' 
  }
)<ListItemTextProps>(({ theme, selected }) => ({
  '& .MuiListItemText-primary': {
    color: selected ? theme.palette.primary.main : theme.palette.grey.A400,
  }
}))

type ListItemTextProps = {
  selected: boolean
}
