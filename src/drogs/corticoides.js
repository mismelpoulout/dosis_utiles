import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Steroid = () => {
  const blackBackgroundStyle = {
    backgroundColor: 'blue',
    padding: '10px',
    borderRadius: '5px',
  };

  const corticoidesList = [
    { name: 'HIDROCORTISONA', dosage: 'bbs 100-500mg', note: 'shock 20mg/kg/dia, Asma 5-10mg/kg/dosis c/2-4-6hrs' },
    { name: 'BETAMETASONA', dosage: 'amp 4mg/ml', note: '0.2-0.5mg/kg/dia, 2-3 gotas/kg' },
    { name: 'PREDNISONA', dosage: 'comp 5-20mg, susp 20mg/5ml', note: '1-2mg/kg/dia, dosis max niños 40mg' },
    { name: 'DEXAMETASONA', dosage: 'amp 4mg/ml, gotas 1mg/ml', note: 'laring: 0.6mg/kg/dosis, 0.1-0.25mg/kg c/6hrs EV' },
  ];

  return (
    <>
      <Paper style={blackBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          CORTICOIDES
        </Typography>
      </Paper>

      <List>
        {corticoidesList.map((antibiotic, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="subtitle1">
                <b>{antibiotic.name}</b>
              </Typography>
              <Typography variant="body2">{antibiotic.dosage}</Typography>
              <Typography variant="body2">{antibiotic.note}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Steroid;
