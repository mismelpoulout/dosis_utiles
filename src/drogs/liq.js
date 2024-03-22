import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Agua = () => {
  const redBackgroundStyle = {
    backgroundColor: '#c9e1f5',
    padding: '10px',
    borderRadius: '5px',
  };

  const medicationList = [
    { name: 'CLORURO DE SODIO', 
      form:'20-100-250-500-1000ml',
      dosage: 'a una velocidad media de 40 a 60 gotas/min. 120 – 180 ml/hora', 
      note: 'Precaucion en la insuficiencia renal,Insuf Cardiaca congestiva, embarazo y la lactancia' },
    
      { name: 'RINGER LACTATO', 
        form:'500-1000ml', 
        dosage: 'Adultos: entre 500 y 3000 ml por día. ', 
        kids:'niños: 0-10 kg: 100 ml/kg/día; 10-20 kg: 1000 ml + 50 ml por cada kg >10 kg/día; >20 kg peso corporal: 1500 ml + 20 ml por cada kg >20 kg/día.',
        note: 'Precaucion en la insuficiencia renal,Insuf Cardiaca congestiva, embarazo y la lactancia' },
        
        { 
           name: 'ALBUMINA', 
           form:'frasco 10grs',
           dosage: 'en la ascitis por insuf Hepatica dar 1 fco x c/litro drenado de liq ascitico', 
           note: 'Antes de drenar Hacer estudio del LIQ ascitico para evitar PERITONITIS BACT ESPONTANEA (PMN es igual o superior a 250/µl, )' },
   
  ];

  return (
    <>
      <Paper style={redBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          AGUA Y ELECTROLITOS 
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
              <Typography variant="body2">{medication.kids}</Typography>
              <Typography variant="body2">{medication.note}</Typography>


            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Agua;
