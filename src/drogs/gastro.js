import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Gastro = () => {
  const blackBackgroundStyle = {
    backgroundColor: 'grey',
    padding: '10px',
    borderRadius: '5px',
  };

  const gastroprotectoresList = [
    { name: 'VIADIL', details: 'gotas 5mg/ml', dosage: 'Mayores de 12A 20-40 gotas 3-5v/dia, 2-12A 2gotas/año 3-5v/dia, Menores de 2A 1gota/kg/dia',note: 'no dar en Uropatía obstructiva por hipertrofia prostática,o alguna patologia GI' },
    { name: 'BUSCAPINA', details: 'gotas 10mg/ml - amp 20mg/ml (dosis max 1,5mg/kg)', dosage: 'Niños 1 mes-4A: 300-600 µg/kg (máx 5 mg/dosis) cada 6-8 horas, 5-11A: 5-10 mg c/6-8 hrs, 12-17A : 10-20 mg c/6-8 hrs',note: 'no dar en:patología uretro-prostática, estenosis GI o ileo paralitico' },
    { name: 'DOMPERIDONA', details: 'gotas, comp 10mg', dosage: '1mg/kg/8-12hrs, 1gota/kg/8-12hrs, 0.2-0.4ml/kg/dosis c/8hrs',note: 'no dar en menores de 10A' },
    { name: 'ONDANSETRON', details: 'amp 4mg/2ml', dosage: '0.1-0.2mg/kg/dosis (en mayores de 6 meses)',note: 'uso concomitante con apomorfina provoca hipotension severa' },
    { name: 'METOCLOPRAMIDA', details: 'gotas 4g/ml comp 10mg', dosage: 'adultos 20-50 gotas/3v/dia 0.25-0.5mg/kg/dia c/8hrs (en mayores de 6 meses)',note: 'No dar en menores de 6 meses,no se debe usar en pacientes epilépticos, ni que esten tomando medicamentos que caucen reacciones extrapiramidales ' },
    { name: 'OMEPRAZOL', details: 'amp-cap 20-40 mg', dosage: '0.25-0.5mg/kg/12-24hrs, menores de 5A 5mg/kg/dia, 5-10A 10mg/kg/dia',note: 'No usar en pacientes con infección por VIH' },
  ];

  return (
    <>
      <Paper style={blackBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          GASTROPROTECTORES Y ANTIHEMETICOS
        </Typography>
      </Paper>

      <List>
        {gastroprotectoresList.map((antibiotic, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="subtitle1">
                <b>{antibiotic.name}</b>
              </Typography>
              <Typography variant="body2">{antibiotic.details}</Typography>
              <Typography variant="body2">{antibiotic.dosage}</Typography>
              <Typography variant="body2">{antibiotic.note}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Gastro;
