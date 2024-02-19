import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Nebulizer = () => {
  const blackBackgroundStyle = {
    backgroundColor: 'purple',
    padding: '10px',
    borderRadius: '5px',
  };

  const broncodilatadoresList = [
    { name: 'SALBUTAMOL', dosage: '100mcg x puff, solu para nebulizar', note: '2 puff c/4-6-8hrs, NBZ: 0.05ml/kg/dosis 5cc de SF' },
    { name: 'BROMURO DE IPRATROPIO', dosage: 'INH 2 puf c/4-6-8hrs, NBZ: 0.05ml/kg/dosis 5cc de SF' },
    { name: 'BERODUAL', dosage: 'INH 2 puf c/4-6-8hrs, NBZ: 0.05ml/kg/dosis 5cc de SF', note: 'mayor efectividad en mayor de 1 año' },
    { name: 'ADRENAbNA CORRIENTE', dosage: 'amp 1mg/1ml RN 0.5CC+3.5CC NaCl, 1-6m 1cc+3cc de NaCl, 7m-1A 1.5+2.5cc NaCl', note: 'dosis máxima 2ml por NBZ' },
    { name: 'ADRENAbNA RACEMICA', dosage: 'amp 1mg/1ml 0.05-0.1mg/kg', note: 'menor de 20kg= 0.25ml, mayor de 20kg= 0.5ml' },
  ];

  return (
    <>
      <Paper style={blackBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          BRONCODILATADORES
        </Typography>
      </Paper>

      <List>
        {broncodilatadoresList.map((antibiotic, index) => (
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

export default Nebulizer;
