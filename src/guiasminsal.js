import React from 'react';
import {
  Paper,
  Typography,
  ListItem,
  List,
} from '@mui/material';

const GuiasMinsal = () => {
  

  const blackBackgroundStyle = {
    backgroundColor: '#008b8b',
    padding: '10px',
    borderRadius: '5px',
  };

  const gperinat = () => {
    window.location.href = 'https://drive.google.com/file/d/1SPfNsFzJ5FGW62CIEMKg8SDnjSF_LHQE/view?usp=sharing';
  };

  const guiasonline = () => {
    window.location.href = 'https://diprece.minsal.cl/le-informamos/auge/acceso-guias-clinicas/guias-clinicas-por-grupo-de-patologias/?';
  };

  const gold = () => {
    window.location.href = 'https://goldcopd.org/wp-content/uploads/2016/04/wms-spanish-Pocket-Guide-GOLD-2017.pdf';
  };

 

  return (
    <div className='table-hover'>
      <Paper style={blackBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          GUIAS MINSAL
        </Typography>
      </Paper>
      <List>
        <ListItem onClick={gperinat}>
          <Typography variant="body2">
            PERINATAL
          </Typography>  
        </ListItem>

       

        <ListItem onClick={guiasonline}>
          <Typography variant="body2">
            GUIAS X GRUPO
          </Typography>
        </ListItem>
        <ListItem onClick={gold}>
          <Typography variant="body2">
            PROTOCOLO GOLD
          </Typography>
        </ListItem>
       

      </List>
    </div>
  );
};

export default GuiasMinsal;
