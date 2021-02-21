import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './styles.css';

import Header from '../../Header'
import Footer from '../../Footer'

//aqui vc usa o banco coloquei essa informaçoes de sabe so pra ver
const rows = [
    createData('Frozen yoghurt', '15/09/2020', 6.0),
    createData('Ice cream sandwich', '15/09/2020', 9.0),
    createData('Eclair', '15/09/2020', 16.0),
  
  ];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: 1000,

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 700,
    },
}));

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

export default function Avaliacao() {
    const [age, setAge] = React.useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <>
        <Header></Header>
        <Container maxWidth="xl" className="containerAva">
            <div className="divSuperior">
                <h1>Avaliação</h1>
                <div className="divButton">
                    <Button id="btnRelatorio" variant="contained" color="primary">
                        Relatório
                </Button>
                </div>
            </div>
            <div className="selectAluno">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label aluno" >Aluno</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="tableAluno">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Datas</StyledTableCell>
                                <StyledTableCell align="center">Açôes</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                    
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </Container>
        <Footer/>
        </>
    );

}