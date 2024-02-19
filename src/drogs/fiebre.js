import React from 'react';
import { styled } from '@mui/system';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ResponsiveTableContainer = styled(TableContainer)({
  overflowX: 'auto',
});

const ResponsiveTable = () => {
  const data = [
    { sistema: 'Sistémico', critico: 'Shock Séptico de distintos orígenes', urgente: '', noUrgente: '' },
    // ... Agrega más filas según tus datos
  ];

  return (
    <ResponsiveTableContainer component={Paper}>
    <Typography>
        Manejo de la fiebre
    </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sistema</TableCell>
            <TableCell>Crítico</TableCell>
            <TableCell>Urgente</TableCell>
            <TableCell>No Urgente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.sistema}</TableCell>
              <TableCell>{row.critico}</TableCell>
              <TableCell>{row.urgente}</TableCell>
              <TableCell>{row.noUrgente}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ResponsiveTableContainer>
  );
};

export default ResponsiveTable;
