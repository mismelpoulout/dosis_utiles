// sections/Section1.js

import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import {Grid} from '@mui/material';

import Aines from '../drogs/aines';
import Alergicos from '../drogs/antialergicos';
import Antibio from '../drogs/antibioticos';
import Nebulizer from '../drogs/broncodilatadores';
import Steroid from '../drogs/corticoides';
import Gastro from '../drogs/gastro';
import Jarabes from '../drogs/jarabes';
import Sedantes from '../drogs/sedantes';
import Agua from '../drogs/liq';
import Virales from '../drogs/antivirales';



function Section1() {
  return (
    <>
    <Container>
      <Typography variant="h5" gutterBottom>
        Medicamentos
      </Typography>
      
<Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Aines />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Alergicos />
          </Grid>
          <Grid item xs={12} md={4}>
            <Antibio />
          </Grid>
          <Grid item xs={12} md={4}>
            <Steroid />
          </Grid>
          <Grid item xs={12} md={4}>
            <Nebulizer />
          </Grid>
          <Grid item xs={12} md={4}>
            <Gastro />
          </Grid>
          <Grid item xs={12} md={4}>
            <Agua />
          </Grid>
          <Grid item xs={12} md={4}>
            <Jarabes />
          </Grid>
          <Grid item xs={12} md={4}>
            <Sedantes />
          </Grid>
          <Grid item xs={12} md={4}>
            <Virales /> 
          </Grid>
          

        
      </Grid>
      </Container>
    </>
  );
}

export default Section1;
