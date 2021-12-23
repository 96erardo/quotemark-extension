import { styled } from '@mui/material/styles';
import MuiMenuItem from '@mui/material/MenuItem';

export const MenuItem = styled(
  MuiMenuItem,
  {
    shouldForwardProp: (prop) => prop !== 'variant'
  }
)<MenuItemProps>(({ theme, variant }) => ({
  color: variant === 'danger' ? theme.palette.error.main : theme.palette.text.primary,
}))

type MenuItemProps = {
  variant?: 'danger'
}