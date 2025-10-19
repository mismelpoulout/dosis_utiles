import React, { useState, useEffect } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Grid, IconButton, Typography } from "@mui/material";

import "./App.css";
import useNavigation from "./useNavigation";

// Secciones principales
import Section1 from "./components/MedicamentosApp";
import Section2 from "./components/CriteriosApp";
import Section3 from "./components/guias";
import Section4 from "./components/EcgSimulator";
import Navbar from "./navbar";
import NoteBox from "./components/note";
import Footer from "./footer";
import Face from "./components/facebook";

// Visor de protocolos
import ProtocolsViewer from "./components/ProtocolosViewer";

const App = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      setShowScroll(y > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Router>
      <Grid container spacing={1}>
        <Navbar />
      </Grid>

      {/* Contenedor a ancho completo con padding horizontal responsive */}
      <Container maxWidth={false} disableGutters sx={{ pt: "20px", px: { xs: 2, sm: 3 } }}>
        <Routes>
          <Route path="/" element={<HomePage showScroll={showScroll} />} />
          <Route path="/section1" element={<Section1 />} />
          <Route path="/section2" element={<Section2 />} />
          <Route path="/section3" element={<Section3 />} />
          <Route path="/section4" element={<Section4 />} />
          <Route path="/protocolos" element={<ProtocolsViewer />} />
        </Routes>
      </Container>
    </Router>
  );
};

function HomePage({ showScroll }) {
  const { handleNavigate } = useNavigation();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Tarjetas principales - todas mismo alto gracias a CSS */}
      <Grid container spacing={2} sx={{ mb: 4, px: { xs: 2, sm: 3 } }}>
        <Grid item xs={12} sm={6} lg={3}>
          <div className="home-card" onClick={() => handleNavigate("/section1")}>
            <div className="home-card__media mode-study" />
            <div className="home-card__body">
              <h3 className="home-card__title">Medicamentos</h3>
              <p className="home-card__desc">Bibliografías: Vademécum</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <div className="home-card" onClick={() => handleNavigate("/section2")}>
            <div className="home-card__media mode-play" />
            <div className="home-card__body">
              <h3 className="home-card__title">Criterios y Protocolos</h3>
              <p className="home-card__desc">Bibliografía: Guías clínicas MINSAL…</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <div className="home-card" onClick={() => handleNavigate("/section3")}>
            <div className="home-card__media mode-test" />
            <div className="home-card__body">
              <h3 className="home-card__title">Guías MINSAL</h3>
              <p className="home-card__desc">Guías clínicas oficiales…</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <div className="home-card" onClick={() => handleNavigate("/section4")}>
            <div className="home-card__media mode-sim" />
            <div className="home-card__body">
              <h3 className="home-card__title">Simulador</h3>
              <p className="home-card__desc">Simulador de electrocardiografía</p>
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Notas personales (ancho cómodo en desktop, full en móvil) */}
      <Grid container justifyContent="center" sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, fontWeight: 600, color: "#0f1a56" }}
          >
            Notas personales
          </Typography>
        </Grid>

        <Grid item xs={12} sm={11} md={8} lg={6}>
          <NoteBox />
        </Grid>
      </Grid>

      {/* Botón subir */}
      {showScroll && (
        <IconButton
          onClick={scrollTop}
          aria-label="scroll to top"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#f5f5f5",
            zIndex: 1000,
          }}
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