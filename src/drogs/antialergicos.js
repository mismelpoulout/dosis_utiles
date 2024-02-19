import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Alergicos = () => {
  const greenBackgroundStyle = {
    backgroundColor: 'green',
    padding: '10px',
    borderRadius: '5px',
  };

  const medicationList = [
    { name: 'CETIRIZINA', form: 'comp 10mg, jarab 1mg/ml, gotas 10mg/ml', dosage: '0.2mg/kg/dosis c/12-24hrs' },
    { name: 'CLORFENAMINA', form: 'comp 4mg, jarab 2-2,5mg/5ml, amp 10mg', dosage: '0.2-0.4mg/kg/dia c/8-12hrs' },
    { name: 'DESLORATADINA', form: '1 a 5 años: 2,5 ml /24 hrs, 6 a 11 años: 5 ml /24 hrs', dosage: '' },
    { name: 'LORATADINA', form: 'comp 4mg, jarab 5mg/5ml, gotas 1mg/ml', dosage: '0,2mg/kg/dia' },
  ];

  return (
    <>
      <Paper style={greenBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          ANTIALERGICOS
        </Typography>
      </Paper>

      <List>
        {medicationList.map((medication, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="subtitle1">
                <b>{medication.name}</b>
              </Typography>
              <Typography variant="body2">{medication.form}</Typography>
              <Typography variant="body2">{medication.dosage}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Alergicos;
