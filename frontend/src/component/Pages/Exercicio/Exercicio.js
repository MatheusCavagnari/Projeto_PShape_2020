import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Exercicio.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  
  //aqui vc usa o banco coloquei essa informaçoes de sabe so pra ver
  const rows = [
    createData('Frozen yoghurt', 'Voador', 6.0),
    createData('Ice cream sandwich', 'Voador', 9.0),
    createData('Eclair', 'Voador', 16.0),
  
  ];

const useStyles = makeStyles((theme) => ({

    textField: {
        minWidth: 200,
        width: 1300,
        maxWidth: 1400,
        marginLeft: 50,
    },
    Button: {

        minWidth: 100,
        width: 200,
    }
}));

export default function Execicios() {

    const classes = useStyles();
    return (
        <Container maxWidth="xl" className="container">
            <div>
                <h1 id="title">Exercício</h1>
            </div>
            <div className="subDiv">
                <Button className={classes.Button} id="btnPdf" variant="contained" color="primary">
                    Adicionar
                </Button>

                <TextField className={classes.textField} id="filled-basic" label="Buscar" variant="filled" />
            </div>
            <div className="tabelaExer">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nome </StyledTableCell>
                                <StyledTableCell align="right">Maquina</StyledTableCell>
                                <StyledTableCell align="right">Açôes</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                    <StyledTableCell align="right">{row.fat}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>

    );
}