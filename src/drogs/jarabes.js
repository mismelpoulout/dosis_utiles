import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

import bisolvon from '../img/bisolvon.png';
import ambroxol from '../img/ambroxol.png';

const Jarabes = () => {
  const blackBackgroundStyle = {
    backgroundColor: 'brown',
    padding: '10px',
    borderRadius: '5px',
  };

  const jarabesList = [
    {
      name: 'BISOLVON',
      details: 'JARABE INFANTIL 4 mg/5 mL',
      dosage: 'ads.: 5-10 ml c/8hrs; niños: 2,5ml c/8hrs lactantes: 0,5 mg/kg/día.',
      note: 'mayores de 12 años: 10 ml c/8hrs; niños 6-12 años: 5 ml c/8hrs menores de 6A 2,5ml c/8hs.',
      // Añadir la ruta a la imagen correspondiente
      image: bisolvon,
    },
    {
      name: 'AMBROXOL o MUXOL',
      details: 'JARABE 15 mg/5 mL',
      dosage: 'Oral. Adultos: 30 mg c/8hrs o 60 mg c/12hrs; niños 6-12 años: 15 mg c/8-12hrs; niños 2-5 años: 2.5mlc/8hrs.',
      note: 'NO DAR EN MENORES DE 2AÑOS, LACTANCIA - EMBARAZO',
      // Añadir la ruta a la imagen correspondiente
      image: ambroxol,
    },
  ];

  return (
    <>
      <Paper style={blackBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          JARABES
        </Typography>
      </Paper>

      <List>
        {jarabesList.map((jarabes, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar alt={jarabes.name} src={jarabes.image} />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="subtitle1">
                <b>{jarabes.name}</b>
              </Typography>
              <Typography variant="body2">{jarabes.details}</Typography>
              <Typography variant="body2">{jarabes.dosage}</Typography>
              <Typography variant="body2">{jarabes.note}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Jarabes;
