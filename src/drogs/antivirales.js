import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Virales = () => {
  const redBackgroundStyle = {
    backgroundColor: '#d578f3',
    padding: '10px',
    borderRadius: '5px',
  };

  const medicationList = [
    { name: 'OSELTAMIVIR', 
      dosage: '75mg c/12hrs/5d.niños y adolescentes <15kg/15-23/24-40/>40kg de le da 30/40/60/75mg respectivamente', 
      note: 'NO DAR EN MENORES DE 15kg' },
    
      { name: 'ACICLOVIR', 
        dosage: 'comp 200/400/800mg de 200-400mg c/4-6hrs x 5-7 dias(herpes zoster y varicela:800mg/4h/7d) niños >2A 20mg/kg/dia c/6h/5d, máx 800 mg', 
        note: 'siempre omitir dosis nocturna,no dar en emb-lact ni <2A' },
   
  ];

  return (
    <>
      <Paper style={redBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          ANTIVIRALES
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

export default Virales;
