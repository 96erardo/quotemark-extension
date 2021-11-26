import { makeStyles } from '@mui/styles';
import { palette } from './theme';

export const useSnackbarStyle = makeStyles({
  error: {
    backgroundColor: `${palette.red} !important`,
    fontFamily: 'Poppins !important',
    fontSize: '0.9rem !important',
    fontWeight: '600 !important'
  },
  success: {
    backgroundColor: `${palette.green} !important`,
    fontFamily: 'Poppins !important',
    fontSize: '0.9rem !important',
    fontWeight: '600 !important',
  }
})