import React, { useState } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Grid, IconButton,  } from '@mui/material';

import './App.css';
import useNavigation from './useNavigation';

// Importar los componentes de las secciones
import Section1 from './components/meds';
import Section2 from './components/protocols';
import Section3 from './components/guias';
import Navbar from './navbar';

import NoteBox from './components/note';
import Footer from './footer';
import Face from './components/facebook';

const App = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    // Remove event listener inside the useEffect cleanup function
    React.useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);

        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, []);

    return (
        <Router>
            <Grid container spacing={1}>
                <Navbar />
            </Grid>
            <Container sx={{ paddingTop: '20px' }}>
                <Routes>
                    <Route path="/section1" element={<Section1 />} />
                    <Route path="/section2" element={<Section2 />} />
                    <Route path="/section3" element={<Section3 />} />
                    <Route path="/" element={<HomePage showScroll={showScroll} setShowScroll={setShowScroll} />} />
                </Routes>
            </Container>
        </Router>
    );
}

function HomePage({ showScroll, setShowScroll }) {
    const { handleNavigate } = useNavigation();
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
         <Grid container spacing={2}>
         <Grid item xs={12} sm={4}>
         <div
          className="card-mode mode-study trigger-layer"
          role="button"
          data-layername="study"
          data-layertitle="Estudia"
          onClick={() => handleNavigate("/section1")}
        >
          <h3>Medicamentos</h3>
          <p>Bibliografias: Vandemecum</p>
        </div>
        </Grid>
        <Grid item xs={12} sm={4}>
        <div
          className="card-mode mode-play trigger-layer"
          role="button"
          data-layername="study"
          data-layertitle="Estudia"
          onClick={() => handleNavigate("/section2")}
        >
          <h3>Criterios y Protocolos</h3>
          <p>Bibliografias: Guias Clinicas Minsal...</p>
        </div>
        </Grid>
        <Grid item xs={12} sm={4}>
        <div
          className="card-mode mode-test trigger-layer"
          role="button"
          data-layername="study"
          data-layertitle="Estudia"
          onClick={() => handleNavigate("/section3")}
        >
          <h3>Guias Minsal</h3>
          <p>Bibliografias: Guias Clinicas Minsal...</p>
        </div>
           </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
            <NoteBox />
          </Grid>
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
}

export default App;