import React from 'react';
import { Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Paper } from '@mui/material';

const Ligth = () => {



    const blackBackgroundStyle = {
        backgroundColor: '#a1db3c',
        padding: '10px',
        borderRadius: '5px',
    };

    return (
        <>
            <Typography style={blackBackgroundStyle} variant="body2">
                CRITERIOS de LIGHT
            </Typography><br />
            <Grid className='container' spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>TRASUDADO</TableCell>
                                    <TableCell>EXUDADO</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>LDH pleural/suero</TableCell>
                                    <TableCell>menor a 0,6</TableCell>
                                    <TableCell>mayor a 0,6</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Proteinas pleural/suero</TableCell>
                                    <TableCell>menor 0,5</TableCell>
                                    <TableCell>mayor a 0,5</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>LDH en liq pleural</TableCell>
                                    <TableCell>menor 2/3 del límite<br />superior normal de la LDH</TableCell>
                                    <TableCell>mayor 2/3 del límite <br />superior normal de la LDH</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Glucosa</TableCell>
                                    <TableCell>mayor a 60 mg/dl</TableCell>
                                    <TableCell>menor a 60 mg/dl</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default Ligth;
