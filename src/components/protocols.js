// sections/Section2.js

import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

import Criterio from '../doc/criterios';
import Ligth from '../doc/ligth';
import Izque from '../doc/cardizque';
import Suicidio from '../doc/suicidio';


function Section2() {
  return (
    <>
      <Container>
        <Typography variant="h5" gutterBottom>
          Criterios y Protocolos
        </Typography>
        <Typography variant="body1">
          <Grid item xs={12} md={4}>
            <Criterio />
          </Grid><br/>
          <Grid item xs={12} md={4}>
            <Ligth />
          </Grid>
          <Grid item xs={12} md={4}>
            <Izque />
          </Grid>
          <Grid item xs={12} md={4}>
            <Suicidio />
          </Grid>

        </Typography>
      </Container>
    </>
  );
}

export default Section2;
