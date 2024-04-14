import React, { useState } from 'react';
import { Typography, ListItem, List, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const Criterio = () => {
    const [isTableVisible, setIsTableVisible] = useState(false);

    const redBackgroundStyle = {
        backgroundColor: '#c9e1f5',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer' // Agregamos un cursor para indicar que es clickeable
    };

    const handleTitleClick = () => {
        setIsTableVisible(!isTableVisible); // Cambiamos la visibilidad de la tabla al hacer clic
    };

    return (
        <>
            <Typography
                variant="body1"
                style={redBackgroundStyle}
                className="mt-4 mb-4"
                onClick={handleTitleClick} // Llamamos a la función cuando se hace clic en el título
            >
                CURB 65 en la NAC
            </Typography>

            {isTableVisible && ( // Renderizamos la tabla solo si isTableVisible es true
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Factores</TableCell>
                                <TableCell>Puntos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Confusión</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Urea mayor 40 mg/dl o BUN mayor 20 mg/dl</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Frecuencia respiratoria mayor o igual a 30/min</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tensión arterial (sistólica mayor a 90 ó diastólica mayor a 60)</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>65: edad mayor o igual a 65 años</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <List>
                        <ListItem>PUNTUACION</ListItem>
                        <ListItem>0-1: Domicilio</ListItem>
                        <ListItem>mayor a 2: Observación</ListItem>
                        <ListItem>mayor o igual a 3: Sala o UCI</ListItem>
                    </List>
                </TableContainer>
            )}


        </>
    );
};

export default Criterio;
