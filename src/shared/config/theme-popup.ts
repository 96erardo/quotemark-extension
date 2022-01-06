import { createTheme } from '@mui/material/styles';
import PoppinsLight from '@shared/assets/fonts/Poppins-Light.ttf';
import PoppinsLightItalic from '@shared/assets/fonts/Poppins-LightItalic.ttf';
import PoppinsRegular from '@shared/assets/fonts/Poppins-Regular.ttf';
import PoppinsItalic from '@shared/assets/fonts/Poppins-Italic.ttf';
import PoppinsSemiBold from '@shared/assets/fonts/Poppins-SemiBold.ttf'
import PoppinsSemiBoldItalic from '@shared/assets/fonts/Poppins-SemiBoldItalic.ttf';
import PoppinsBold from '@shared/assets/fonts/Poppins-Bold.ttf'
import PoppinsBoldItalic from '@shared/assets/fonts/Poppins-BoldItalic.ttf';
import BarlowLight from '@shared/assets/fonts/BarlowCondensed-Light.ttf';
import BarlowLightItalic from '@shared/assets/fonts/BarlowCondensed-LightItalic.ttf';
import Barlow from '@shared/assets/fonts/BarlowCondensed-Regular.ttf';
import BarlowItalic from '@shared/assets/fonts/BarlowCondensed-Italic.ttf';
import BarlowMedium from '@shared/assets/fonts/BarlowCondensed-Medium.ttf';
import BarlowMediumItalic from '@shared/assets/fonts/BarlowCondensed-MediumItalic.ttf';

export const palette = {
  purpleDark: '#6A2871',
  purple: '#95389E',
  purpleLight: '#BC45C8',

  grayDark: '#A1A1A1',
  gray: '#BEBEBE',
  grayLight_2: '#EEEEEE',
  grayLight_1: '#F8F8F9',

  red: '#FF3D68',

  green: '#34BE82',

  dark: '#1F1D36',
  black: '#000',
  white: '#fff',
  whiteLight: 'rgba(255, 255, 255, .5)'
}

export default createTheme({
  palette: {
    primary: {
      main: palette.purple,
      light: palette.purpleLight,
      dark: palette.purpleDark
    },
    secondary: {
      main: palette.black,
    },
    background: {
      paper: palette.dark,
      default: palette.grayLight_1,
    },
    grey: {
      A100: palette.grayLight_1,
      A200: palette.grayLight_2,
      A400: palette.gray,
      A700: palette.grayDark,
    },
    error: {
      main: palette.red,
    }
  },
  typography: {
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: palette.grayDark,
      letterSpacing: 0,
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: palette.grayDark,
      letterSpacing: 0,
    },
    subtitle2: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '0.65rem'
    },
    body1: {
      fontFamily: 'Barlow',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Barlow',
      fontWeight: 400,
      fontSize: '1.1rem',
    },
    button: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '15px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '15px'
        },
        elevation20: {
          boxShadow: '0px 0px 20px rgb(166 166 166 / 25%)',
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: 'Poppins',
          fontWeight: 700,
          color: palette.gray
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          fontWeight: 600,
          letterSpacing: 0,
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(5px)'
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          minWidth: '135px'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          fontSize: '0.9rem',
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          outline: 'none',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 300;
          src: url(${PoppinsLight}) format('truetype');
        }
        
        @font-face {
          font-family: 'Poppins';
          font-style: italic;
          font-weight: 300;
          src: url(${PoppinsLightItalic}) format('truetype');
        }

        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          src: url(${PoppinsRegular}) format('truetype');
        }

        @font-face {
          font-family: 'Poppins';
          font-style: italic;
          font-weight: 400;
          src: url(${PoppinsItalic}) format('truetype');
        }

        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          src: url(${PoppinsSemiBold}) format('truetype');
        }
        
        @font-face {
          font-family: 'Poppins';
          font-style: italic;
          font-weight: 600;
          src: url(${PoppinsSemiBoldItalic}) format('truetype');
        }
        
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 700;
          src: url(${PoppinsBold}) format('truetype');
        }
        
        @font-face {
          font-family: 'Poppins';
          font-style: italic;
          font-weight: 700;
          src: url(${PoppinsBoldItalic}) format('truetype');
        }

        @font-face {
          font-family: 'Barlow';
          font-style: normal;
          font-weight: 300;
          src: url(${BarlowLight}) format('truetype');
        }
        
        @font-face {
          font-family: 'Barlow';
          font-style: italic;
          font-weight: 300;
          src: url(${BarlowLightItalic}) format('truetype');
        }

        @font-face {
          font-family: 'Barlow';
          font-style: normal;
          font-weight: 400;
          src: url(${Barlow}) format('truetype');
        }
        
        @font-face {
          font-family: 'Barlow';
          font-style: italic;
          font-weight: 400;
          src: url(${BarlowItalic}) format('truetype');
        }

        @font-face {
          font-family: 'Barlow';
          font-style: normal;
          font-weight: 500;
          src: url(${BarlowMedium}) format('truetype');
        }
        
        @font-face {
          font-family: 'Barlow';
          font-style: italic;
          font-weight: 500;
          src: url(${BarlowMediumItalic}) format('truetype');
        }
      `
    }
  }
});