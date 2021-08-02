import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

import beanLogoBanner from '../../assets/bean_logo_banner.png';
import iconWaves from '../../assets/icon_wave.png';

function Hero() {
  return (
    <div
      style={{
        height: '280px',
        backgroundColor: '#DBB699',
        width: '80%',
        padding: '50px',
      }}
    >
      <img alt="hero" src={beanLogoBanner} width="380px" />
      <Box mt={1}>
        <Typography variant="h6">BEST QUALITY COFFEE BEANS</Typography>
      </Box>
      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            Quality freshly roasted coffee made just for you. Pour, brew and
            enjoy
          </Grid>
          <Grid item xs={12} sm={6}>
            <img alt="waves 1" src={iconWaves} />
            <img alt="waves 2" src={iconWaves} />
            <img alt="waves 3" src={iconWaves} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Hero;
