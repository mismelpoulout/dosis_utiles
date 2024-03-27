// sections/Section3.js

import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import {Grid} from '@mui/material';


import GuiasMinsal from '../doc/guiasminsal';

function Section3() {
  return (
    <>
    <Container>
      <Typography variant="h5" gutterBottom>
        Guias Clinicas Minsal
      </Typography>
      <Typography variant="body1">
      <Grid item xs={12} md={4}>
            <GuiasMinsal />
          </Grid>
      </Typography>
      </Container>
    </>
  );
}

export default Section3;
