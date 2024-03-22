import React, { useState } from 'react';
import {
 
  Typography,
  ListItem,
  List,
  Menu,
  MenuItem,
  
} from '@mui/material';

const Suicidio = () => {

    const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };


  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  
  const redBackgroundStyle = {
    backgroundColor: 'red',
    padding: '10px',
    borderRadius: '5px',
  };
  const blackBackgroundStyle = {
    backgroundColor: 'green',
    padding: '10px',
    borderRadius: '5px',
  };

    return(
        
     <List>
        <ListItem style={redBackgroundStyle} button onClick={handleClick1}>
          <Typography  style={{ color: 'white' }}  variant="body1">
               Escala de SADPERSONS
          </Typography>
        </ListItem>
        {/* Menu desplegable */}
        <Menu
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={handleClose1}
        >
          <Typography style={ redBackgroundStyle}  > &nbsp;<b>Escala de riesgo de intento suicida</b></Typography>
          <MenuItem > &nbsp; &nbsp;-Sexo: +1 varones </MenuItem>
          <MenuItem >&nbsp; &nbsp;-Age (edad) +1 si es menor de 19A 0 mayor de 45A</MenuItem>
          <MenuItem >&nbsp; &nbsp;-Depression </MenuItem>
          <MenuItem >&nbsp; &nbsp;-Previus Attempt(Intentos anteriores)</MenuItem>
          <MenuItem >&nbsp; &nbsp;-Ethanol abuse(abuso del alcohol)</MenuItem>
          <MenuItem >&nbsp; &nbsp;-Rational Thinking loss(Trastornos cognitivos)</MenuItem>
          <MenuItem >&nbsp; &nbsp;-Social suport lacking(sin apoyo social)</MenuItem>
          <MenuItem >&nbsp; &nbsp;-Organized plan(Plan organizado de Suicidio)</MenuItem>
          <MenuItem >&nbsp; &nbsp;-No spouse(sin pareja estable)</MenuItem>
          <MenuItem >&nbsp; &nbsp;-Sickness(enfermedad somatica)</MenuItem><br/>
          <Typography style={blackBackgroundStyle}>&nbsp;<b>Cada uno de los items suman 1 punto</b></Typography>
          <br/>
          <MenuItem>&nbsp; &nbsp;0-2 sin riesgo</MenuItem>
          <MenuItem>&nbsp; &nbsp;3-4 bajo riesgo. Seguimiento ambulatorio intensivo.Conciderar ingreso psiquiatrico</MenuItem>
          <MenuItem>&nbsp; &nbsp;5-6 riesgo medio.Si no hay apoyo familiar estrecho debe internarse</MenuItem>
          <MenuItem>&nbsp; &nbsp;7-10 riesgo alto.Ingreso, por riesgo de suicidio inminente</MenuItem>
        </Menu>
    </List>

    );
};

export default Suicidio;







