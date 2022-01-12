import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import me from '@shared/assets/images/me.jpeg';
import wallet from '@shared/assets/images/wallet.png';
import {
  GithubIcon,
  YouTubeIcon,
  TwitterIcon,
  InstagramIcon,
  PayPalIcon,
} from '@shared/components/icons';

export const AboutUsView: React.FC = () => {
  useEffect(() => {
    document.title = 'QuoteMark | About Us';
  }, []);

  return (
    <Box 
      width="100%" 
      height="100%"
      overflow="auto"
      p={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack spacing={4} alignItems="center">
            <Avatar 
              alt="QuoteMark's developer, designer, testing and marketing team" 
              src={me}
              sx={{
                width: '70%',
                height: 'auto'
              }}
            />
            <img 
              alt="Bitcoin Wallet Address" 
              src={wallet}
              style={{
                width: '70%'
              }}
            />
            <a 
              href="https://www.producthunt.com/posts/quotemark?utm_source=badge-review&utm_medium=badge&utm_souce=badge-quotemark#discussion-body" 
              target="_blank"
              style={{ width: '90%' }}
            >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=325092&theme=dark" 
                  alt="QuoteMark - Save interesting text found on the Internet | Product Hunt" 
                  style={{ width: '100%' }}
                />
            </a>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {chrome.i18n.getMessage('about_us_1')}
          </Typography>
          <br />
          <Typography variant="body2">
            {chrome.i18n.getMessage('about_us_2')}
          </Typography>
          <br />
          <Typography variant="body2">
            {chrome.i18n.getMessage('about_us_3')}
          </Typography>
          <br />
          <Typography variant="body2">
            {chrome.i18n.getMessage('about_us_4')}
          </Typography>
          <br />
          <Stack spacing={2} direction="row">
            <Box>
              <IconButton onClick={() => window.open('https://github.com/GerardoAGL96', '_blank')}>
                <GithubIcon size={30} />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={() => window.open('https://www.youtube.com/channel/UCk4X_hBQBPX_naaSTYCMPaA', '_blank')}>
                <YouTubeIcon size={30} />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={() => window.open('https://twitter.com/96erardo', '_blank')}>
                <TwitterIcon size={30} />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={() => window.open('https://www.instagram.com/96erardo/', '_blank')}>
                <InstagramIcon size={30} />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={() => window.open('https://www.paypal.com/paypalme/96erardo', '_blank')}>
                <PayPalIcon size={30} />
              </IconButton>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}