import React, { useState } from 'react';
import {Typography, ListItem, Menu, MenuItem} from '@mui/material';

const Izque = () => {
  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const cardiop = () => {
    // Implementa la lógica para la función cardiop aquí
    handleClose1();
  };

  const blackBackgroundStyle = {
    backgroundColor: '#E9967A',
    padding: '10px',
    borderRadius: '5px',
    color: 'white',
  };

  return (
    <>
      <ListItem button style={blackBackgroundStyle} onClick={handleClick1}>
        <Typography variant="body2">
          CARDIOPATIA ISQUEMICA
        </Typography>
      </ListItem>
      {/* Menu desplegable */}
      <Menu
        anchorEl={anchorEl1}
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
      >
        <MenuItem onClick={cardiop}>- Monitorizar a todo paciente con IAM con SDST. </MenuItem>
        <MenuItem onClick={cardiop}>- AAS 500 mg, vía oral</MenuItem>
        <MenuItem onClick={cardiop}>- Clopidogrel dosis de carga 300mg vía oral, menor de 75 años</MenuItem>
        <MenuItem onClick={cardiop}>- Atorvastatina  80mg</MenuItem>
        <MenuItem onClick={cardiop}>- Oxígeno si saturación menor 90%</MenuItem>
        <MenuItem onClick={cardiop}>- Nitroglicerina 0,6 mg sublingual (si dolor)</MenuItem>
      </Menu>
    </>
  );
};

export default Izque;
