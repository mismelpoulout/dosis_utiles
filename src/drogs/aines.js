import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Aines = () => {
  const redBackgroundStyle = {
    backgroundColor: '#19e1f5',
    padding: '10px',
    borderRadius: '5px',
  };

  const medicationList = [
    { 
    name1: 'AINES',
     note1: 'IBUPROFENO, DICLOFENACO, KETOROLACO,CELECOXIB,KETOPROFENO,METAMIZOL',
     name: ' OPIACEOS',
     note: 'MORFINA, FENTANILO,KETAMINA(derivado de la morfina),TRAMADOL',
     obse:'los opiaceos no tienen mucha duracion de su efecto a diferencia de la morfina que dura 4hrs pero la accion analgecica no es muy potente por lo que se recomienda COMBINAR con AINES' 
    },
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
      name: 'CELECOXIB',
      form:'comp 200mg',
      dosage: '200MG c/12-24hrs , DOSIS MAXIMA: 400MG/dia',
      note: 'No dar en EMBARAZO,LACTANCIA y PUEDE PRODUCIR FOTOSENSIBILIDAD',
    },
    {
      name: 'PREGABALINA',
      form:'comp 75-150mg',
      dosage: '75mg c/12hrs o 150mg c/24 hrs',
      note: 'NO DAR MAS DE 150mg/dia',
      obse: 'No Conducir-Lactancia-Embarazo',
    },
    
    {
      name: 'KETOPROFENO',
      form:'amp 100mg, comp 50mg',
      dosage: 'Oral: 50 mg/8-12 h, máx. 200 mg/día. Comp. liberación prolongada: 200 mg/día.;ev 100mg c/12hrs',
      note: 'dosis max 200mg/dia',
      obse: 'Produce fotosencibilidad- NO DAR en la Lactancia-Embarazo',
    },
    {
      name: 'MORFINA',
      form:'amp 10mg',
      dosage: '0.1 mg/kg/dosis',
      note: 'espasmos bronquiales,TEP,Insuf Cardiaca',
      obse:'No Conducir-Lactancia-Embarazo( duracion max 4hrs y se puede conbinar con AINES)',
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
                <b>{medication.name1}</b>
              </Typography>
              <Typography variant="body2">{medication.note1}</Typography>
              <Typography variant="subtitle1">
                <b>{medication.name}</b>
              </Typography>
              <Typography variant="body2">{medication.dosage}</Typography>
              <Typography variant="body2">{medication.note}</Typography>
              <Typography variant="body2">{medication.form}</Typography>
              <Typography variant="body2"><b>{medication.obse}</b></Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Aines;
