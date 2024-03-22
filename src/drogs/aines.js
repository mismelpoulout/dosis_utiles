import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Aines = () => {
  const redBackgroundStyle = {
    backgroundColor: '#19e1f5',
    padding: '10px',
    borderRadius: '5px',
  };

  const medicationList = [
    { name: 'METAMIZOL', form:'amp 1g/2ml', dosage: '5-8 mg/kg c/6 u 8 hrs', note: 'NO DAR EN MENORES DE 1A' },
    { name: 'IBUPROFENO', form:'jarabe,comp 400-600mg',dosage: '40 mg/kg/día cada 6-8 horas', note: 'Dosis máxima: 2400 mg/día' },
    {
      name: 'DICLOFENACO',
      form: 'sup-comp',
      dosage: 'Niños 1 a 12A: 0,5-3 mg/kg/día, c/6-12hrs Máx 150 mg/día. mayores 12A: inicial es 50 mg c/8-12 hrs; ',
      note:'la dosis de mant 50 mg cada 12 horas',
    },
    {
      name: 'KETOROLACO',
      form: 'comp 10mg, amp 30mg ',
      dosage: '10 mg/kg c/8 hrs ó ev/im 30-60 mg/dia ',
      note: 'no dar mas de 60mg/dia',
    },
    {
      name: 'PARACETAMOL',
      form:'comp 500mg, gotas',
      dosage: '15 mg/kg c/6 hrs ó 10 mg/kg c/4 hrs',
      note: 'en gotas seria 2 gotas x año de vida',
    },
    
    {
      name: 'KETOPROFENO',
      form:'amp 100mg',
      dosage: 'c/12hrs',
      note: 'dosis max 200mg/dia',
    },
    {
      name: 'MORFINA',
      form:'amp 10mg',
      dosage: '0.1 mg/kg/dosis',
      note: 'espasmos bronquiales,TEP,Insuf Cardiaca',
      obse:'No Conducir-Lactancia-Embarazo',
    },
    {
      name: 'KETAMINA',
      form:'50mg/ml',
      dosage: 'Dosis analgésica: 0.1-0.3 mg/kg,sedante: 0.5-1.0 mg/kg,inducción: 1.0-4.5 mg/kg(en la intubación)',
      note: 'inicio de acción: 10-30 seg, Duración de la acción: 5-15 minutos',
      obse:'No Conducir-Lactancia-Embarazo',
    },
    {
      name: 'FENTANILO',
      form:'amp 0.1-0.5mg',
      dosage: '1-2mcg (microgramos)/kg/dosis',
      note: 'se puede repetir c/30-60min',
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
              <Typography variant="body2">{medication.form}</Typography>
              <Typography variant="body2">{medication.obse}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Aines;
