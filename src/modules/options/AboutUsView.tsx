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
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            Hello, my name is Gerardo García and i’m a software developer. I had the idea of QuoteMark a 
            while ago because i sometimes forget about important details i read on the Internet, 
            that situation sometimes led to silly mistakes and inefficient solutions that made me lose time. 
          </Typography>
          <br />
          <Typography variant="body2">
            For me, this is a personal project to make me solve that little problem and learn a few things in the process. 
            I also documented the development lifecycle on my YouTube channel to make it a bit more fun, 
            so if you know a bit of spanish you can watch the videos i made on the subject.
          </Typography>
          <br />
          <Typography variant="body2">
            I have plans to continue developing this little side projects and documenting them on YouTube, so if you are 
            interested in this kind of topics, you can follow me on social media to be informed of what i’m doing.
          </Typography>
          <br />
          <Typography variant="body2">
            I really hope this tool is overall useful for you, and if you catch any bug or have any idea on a new feature 
            you can DM me through social media and i will respond as soon as possible. On the other hand if you, for any 
            reason, want to support this little work that i do with a donation i’ll be more than grateful for your help. 
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