import React, { useState } from 'react';
import { Typography, ListItem, Menu, MenuItem } from '@mui/material';

const Izque = () => {
  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
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
        <MenuItem onClick={handleClose1}>- Monitorizar a todo paciente con IAM con SDST. </MenuItem>
        <MenuItem onClick={handleClose1}>- AAS 500 mg, vía oral</MenuItem>
        <MenuItem onClick={handleClose1}>- Clopidogrel dosis de carga 300mg vía oral, menor de 75 años</MenuItem>
        <MenuItem onClick={handleClose1}>- Atorvastatina  80mg</MenuItem>
        <MenuItem onClick={handleClose1}>- Oxígeno si saturación menor 90%</MenuItem>
        <MenuItem onClick={handleClose1}>- Nitroglicerina 0,6 mg sublingual (si dolor)</MenuItem>
      </Menu>
    </>
  );
};

export default Izque;
