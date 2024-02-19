import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Antibio = () => {
  const blackBackgroundStyle = {
    backgroundColor: 'black',
    padding: '10px',
    borderRadius: '5px',
  };

  const antibioticsList = [
    { name: 'AMOXICILINA',     details: 'Susp 250-500mg/5ml comp 500mg', dosage: '50-80mg/KG/DIA c/8hrs (amoxi-clav mismo tto)', note: 'dosis maxima 3grs/dia' },
    { name: 'CEFADROXILO', details: 'Susp 250-500mg/5ml comp 500mg', dosage: '30-50mg/kg/dia', note: 'dosis maxima 2grs' },
    { name: 'AZITROMICINA',  details: 'Susp 200mg/5ml comp 500mg',dosage: '15mg/kg/dia', note: 'dosis maxima 500mg/dia' },
    {
      name: 'NITROFURANTOINA',
      details: '25mg/5ml, 100mg',
      dosage: '5-7mg/kg/dia c/6hrs,',
      note: 'Profilaxis de ITU 1-2mg/kg/dia',
    },
    {
      name: 'COTRIMOXAZOL',
      details: 'Inyect 800mg/80mg- comp 400mg/40mg    (Sulfametoxazol/Trimetoprima)',
      dosage: 'Oral Adultos y niños >12 años: 800/160 mg/12 h. Lact y niños < 12 años (dosis media 30/6 mg/kg/día): 6-12A: 400/80 mg/12 h; 6M-5A: 200/40 mg/12h;  de 6-5m: 100/20 mg/12 h',
      note: 'Tratamiento de la Pielonefritis aguda',
    },
   
    {
      name: 'PENI-BENZATINA',
      dosage: 'menor 25kg 600000U, mayor 25kg 1.2M adultos: 1.2-2.4M c/7-21dias/dia',
      note: 'dosis maxima 2.4M/dia',
    },
    {
      name: 'PENI-G SODICA',
      dosage: '200-500mil U/kg/dia c/6hrs EV adult: 600mil-1.2M/dia',
      note: 'dosis maxima 24M/dia',
    },
    { name: 'CLARITROMICINA', dosage: '7.5-15mg/kg/dia c/12hrs', note: 'dosis max 1grs' },
    {
      name: 'CIPROFLOXACINO',
      details: '500 mg',
      dosage: '20-40mg/kg/dia c/12hrs, 3.2-12.5mg/kg/dia c/12hrs',
      note: 'dosis max: 1.5grs vo, 1.2grs ev',
    },
    {
      name: 'METRONIDAZOL',
      details: 'comp 500mg, ev 500mg/100ml',
      dosage: 'Amebiasis: Niños: 40-50 mg/día/kg c/8-6hrs, Adultos: 1,5 a 2 g/día c/8-6hrs Duración del tratamiento: en amebiasis intestinal aguda y en amebiasis hepática: de 5 a 7 días. NB.- En la fase supurativa de la amebiasis hepática, el tratamiento con Flagyl debe evidentemente efectuarse conjuntamente con la evacuación del pus del abceso ó de los abcesos Infecciones por anaerobios Niños: 7,5 mg/kg/8 horas Adultos: 500 mg cada 8 horas',
      note: 'En su medida dar en dos dosis/dia entre las comidas',
    },
  ];

  return (
    <>
      <Paper style={blackBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          ANTIBIOTICOS
        </Typography>
      </Paper>

      <List>
        {antibioticsList.map((antibiotic, index) => (
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

export default Antibio;
