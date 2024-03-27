import React, { useState } from 'react';
import { Container, IconButton, Grid} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

import GuiasMinsal from './doc/guiasminsal';
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
import Agua from './drogs/liq';
import Criterio from './doc/criterios';
import Ligth from './doc/ligth';
import Izque from './doc/cardizque';
import NoteBox from './components/note';

const App = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <>
      <Container>
        <Grid container spacing={1}>
          <Navbar />
        </Grid>
        <br />
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
          <Grid item xs={12} md={4}>
            <Agua/>
          </Grid>  
          <Grid item xs={12} md={4}>
            <GuiasMinsal />
          </Grid> 
          <Grid item xs={12} md={4}>
            <Criterio />
          </Grid>
          <Grid item xs={12} md={4}>
            <Ligth />
          </Grid>
          <Grid item xs={12} md={4}>
            <Izque />
          </Grid>
          <Grid item xs={12} md={4}>
            <Suicidio />
          </Grid>
          <Grid item xs={12} md={4}>
            <NoteBox />
          </Grid>
        </Grid>
      </Container>
      {showScroll && (
        <IconButton
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: '#f5f5f5',
            zIndex: 1000
          }}
          onClick={scrollTop}
          aria-label="scroll to top"
        >
          <KeyboardArrowUp />
        </IconButton>
      )}
      <Face />
      <Footer />
    </>
  );
};

export default App;
