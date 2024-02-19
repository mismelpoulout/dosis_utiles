import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Sedantes = () => {
  const blackBackgroundStyle = {
    backgroundColor: 'orange',
    padding: '10px',
    borderRadius: '5px',
  };

  const sedantesList = [
    { name: 'DIAZEPAM', details:'comp 10mg amp 10mg/2ml', dosage:'0.3-0.5mg/kg/dosis ev o im', note: 'precaucion c/ apto resp, miastenia gravis, apnea del sueño' },
    { name: 'MIDAZOLAM', details:'gotas 2.5mg/0.5ml (va subiendo C/2.5mg) amp 100mg/100ml', dosage: 'amp 5mg/ml, 0.2-0.5mg/kg/dosis ev', note: 'precaucion c/ apto resp' },
    {
      name: 'HALOPERIDOL', details:'comp 1/5mg, amp 5-50-100/1ml 500mg/5ml',
      dosage: 'adultos fase aguda amp 100mg/1ml 5-10mg c/8hrs IM niños 0.5-3mg/kg/dia',
      note: 'max 30mg(niños) - 60mg/dia(adultos)',
    },
    {
      name: 'FENITOINA', details:'amp 250mg/5ml',
      dosage: 'comp 100mg amp 250mg/5ml',
      note: 'ataque: 5-7mg/kg/dosis mant:mayor 3A: 8-10mg/kg/dia menor de 3A 4-7mg/kg/dia',
    },
    { name: 'LORAZEPAM', details:'comp 2mg, amp 4mg/2ml', dosage: 'amp 4mg/2ml 0.05-0.1mg/kg/dosis', note: '' },
    {
      name: 'FENOBARBITAL', details:'',
      dosage: 'comp 100mg amp 250mg/5ml carga: 20mg/kg/dosis mant:3-5mg/kg/dosis',
      note: 'dosis max 40mg/kg/d',
    },
    { name: 'MORFINA', details:'10-20mg/1ml', dosage: 'amp 10-20mg bolo:0.1mg/kg/dosis', note: 'deprime el centro respiratorio' },
    {
      name: 'ROCURONIO', 
      details:'amp 25-50-100mg/2.5-5-10ml respectivamente',
      dosage: 'amp:25-50-100mg/2.5-5-10ml',
      note: 'intubacion endotraqueal: 0.6 mg/kg/dosis intubacion d 60seg 1mg/kg/dosis',
    },
  ];

  return (
    <>
      <Paper style={blackBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          SEDANTES
        </Typography>
      </Paper>

      <List>
        {sedantesList.map((sedantes, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="subtitle1">
                <b>{sedantes.name}</b>
              </Typography>
              <Typography variant="body2">{sedantes.details}</Typography>
              <Typography variant="body2">{sedantes.dosage}</Typography>
              <Typography variant="body2">{sedantes.note}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Sedantes;
