import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Aines = () => {
  const redBackgroundStyle = {
    backgroundColor: '#19e1f5',
    padding: '10px',
    borderRadius: '5px',
  };

  const medicationList = [
    { name: 'METAMIZOL', dosage: '5-8 mg/kg c/6 u 8 hrs', note: 'NO DAR EN MENORES DE 1A' },
    { name: 'IBUPROFENO', dosage: '40 mg/kg/día cada 6-8 horas', note: 'Dosis máxima: 2400 mg/día' },
    {
      name: 'DICLOFENACO',
      dosage: 'sup-comp',
      note: 'Niños 1 a 12A: 0,5-3 mg/kg/día, c/6-12hrs Máx 150 mg/día. mayores 12A: inicial es 50 mg c/8-12 hrs; la dosis de mant 50 mg cada 12 horas',
    },
    {
      name: 'PARACETAMOL',
      dosage: '15 mg/kg c/6 hrs ó 10 mg/kg c/4 hrs',
      note: 'en gotas seria 2 gotas x año de vida',
    },
  ];

  return (
    <>
      <Paper style={redBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          ANALGESICOS
        </Typography>
      </Paper>

      <List>
        {medicationList.map((medication, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="subtitle1">
                <b>{medication.name}</b>
              </Typography>
              <Typography variant="body2">{medication.dosage}</Typography>
              <Typography variant="body2">{medication.note}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Aines;
