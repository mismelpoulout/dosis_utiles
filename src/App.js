import React from 'react';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';


import GuiasMinsal from './guiasminsal';
import Aines from './drogs/aines';
import Alergicos from './drogs/antialergicos';
import Antibio from './drogs/antibioticos';
import Nebulizer from './drogs/broncodilatadores';
import Steroid from './drogs/corticoides';
import Gastro from './drogs/gastro';
import Jarabes from './drogs/jarabes';
import Sedantes from './drogs/sedantes';
import Footer from './footer';
import Navbar from './navbar';
import Face from './components/facebook';
import Suicidio from './doc/suicidio';
import Virales from './drogs/antivirales'
import Criterio from './doc/criterios';
import Ligth from './doc/ligth'
import Izque from './doc/cardizque'


const App = () => {
  return (
    <Container>
     <Grid container spacing={1}>
     <Navbar />
     </Grid>
     <br/>
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
          <Jarabes />
        </Grid>
        <Grid item xs={12} md={4}>
          <Sedantes />
        </Grid>
        <Grid item xs={12} md={4}>
          <Suicidio/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Izque/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Virales/> 
        </Grid>
        <Grid item xs={12} md={4}>
          <GuiasMinsal/>
        </Grid> 
        <Grid item xs={12} md={4}>
          <Criterio/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Ligth/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Face/>
        </Grid>
      </Grid>
      <Footer/>
    </Container>
  );
};

export default App;
